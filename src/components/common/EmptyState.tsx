interface EmptyStateProps {
  title: string;
  description: string;
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="card mb-4">
      <div className="card-body text-center">
        <h2 className="h5">{title}</h2>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;
