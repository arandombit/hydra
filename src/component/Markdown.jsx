import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Code } from '@radix-ui/themes'

const MarkdownDisplay = props => {
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={okaidia}
          language={match[1]}
          PreTag='div'
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <Code className={className} {...props}>
          { children }
        </Code>
      )
    }
  }

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={renderers}
      >
        { props.children }
      </ReactMarkdown>
    </>
  )
}

export default MarkdownDisplay
