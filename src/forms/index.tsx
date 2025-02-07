export { BaseSchemaForm } from "./BaseSchemaForm";

import type {
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  ValidationMode,
} from "@jsonforms/core";

import Checkbox from "./rerenders/controls/Checkbox";
import TextField from "./rerenders/controls/TextField";
import ObjectRenderer from "./rerenders/ObjectRenderer";
import VerticalLayout from "./rerenders/VerticalLayout";

import { BaseSchemaForm } from "./BaseSchemaForm";
import { JsonFormsInitStateProps, JsonFormsReactProps } from "@jsonforms/react";
import { JSX } from "react/jsx-runtime";

const formRenderers: JsonFormsRendererRegistryEntry[] = [
  TextField,
  Checkbox,

  // layouts
  ObjectRenderer,
  VerticalLayout,
];

type SchemaFormProps<T extends JsonSchema> = Omit<
  JSX.IntrinsicAttributes &
    JsonFormsInitStateProps &
    JsonFormsReactProps & { validationMode?: ValidationMode },
  "renderers" | "schema"
> & { schema: T; isDisabled?: boolean };

export function SchemaForm<T extends JsonSchema>({
  ...props
}: SchemaFormProps<T>) {
  return <BaseSchemaForm renderers={formRenderers} {...props} />;
}
