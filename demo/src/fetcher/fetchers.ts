import type { Data, DataResponse, IdAgeCursor, IdCursor, IdJoinedCursor } from "../types";
import { dummyData } from "./dummyData";

const LIMIT = 5;

export const fetchByIdCursor = async (params: { id: IdCursor | undefined }) => {
  const { id } = params;
  const sorted = [...dummyData].sort((a, b) => a.id - b.id);
  const filtered = id === undefined
    ? sorted
    : sorted.filter((item) => item.id > id)
  return filtered.slice(0, LIMIT).map(parseData);
}

export const fetchByIdAgeCursor = async (params: { cursor: IdAgeCursor | undefined }) => {
  const { cursor } = params;
  const sorted = [...dummyData].sort((a, b) => a.age - b.age);
  const filtered = cursor === undefined
    ? sorted
    : sorted.filter((item) => item.age > cursor.age || (item.age === cursor.age && item.id > cursor.id))
  return filtered.slice(0, LIMIT).map(parseData);
}

export const fetchByIdJoinedCursor = async (params: { cursor: IdJoinedCursor | undefined }) => {
  const { cursor } = params;
  const parsed = dummyData.map(parseData);
  const sorted = [...parsed].sort((a, b) => a.joined.getTime() - b.joined.getTime());
  const filtered = cursor === undefined
    ? sorted
    : sorted.filter((item) => item.joined.getTime() > cursor.joined.getTime() || (item.joined.getTime() === cursor.joined.getTime() && item.id > cursor.id))
  return filtered.slice(0, LIMIT);
}

function parseData(data: DataResponse): Data {
  return { ...data, joined: new Date(data.joined) };
}