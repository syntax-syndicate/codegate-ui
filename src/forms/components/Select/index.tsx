import type { SelectProps as MUISelectProps } from "@mui/material/Select";
import MuiSelect from "@mui/material/Select";

interface SelectProps extends Omit<MUISelectProps, "variant"> {
  variant?: MUISelectProps["variant"] | "minimal";
}

export function Select({ variant, ...props }: SelectProps) {
  if (variant === "minimal") {
    return (
      <MuiSelect
        {...props}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove border on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove border when focused
          },
        }}
      />
    );
  }
  return <MuiSelect {...props} variant={variant} />;
}
