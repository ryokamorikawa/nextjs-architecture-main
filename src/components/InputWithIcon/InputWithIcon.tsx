type Props = {
  id?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  svgPath?: string;
  rest?: object;
};
const InputWithIcon = ({
  id = '',
  type = '',
  required = false,
  disabled = false,
  placeholder = '',
  ariaLabel = '',
  svgPath = '',
  rest,
}: Props): JSX.Element => {
  return (
    <div className="mb-6 flex items-center text-lg md:mb-8">
      <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
        <path d={svgPath} />
      </svg>
      <input
        id={id}
        type={type}
        required={required}
        disabled={disabled}
        className="w-full bg-gray-200 py-2 pl-12 focus:outline-none md:py-4"
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...rest}
      />
    </div>
  );
};

export default InputWithIcon;
