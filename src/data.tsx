import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { get, isEqual, set } from "lodash";

const DataContext = createContext<[any, (key: string, value: any) => void]>([
    {},
    () => {},
]);

export function DataContextProvider(props: {
    children: ReactNode[] | ReactNode;
    value: any;
    setValue: (data: any) => void;
}) {
    return (
        <DataContext.Provider
            value={[
                props.value,
                (key, value) => {
                    props.setValue(set(props.value, key, value));
                },
            ]}
        >
            {props.children}
        </DataContext.Provider>
    );
}

export function useData<T = any>(
    path: string
): [T | undefined, (value: T) => void] {
    const [data, setDataValue] = useContext(DataContext);
    const [value, setValue] = useState<T | undefined>(
        get(data, path) ?? undefined
    );

    useEffect(() => {
        const _new = get(data, path);
        if (!isEqual(_new, value)) {
            setValue(_new);
        }
    }, [data]);

    return [
        value,
        (v: T) => {
            setValue(v);
            setDataValue(path, v);
        },
    ];
}

export function useFullData(): any {
    const [data] = useContext(DataContext);
    return data;
}
