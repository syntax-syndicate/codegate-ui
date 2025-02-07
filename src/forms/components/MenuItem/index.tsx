import type { MenuItemProps as BaseMenuItemProps } from "@mui/material/MenuItem";
import MuiMenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

type MenuItemVariantType = "default" | "destructive";

interface MenuItemProps extends BaseMenuItemProps {
  variant?: MenuItemVariantType;
  href?: string;
}

function useVariantStyles(variant: MenuItemVariantType) {
  const theme = useTheme();

  if (variant === "destructive") {
    const color = theme.palette.error.main;
    return { color, "& *": { color } };
  }

  return {};
}

export function MenuItem({
  variant = "default",
  href,
  ...props
}: MenuItemProps) {
  const sx = useVariantStyles(variant);

  if (href !== undefined) {
    return (
      <Link href={href}>
        <MenuItem variant={variant} {...props} />
      </Link>
    );
  }

  return <MuiMenuItem {...props} sx={sx} />;
}
