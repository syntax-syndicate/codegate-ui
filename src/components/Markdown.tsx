import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { tv } from "tailwind-variants";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

interface Props {
  children: string;
  className?: string;
  fontSize?: keyof typeof markdown.variants.fontSize;
}

const customStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#1a1b26',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    margin: '1.5rem 0',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'none',
    padding: 0,
  },
};

export function Markdown({ children, fontSize, className = "" }: Props) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const inline = !match;
          return !inline ? (
            <SyntaxHighlighter
              style={customStyle}
              language={match[1]}
              PreTag="div"
              className="rounded-lg !my-6 overflow-hidden shadow-lg"
              showLineNumbers={true}
              wrapLines={true}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-800 text-sm" {...props}>
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <>{children}</>;
        },
        h1({ children }) {
          return <h1 className="text-3xl font-bold mb-6">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>;
        },
        p({ children }) {
          return <p className="text-gray-600 leading-relaxed mb-4">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
        },
        li({ children }) {
          return <li className="text-gray-600">{children}</li>;
        },
        a({ children, ...props }) {
          return (
            <a className="text-blue-600 hover:text-blue-800 underline" {...props}>
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
