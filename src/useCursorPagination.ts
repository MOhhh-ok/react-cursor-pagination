import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { cursorsAtomsMap } from "./atoms";
import { DEFAULT_PAGINATION_KEY } from "./config";
import { CursorPaginationOptions } from "./types";

export function useCursorPagination<T>(
  paginationKey = DEFAULT_PAGINATION_KEY,
  options?: CursorPaginationOptions
) {
  const mapKey = `cursor-${paginationKey}`;

  if (!cursorsAtomsMap.has(mapKey)) {
    const newAtom = options?.persist === 'session'
      ? atomWithStorage<T[]>(
        mapKey,
        [],
        {
          getItem: (key: string) => {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : [];
          },
          setItem: (key: string, value: T[]) => {
            sessionStorage.setItem(key, JSON.stringify(value));
          },
          removeItem: (key: string) => {
            sessionStorage.removeItem(key);
          }
        })
      : atom<T[]>([]);
    cursorsAtomsMap.set(mapKey, newAtom)
  }

  const cursorsAtom = cursorsAtomsMap.get(mapKey)!;
  const [cursors, setCursors] = useAtom(cursorsAtom);

  const addNextCursor = (cursor: T | null | undefined) => {
    if (!cursor) return;
    setCursors([...cursors, cursor]);
  };

  const removeLastCursor = () => {
    setCursors(cursors.slice(0, -1));
  };

  const removeAllCursors = () => {
    setCursors([]);
  };

  const currentCursor = cursors[cursors.length - 1] as T | undefined;

  return {
    cursors,
    currentCursor,
    currentPage: cursors.length + 1,
    addNextCursor,
    removeLastCursor,
    removeAllCursors
  };
}

