interface ConfirmButtonProps {
  onConfirm: () => void;
  label: string;
  confirmMessage: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

function ConfirmButton({ onConfirm, label, confirmMessage, variant = 'primary', disabled = false }: ConfirmButtonProps) {
  const handleClick = () => {
    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      onConfirm();
    }
  };

  return (
    <button type="button" className={`btn btn-${variant}`} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default ConfirmButton;
