import type { JsonSchema, ValidationMode } from "@jsonforms/core";
import type {
  JsonFormsInitStateProps,
  JsonFormsReactProps,
} from "@jsonforms/react";
import { JsonForms } from "@jsonforms/react";

type FormProps = JsonFormsInitStateProps &
  JsonFormsReactProps & {
    validationMode?: ValidationMode;
    schema: JsonSchema;
  };

export function BaseSchemaForm(props: FormProps) {
  return <JsonForms {...props} />;
}
