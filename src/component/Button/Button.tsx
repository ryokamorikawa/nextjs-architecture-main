interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
