function register(_type: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        target.registry[_type] = propertyKey;
        console.log(`Registered ${_type} : ${propertyKey}`);
    };
}

export abstract class JMLRendererSpec {
    public registry: { [key: string]: string } = {};

    protected Error(props: { text: string }): JSX.Element {
        return <div className="jml-error">ERROR: {props.text}</div>;
    }

    @register("group")
    public group(props: { children: React.ReactNode }): JSX.Element {
        return <this.Error text="No renderer provided for `group`" />;
    }
}
