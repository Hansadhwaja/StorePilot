import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputHTMLAttributes } from "react";

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputLabel = ({ label, name, ...props }: InputLabelProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} className="w-full" />
    </div>
  );
};

export default InputLabel;
