import { InputHTMLAttributes } from "react";
import "./text-field.scss";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  id: string;
  type?: "text" | "password" | "email";
  errors?: string;
}

export const TextField = ({
  label,
  type = "text",
  id,
  errors,
  ...props
}: TextFieldProps) => {
  return (
    <div className="text-field">
      <label htmlFor={id} className="text-field__label body-text">
        {label}
      </label>
      <input type={type} id={id} {...props} className="text-field__input" />
      <p className="error-text">{errors}</p>
    </div>
  );
};
