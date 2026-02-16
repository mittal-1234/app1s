export default function ContextHeader({
    title,
    subtitle
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="context-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}
