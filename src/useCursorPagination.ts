import { atom, useAtom } from "jotai";
import { cursorsAtomsMap } from "./atoms";
import { DEFAULT_PAGINATION_KEY } from "./config";

export function useCursorPagination<T>(paginationKey = DEFAULT_PAGINATION_KEY) {

  if (!cursorsAtomsMap.has(paginationKey)) {
    cursorsAtomsMap.set(paginationKey, atom<T[]>([]));
  }

  const cursorsAtom = cursorsAtomsMap.get(paginationKey)!;
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

