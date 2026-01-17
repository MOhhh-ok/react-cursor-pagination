import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { cursorsAtomsMap } from "./atoms.js";
import { DEFAULT_PAGINATION_KEY } from "./config.js";
import { CursorPaginationOptions } from "./types.js";

export function useCursorPagination<T>(
  paginationKey: string | number = DEFAULT_PAGINATION_KEY,
  options?: CursorPaginationOptions<T>,
) {
  const mapKey = `cursor-${paginationKey}`;

  if (!cursorsAtomsMap.has(mapKey)) {
    const newAtom = options?.persist?.storage === "session"
      ? createSessionAtom<T>({ mapKey, options })
      : atom<T[]>([]);
    cursorsAtomsMap.set(mapKey, newAtom);
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
    removeAllCursors,
    paginationKey,
  };
}

function createSessionAtom<T>(params: { mapKey: string; options: CursorPaginationOptions<T> }) {
  const { mapKey, options } = params;
  const { persist } = options || {};
  const { serialize = JSON.stringify, deserialize = JSON.parse } = persist || {};

  return atomWithStorage<T[]>(
    mapKey,
    [],
    {
      getItem: (key: string) => {
        const storedStr = sessionStorage.getItem(key);
        try {
          return storedStr
            ? (JSON.parse(storedStr) as string[]).map(s => deserialize(s))
            : [];
        } catch (err: any) {
          console.warn("Failed to parse values.");
          return [];
        }
      },
      setItem: (key: string, values: T[]) => {
        try {
          const saveStr = JSON.stringify(values.map(v => serialize(v)));
          sessionStorage.setItem(key, saveStr);
        } catch (err: any) {
          console.warn("Failed to set values.");
          sessionStorage.setItem(key, JSON.stringify([]));
        }
      },
      removeItem: (key: string) => {
        sessionStorage.removeItem(key);
      },
    },
  );
}
