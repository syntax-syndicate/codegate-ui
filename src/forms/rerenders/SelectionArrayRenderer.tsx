import type {
  ArrayControlProps,
  DispatchPropsOfControl,
} from "@jsonforms/core";
import type { JsonFormsStateContext } from "@jsonforms/react";
import {
  withJsonFormsArrayControlProps,
  withJsonFormsContext,
} from "@jsonforms/react";
import { Add } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";

import type { ProfileEntityType } from "@/types/common";
import { RemoveIcon } from "@/ui-kit/icons";

import { MenuItem } from "../components/MenuItem";
import { Select } from "../components/Select";

interface SelectionItem {
  entity: ProfileEntityType | undefined;
  selector: string | undefined;
}

interface Props {
  props: Omit<ArrayControlProps, "data"> & {
    handleChange?: DispatchPropsOfControl["handleChange"];
    data: SelectionItem[];
  };
  ctx: JsonFormsStateContext;
}

const SelectionArrayRenderer = ({ props, ctx }: Props) => {
  const { data = [], path, handleChange, removeItems, addItem, schema } = props;
  const validationMode = ctx.core ? ctx.core.validationMode : "ValidateAndHide";
  const requiredFields = schema.required ?? [];
  const isSelectorRequired = requiredFields.includes("selector");
  const isEntityRequired = requiredFields.includes("entity");

  const handleAddItem = useCallback(() => {
    const newItem = {};
    addItem(path, newItem)();
  }, [addItem, path]);

  const handleRemoveItem = useCallback(
    (index: number) => {
      if (removeItems) {
        removeItems(path, [index])();
      }
    },
    [removeItems, path],
  );

  const handleItemChange = useCallback(
    (index: number, field: "entity" | "selector", value: string) => {
      const values = data.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      );
      if (data === values) return;
      if (handleChange) {
        handleChange(path, values);
      }
    },
    [path, data, handleChange],
  );

  return (
    <div className="flex flex-col space-y-4">
      {data.map((item, index) => {
        const isNotFirstChild = index > 0;
        const hasNotEntity = item.entity === undefined;
        const showEntityErrors =
          hasNotEntity && validationMode === "ValidateAndShow";
        const showSelectorsErrors =
          item.selector === undefined && validationMode === "ValidateAndShow";

        return (
          <div className="flex w-full items-center gap-4" key={index}>
            <FormControl className="w-60">
              {hasNotEntity && (
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
              )}
              <Select
                {...(hasNotEntity && { label: "Select" })}
                value={item.entity ?? ""}
                required={isEntityRequired}
                error={
                  showEntityErrors ? requiredFields.includes("entity") : false
                }
                onChange={(event) =>
                  handleItemChange(
                    index,
                    "entity",
                    event.target.value as string,
                  )
                }
              >
                {(schema.properties?.entity.oneOf ?? []).map((option) => (
                  <MenuItem key={option.const} value={option.const}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              error={
                showSelectorsErrors
                  ? requiredFields.includes("selector")
                  : false
              }
              required={isSelectorRequired}
              value={item.selector ?? ""}
              onChange={(event) =>
                handleItemChange(index, "selector", event.target.value)
              }
            />
            {isNotFirstChild && (
              <IconButton
                color="secondary"
                size="small"
                onClick={() => handleRemoveItem(index)}
              >
                <RemoveIcon />
              </IconButton>
            )}
          </div>
        );
      })}
      <div className="mt-4">
        <Button variant="outlined" color="primary" onClick={handleAddItem}>
          <Add /> Add another selector
        </Button>
      </div>
    </div>
  );
};

export default withJsonFormsArrayControlProps(
  withJsonFormsContext(SelectionArrayRenderer),
  true,
);
