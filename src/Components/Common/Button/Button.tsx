// import "../../../styles/submit-button-style.css";
import { ButtonGroup, Button } from "@mui/material";

interface ButtonProps<T> {
  id: string;
  text: string;
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
    <ButtonGroup className="button-div">
      <Button id={id} type={type} onClick={onClick} color="secondary">
        {text}
      </Button>
    </ButtonGroup>
  );
};

export default ButtonComponent;
