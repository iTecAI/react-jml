import { ValueItem } from "./types";
import { JMLRendererSpec } from "./spec";
import { ReactNode } from "react";

export function JMLRenderer<T extends JMLRendererSpec>(props: {
    spec: T;
}): JSX.Element {
    return <span></span>;
}

export { JMLRendererSpec, ValueItem };
