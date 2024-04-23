interface ButtonProps<T> {
  id?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (newValue: T) => void;
}

const ButtonComponent: React.FC<ButtonProps<any>> = ({
  id,
  text,
  type,
  onClick,
}) => {
  return (
    <div className="w-32 h-10 bg-primary text-white rounded shadow-black p-2">
      <button id={id} type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
