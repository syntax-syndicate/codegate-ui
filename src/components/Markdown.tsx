import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { tv } from "tailwind-variants";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardCopy } from 'lucide-react';

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
    whiteSpace: 'pre-wrap',
    background: '#1a1b26',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    margin: '1.5rem 0',
    fontSize: '10px',
    width: '80%', // Ensure the block takes full width
    position: 'relative', 
  },
};


export function Markdown({ children, fontSize, className = "" }: Props) {
  return (
    <ReactMarkdown
      components={{
        /* eslint-disable @typescript-eslint/no-explicit-any */
        code({ className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const inline = !match;
          return !inline ? (
            <div className="relative group" 
              style={{
                maxWidth: '80%', // Adjust this percentage to reduce the width
                marginLeft: '0', // Align the box to the left
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              <SyntaxHighlighter
                style={{
                  ...customStyle,
                  'pre[class*="language-"]': {
                    ...oneDark['pre[class*="language-"]'],
                    background: '#1a1b26',
                    fontSize: '10x',
                    whiteSpace: 'pre-wrap',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    margin: '1.5rem 0',
                    position: 'relative', // Critical for clipboard positioning
                    width: '100%', // Ensure full width of parent container
                    boxSizing: 'border-box', // Prevent padding overflow
                  },
                }}
                language={match[1]}
                PreTag="div"
                className="rounded-lg overflow-hidden shadow-lg text-sm"
                showLineNumbers={false}
                wrapLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <CopyToClipboard text={String(children).replace(/\n$/, '')}>
                <button
                  className="
                    absolute top-4 right-8 p-2 rounded-md 
                    bg-gray-700/50 hover:bg-gray-700/70 
                    transition-opacity duration-200 
                    opacity-0 group-hover:opacity-100
                  "
                >
                  <ClipboardCopy className="w-5 h-5 text-gray-200" />
                </button>
              </CopyToClipboard>
            </div>



          ) : (
            <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-800 text-sm" {...props}>
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <div className="relative group">{children}</div>;
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
            <a className="text-blue-600 hover:text-blue-800 underline" target="_blank" {...props}>
              {children}
            </a>
          );
        },
        img({ src, alt }) {
          return <img src={src} alt={alt} className="max-w-full h-auto" />;
        },
      }}
      remarkPlugins={[remarkGfm]}
      className={markdown({ fontSize, className })}
    >
      {children}
    </ReactMarkdown>
  );
}
