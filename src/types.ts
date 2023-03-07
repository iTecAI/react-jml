import React from "react";

type ComplexValueItem_Data = {
    supertype: "value";
    type: "data";
    path: string;
    default?: any;
};

export type ComplexValueItem = ComplexValueItem_Data;

export type ValueItem = string | number | boolean | null | ComplexValueItem;

export function isValueItem(obj: any): obj is ValueItem {
    return (
        typeof obj === "string" ||
        typeof obj === "number" ||
        typeof obj === "boolean" ||
        obj === null ||
        (obj.supertype && obj.supertype === "value")
    );
}

export function isComplexValueItem(obj: any): obj is ComplexValueItem {
    return obj.supertype && obj.supertype === "value";
}

export type DynamicFunction = {
    supertype: "dynamic_function";
    code: string; // String representing a JS function. Takes one argument, an object `opts`:{[key:string]: any}, and must return a value.
    opts: {
        [key: string]: ValueItem;
    }; // Dictionary of opt name : ValueItem
};

export function isDynamicFunction(obj: any): obj is DynamicFunction {
    return obj.supertype && obj.supertype === "dynamic_function";
}

interface RendererInterface {
    supertype: "render";
    type: string;
    conditional?: DynamicFunction;
}

export function isRenderer<T extends RendererInterface = RendererInterface>(
    obj: any
): obj is T {
    return obj.supertype && obj.supertype === "render";
}

interface FieldRendererInterface {
    supertype: "render";
    type: string;
    conditional?: DynamicFunction;
    control?: string; // Path to data to bind to, or undefined if uncontrolled.
}

export function isFieldRenderer<
    T extends FieldRendererInterface = FieldRendererInterface
>(obj: any): obj is T {
    return obj.supertype && obj.supertype === "render" && obj.control;
}

interface GroupRender extends RendererInterface {
    children: RenderTypes[];
}

export type RenderTypes = GroupRender;
