import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { CopyToClipboard } from "./CopyToClipboard";

interface Props {
  children: string;
  className?: string;
}

const customStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    whiteSpace: "pre-wrap",
    background: "#1a1b26",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    margin: "1.5rem 0",
    fontSize: "10px",
    width: "80%", // Ensure the block takes full width
    position: "relative",
  },
};

export function Markdown({ children, className = "" }: Props) {
  return (
    <ReactMarkdown
      components={{
        /* eslint-disable @typescript-eslint/no-explicit-any */
        code({ className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const inline = !match;
          return !inline ? (
            <div className="relative group w-full ml-0 px-4">
              <SyntaxHighlighter
                style={{
                  ...customStyle,
                  'pre[class*="language-"]': {
                    ...oneDark['pre[class*="language-"]'],
                    background: "#1a1b26",
                    fontSize: "10x",
                    whiteSpace: "pre-wrap",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    margin: "1.5rem 0",
                    position: "relative", // Critical for clipboard positioning
                    width: "100%", // Ensure full width of parent container
                    boxSizing: "border-box", // Prevent padding overflow
                  },
                }}
                language={match[1]}
                PreTag="div"
                className="rounded-lg overflow-hidden shadow-lg text-sm"
                showLineNumbers={false}
                wrapLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
              <CopyToClipboard text={String(children).replace(/\n$/, "")} />
            </div>
          ) : (
            <SyntaxHighlighter
              style={{
                ...customStyle,
                'pre[class*="language-"]': {
                  ...oneDark['pre[class*="language-"]'],
                  fontSize: "10x",
                  whiteSpace: "pre-wrap",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  margin: "1.5rem 0",
                  position: "relative", // Critical for clipboard positioning
                  width: "100%", // Ensure full width of parent container
                  boxSizing: "border-box", // Prevent padding overflow
                },
              }}
              PreTag="div"
              className="rounded-lg overflow-hidden shadow-lg text-sm"
              showLineNumbers={false}
              wrapLines={true}
              {...props}
            >
              {children}
            </SyntaxHighlighter>
          );
        },
        p({ children }) {
          return (
            <p className={cn("text-gray-600 leading-relaxed mb-4", className)}>
              {children}
            </p>
          );
        },
        pre({ children }) {
          return <div className="not-prose">{children}</div>;
        },

        a({ children, ...props }) {
          return (
            <a
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              {...props}
            >
              {children}
            </a>
          );
        },
        img({ src, alt }) {
          return <img src={src} alt={alt} className="max-w-full h-auto" />;
        },
      }}
      remarkPlugins={[remarkGfm]}
      className={className}
    >
      {children}
    </ReactMarkdown>
  );
}
