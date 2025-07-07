import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputLabelProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full"
      />
    </div>
  );
};

export default InputLabel;
