import { ReactNode } from "react";
import { JMLRendererSpec } from "../spec";

export class MantineRenderer extends JMLRendererSpec {
    public override group(props: { children: ReactNode }): JSX.Element {
        return (
            <div className="jml jml-mantine jml-group">{props.children}</div>
        );
    }
}
