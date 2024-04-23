// import "../../../styles/input-field-style.css";

interface InputFieldProps<T> {
  id: string;
  name?: string;
  label?: string;
  type: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  value?: T;
  placeHolder?: string;
  required?: boolean;
  onChange?: (newValue: T) => void;
  optionValues?: {
    value?: string;
    optionText?: string;
  }[];
}

export const InputField: React.FC<InputFieldProps<any>> = ({
  id,
  label,
  type,
  inputRef,
  name,
  value,
  placeHolder,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        className="rounded ml-4 border-gray-400 border-2 w-40 h-8 p-2"
        id={id}
        type={type}
        ref={inputRef}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export const SelectField: React.FC<InputFieldProps<any>> = ({
  id,
  label,
  name,
  required,
  optionValues,
  onChange,
}) => {

  return (
    <div className="">
      <label htmlFor={id}>
        {label}
      </label>
      <select name={name} id={id} required={required} onChange={onChange}  className="rounded ml-4 border-gray-400 border-2 w-48 h-10 p-2">
        {(optionValues !== undefined && optionValues.length > 0) && optionValues.map((option, index) => 
        (<option key={index} value={option.value}>
          {option.optionText}
        </option>
      ))
        }
      </select>
    </div>
  );
};

export const TextArea: React.FC<InputFieldProps<any>> = ({
  id,
  label,
  name,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-row justify-between w-24 h-12">
      <label htmlFor={id} className="input-div-item">
        {label}
      </label>
      <textarea name={name} onChange={onChange} required={required} />
    </div>
  );
};
