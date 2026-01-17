import { useEffect, useState } from "react";
import { CursorPagination, useCursorPagination } from "react-cursor-pagination";
import { fetchByIdJoinedCursor } from "./fetcher/fetchers";
import type { Data, IdJoinedCursor } from "./types";

const paginationKey = "joinedSerializeDemo";

export function JoinedSerializeDemo() {
  const { currentCursor } = useCursorPagination<IdJoinedCursor>(paginationKey, {
    persist: {
      storage: "session",
      serialize: (value) => {
        return JSON.stringify({
          id: value.id,
          joined: value.joined,
        });
      },
      deserialize: (value) => {
        const parsed = JSON.parse(value);
        return {
          id: parsed.id,
          joined: new Date(parsed.joined),
        };
      },
    },
  });
  const [data, setData] = useState<Data[]>([]);
  const [nextCursor, setNextCursor] = useState<IdJoinedCursor>();

  useEffect(() => {
    fetchByIdJoinedCursor({ cursor: currentCursor }).then(d => {
      setData(d);
      const lastData = d[d.length - 1];
      const nextCursor = lastData
        ? { id: lastData.id, joined: lastData.joined }
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
        {data.map(d => <div key={d.id}>{d.id}: {d.name} (joined: {d.joined.toLocaleDateString()})</div>)}
      </div>
    </div>
  );
}
