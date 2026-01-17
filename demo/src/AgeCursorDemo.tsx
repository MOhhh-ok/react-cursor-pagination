import { useEffect, useState } from "react";
import { CursorPagination, useCursorPagination } from "react-cursor-pagination";
import { fetchByIdAgeCursor } from "./fetcher/fetchers";
import type { Data, IdAgeCursor } from "./types";

const paginationKey = "ageCursorDemo";

export function AgeCursorDemo() {
  const { currentCursor } = useCursorPagination<IdAgeCursor>(paginationKey);
  const [data, setData] = useState<Data[]>([]);
  const [nextCursor, setNextCursor] = useState<IdAgeCursor>();

  useEffect(() => {
    fetchByIdAgeCursor({ cursor: currentCursor }).then(d => {
      setData(d);
      const lastData = d[d.length - 1];
      const nextCursor = lastData
        ? { id: lastData.id, age: lastData.age }
        : undefined;
      setNextCursor(nextCursor);
    });
  }, [currentCursor]);

  return (
    <div>
      <CursorPagination
        paginationKey={paginationKey}
        nextCursor={nextCursor}
      />
      <div>
        {data.map(d => <div key={d.id}>{d.id}: {d.name} (age: {d.age})</div>)}
      </div>
    </div>
  );
}
