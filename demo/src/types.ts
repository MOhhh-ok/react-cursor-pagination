export type DataResponse = {
  id: number;
  name: string;
  age: number;
  joined: string;
}

export type Data = Omit<DataResponse, 'joined'> & {
  joined: Date;
}

export type IdCursor = Data['id'];
export type IdAgeCursor = Pick<Data, 'id' | 'age'>
export type IdJoinedCursor = Pick<Data, 'id' | 'joined'>

