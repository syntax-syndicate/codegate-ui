import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { tv } from "tailwind-variants";

const markdown = tv({
  base: "prose max-w-full",
  variants: {
    fontSize: {
      sm: "prose-sm",
      base: "prose-base",
      lg: "prose-lg",
      xl: "prose-xl",
      "2xl": "prose-2xl",
    },
  },
  defaultVariants: {
    fontSize: "base",
  },
});

const preStyle = tv({
  base: "overflow-x-auto max-h-80 p-2 bg-zinc-200 text-gray-700",
  variants: {
    dark: { true: "bg-zinc-800 text-gray-300" },
  },
});

interface Props {
  children: string;
  className?: string;
  dark?: boolean;
  fontSize?: keyof typeof markdown.variants.fontSize;
}

export function Markdown({ children, fontSize, dark, className = "" }: Props) {
  return (
    <ReactMarkdown
      components={{
        pre: ({ children, ...props }) => (
          <pre {...props} className={preStyle({ dark, className })}>
            {children}
          </pre>
        ),
        a({ children, ...props }) {
          return (
            <a {...props} target="_blank">
              {children}
            </a>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      className={markdown({ fontSize, className })}
    >
      {children}
    </ReactMarkdown>
  );
}
