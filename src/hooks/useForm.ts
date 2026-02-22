import { z, ZodType } from "zod";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useState,
  useTransition,
} from "react";
import { getFieldsMap } from "@/src/utils/getFieldsMap";

type FieldErrors<T> = {
  [key: string]: string | undefined;
} & Partial<Record<keyof T, string>>;

export function isValidSchemaField<T extends ZodType>(
  schema: T,
  fieldName: string | number | symbol,
): fieldName is keyof z.infer<T> {
  if (schema instanceof z.ZodObject) {
    return fieldName in schema.shape;
  }
  return false;
}

interface UseFormOptions<T extends ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
}

interface UseFormReturns<T extends ZodType> {
  errors: FieldErrors<z.infer<T>>;
  onBlur: (e: FocusEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLFormElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  isPending: boolean;
}

export const useForm = <T extends ZodType>({
  schema,
  onSubmit,
}: UseFormOptions<T>): UseFormReturns<T> => {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors<z.infer<T>>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    getFieldsMap(schema, false),
  );

  const validateField = (
    form: HTMLFormElement,
    fieldName: keyof z.infer<T>,
  ) => {
    const data = Object.fromEntries(new FormData(form));
    const result = schema.safeParse(data);

    if (result.success) {
      // Validation passed - clear error for this field if it exists
      if (errors[fieldName]) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    } else {
      // Validation failed - get field errors
      const { fieldErrors } = z.flattenError(result.error);
      const errorsForField = fieldErrors[fieldName];

      if (!errorsForField || errorsForField.length === 0) {
        // No errors for this specific field - clear it
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[fieldName];
          return newErrors;
        });
        return;
      }

      // Set the error message
      const fieldError = errorsForField.join(", ");

      if (errors[fieldName] !== fieldError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: fieldError,
        }));
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target;

    if (target.tagName !== "INPUT") return;

    const form = e.currentTarget;
    const name = target.name;

    console.log(name, isValidSchemaField(schema, name), touchedFields[name]);
    if (name && isValidSchemaField(schema, name) && touchedFields[name]) {
      validateField(form, name);
    }
  };

  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    const target = e.target;

    if (target.tagName !== "INPUT") return;
    const name = target.name;

    if (isValidSchemaField(schema, name)) {
      if (name && !touchedFields[name]) {
        setTouchedFields((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }

      validateField(e.currentTarget, name);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouchedFields(getFieldsMap(schema, true));

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const result = schema.safeParse(data);

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);

      // Transform string[] to string
      const transformedErrors: Record<string, string> = {};
      for (const key in fieldErrors) {
        const value = fieldErrors[key];
        if (value && value.length > 0) {
          transformedErrors[key] = value.join(", ");
        }
      }

      setErrors(transformedErrors as FieldErrors<z.infer<T>>);
      return;
    }

    setErrors({});

    startTransition(async () => {
      await onSubmit(result.data);
    });
  };

  return {
    errors,
    onChange,
    onBlur,
    handleSubmit,
    isPending,
  };
};
