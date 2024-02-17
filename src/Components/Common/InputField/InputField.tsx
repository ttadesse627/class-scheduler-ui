// import "../../../styles/input-field-style.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

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
    value: string;
    optionText: string;
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
    <div className="input-div">
      <label htmlFor={id} className="input-div-item">
        {label}
      </label>
      <TextField
        className="input-div-item"
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
  inputRef,
  name,
  required,
  optionValues,
  onChange,
}) => {
  let options: JSX.Element[] = [];

  if (optionValues !== undefined && optionValues.length > 0) {
    options = optionValues.map((option) => (
      <option key={option.value} value={option.value}>
        {option.optionText}
      </option>
    ));
  }

  return (
    <div className="input-div">
      <label htmlFor={id} className="input-div-item">
        {label}
      </label>
      <Select name={name} id={id} required={required} onChange={onChange}>
        {/* <option value="">Select a value</option> */}
        {options}
      </Select>
    </div>
  );
};
