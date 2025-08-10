import type {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { formatLocalCurrency } from "../../hooks/formatLocalCurrency";
import type { HTMLInputTypeAttribute } from "@/types/form-input";

export function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}) {
  const InputField = ({
    field,
    type,
    placeholder,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
  }) => {
    if (type === "textarea") {
      return (
        <Textarea {...field} value={field.value} placeholder={placeholder} />
      );
    }
    if (type == "currency") {
      return (
        <Input
          type="text"
          placeholder="Rp"
          value={formatLocalCurrency(String(field.value))}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value.replace(/[^0-9]/g, "");
            const parsedValue =
              numericValue === "" ? undefined : parseInt(numericValue, 10);
            field.onChange(parsedValue);
          }}
        />
      );
    }
    return (
      <Input
        type={type}
        {...field}
        value={field.value}
        placeholder={placeholder}
      />
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputField field={field} type={type} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
