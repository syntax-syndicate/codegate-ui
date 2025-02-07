export { BaseSchemaForm } from "./BaseSchemaForm";

import type {
  JsonFormsRendererRegistryEntry,
  ValidationMode,
} from "@jsonforms/core";

import Checkbox from "./rerenders/controls/Checkbox";
import TextField from "./rerenders/controls/TextField";
import ObjectRenderer from "./rerenders/ObjectRenderer";
import VerticalLayout from "./rerenders/VerticalLayout";

import { BaseSchemaForm } from "./BaseSchemaForm";
import { JsonFormsInitStateProps, JsonFormsReactProps } from "@jsonforms/react";
import { JSX } from "react/jsx-runtime";
import { z } from "zod";

const formRenderers: JsonFormsRendererRegistryEntry[] = [
  TextField,
  Checkbox,

  // layouts
  ObjectRenderer,
  VerticalLayout,
];

export const SchemaForm = (
  props: Omit<
    JSX.IntrinsicAttributes &
      JsonFormsInitStateProps &
      JsonFormsReactProps & { validationMode?: ValidationMode },
    "renderers" | "schema"
  > & { schema: z.ZodTypeAny },
) => {
  return <BaseSchemaForm renderers={formRenderers} {...props} />;
};
