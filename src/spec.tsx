import { entries, get } from "lodash";
import { ReactNode, useMemo } from "react";
import { useData, useFullData } from "./data";
import {
    DynamicFunction,
    isComplexValueItem,
    isFieldRenderer,
    isValueItem,
    RenderTypes,
    ValueItem,
} from "./types";

export abstract class JMLRendererSpec {
    public registry = {
        group: this.group,
    };

    private _exclude = [
        "supertype",
        "type",
        "children",
        "child",
        "conditional",
        "control",
    ];

    protected Error(props: { text: string }): JSX.Element {
        return <div className="jml-error">ERROR: {props.text}</div>;
    }

    private _parseValueItem(item: ValueItem, data: any): any {
        if (isComplexValueItem(item)) {
            switch (item.type) {
                case "data":
                    return get(data, item.path, item.default);
            }
        } else {
            return item;
        }
    }

    private _parseFunction(func: DynamicFunction, data: any): any {
        const evaluated = new Function(
            "opts",
            `(opts) => (${func.code})(opts)`
        );
        const args: any = {};
        for (const k of Object.keys(func.opts)) {
            args[k] = this._parseValueItem(func.opts[k], data);
        }
        return evaluated(args);
    }

    private _parseValues(item: RenderTypes, data: any): any {
        const result: any = {};
        for (const entry of entries(item)) {
            if (!this._exclude.includes(entry[0])) {
                if (isValueItem(entry[1])) {
                    result[entry[0]] = this._parseValueItem(entry[1], data);
                } else {
                    result[entry[0]] = entry[1];
                }
            }
        }
        return result;
    }

    private _RenderField(props: {
        processed: any;
        control: string;
        type: string;
    }): JSX.Element {
        const [field, setField] = useData(props.control);
        const ToRender = (this.registry as any)[props.type];
        return (
            <ToRender {...props.processed} value={field} onChange={setField} />
        );
    }

    private _process_children(children: RenderTypes[]): ReactNode[] {
        return children.map((c, i) => <this.Render item={c} key={i} />);
    }

    public Render(props: { item: RenderTypes }): JSX.Element {
        const data = useFullData();

        const processed = useMemo(
            (() => {
                const _vals = this._parseValues(props.item, data);
                let children: ReactNode[] = [];
                if (Object.keys(props.item).includes("children")) {
                    children = this._process_children(
                        (props.item as any).children
                    );
                }
                if (Object.keys(props.item).includes("child")) {
                    children = this._process_children([
                        (props.item as any).child,
                    ]);
                }
                return { ..._vals, children };
            }).bind(this),
            [props.item, data]
        );

        const doRender: boolean = useMemo(() => {
            if (props.item.conditional) {
                return (
                    this._parseFunction(props.item.conditional, data) && true
                );
            } else {
                return true;
            }
        }, [props.item, data]);

        if (doRender) {
            if (isFieldRenderer(props.item)) {
                return (
                    <this._RenderField
                        processed={processed}
                        control={(props.item as any).control}
                        type={props.item.type}
                    />
                );
            } else {
                const ToRender = (this.registry as any)[props.item.type];
                return <ToRender {...processed} />;
            }
        } else {
            return <></>;
        }
    }

    public group(props: { children: React.ReactNode }): JSX.Element {
        return <this.Error text="No renderer provided for `group`" />;
    }
}
