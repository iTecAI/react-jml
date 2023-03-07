import { RenderTypes, ValueItem } from "./types";
import { JMLRendererSpec } from "./spec";
import { useMemo } from "react";
import { MantineRenderer } from "./renderers/MantineRenderer";
import { DataContextProvider } from "./data";
export function JMLRenderer<
    T extends JMLRendererSpec | "mantine",
    D = any
>(props: {
    renderer: T;
    spec: RenderTypes;
    data: D;
    onChange?: (data: D) => void;
}): JSX.Element {
    const renderer: JMLRendererSpec = useMemo(() => {
        switch (props.renderer) {
            case "mantine":
                return new MantineRenderer();
            default:
                return props.renderer as JMLRendererSpec;
        }
    }, []);

    return (
        <DataContextProvider
            value={props.data}
            setValue={props.onChange ?? (() => {})}
        >
            <></>
            <></>
        </DataContextProvider>
    );
}

export { JMLRendererSpec, ValueItem, RenderTypes };
