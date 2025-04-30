export function HeaderInfo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-0.5">
      <h1 className="text-xl font-bold">{title}</h1>

      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
