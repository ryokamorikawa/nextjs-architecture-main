interface Props {
  label: string;
  disabled?: boolean;
}

export const FormButton = ({ label, disabled = false }: Props) => {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-b from-gray-700 to-gray-900 p-2 font-medium uppercase text-white md:p-4"
      disabled={disabled}
    >
      {label}
    </button>
  );
};
