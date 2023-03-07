export abstract class JMLRendererSpec {
    public registry = {
        group: this.group,
    };

    protected Error(props: { text: string }): JSX.Element {
        return <div className="jml-error">ERROR: {props.text}</div>;
    }

    public group(props: { children: React.ReactNode }): JSX.Element {
        return <this.Error text="No renderer provided for `group`" />;
    }
}
