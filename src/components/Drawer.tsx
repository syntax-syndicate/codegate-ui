import { tv } from "tailwind-variants";

const drawerStyles = tv({
  base: "flex h-[calc(100vh-4rem)] shadow-custom bg-teal-25 transition-all duration-500 ease-in-out",
  variants: {
    isOpen: {
      true: "translate-x-0 opacity-100 w-72 p-4",
      false: "w-16 p-4",
    },
    position: {
      left: "left-0",
      right: "right-0",
    },
  },
  defaultVariants: {
    isOpen: false,
    position: "left",
  },
});

export function Drawer({
  children,
  isOpen,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return <div className={drawerStyles({ isOpen })}>{children}</div>;
}
