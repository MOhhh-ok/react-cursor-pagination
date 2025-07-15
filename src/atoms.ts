import { atom } from "jotai";

export const cursorsAtomsMap = new Map<string, ReturnType<typeof atom<(string | number)[]>>>();
