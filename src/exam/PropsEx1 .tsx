interface PropsExample {
    name: string;
    color?: string;
}

export const PropsExampleimpl = ({ name, color = 'Blue' }: PropsExample) => {
    return <div style={{ color }}>Hello {name}</div>;
};
