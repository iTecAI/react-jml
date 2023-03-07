import {} from "./types";
import { JMLRendererSpec } from "./spec";

export default function JMLRenderer<T extends JMLRendererSpec>(props: {
    spec: T;
}): JSX.Element {
    return <></>;
}
