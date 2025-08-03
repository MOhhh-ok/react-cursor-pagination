import { Provider } from "jotai";
import { PropsWithChildren } from "react";

export function CursorPaginationProvider(props: PropsWithChildren) {
  return <Provider>
    {props.children}
  </Provider>
}