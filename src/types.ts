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

// Generators ===

interface GeneratorInterface {
    supertype: "generator";
    type: string;
}

interface ListGeneratorInterface extends GeneratorInterface {
    type: "list";
    data: ValueItem;
    renderer: RenderTypes;
}

export type GeneratorTypes = ListGeneratorInterface;

export function isGenerator(obj: any): obj is GeneratorTypes {
    return obj.supertype && obj.supertype === "generator";
}

// Renderers ===

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
    type: "group";
    children: Renderable;
}

export type RenderTypes = GroupRender;
export type Renderable = RenderTypes[] | GeneratorTypes;