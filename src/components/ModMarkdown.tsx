import { ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Icons
import { LuMapPin } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa6";

interface LProps {
    href?: string,
    children?: ReactNode
}

function LinkRenderer({href, children}: LProps) {
    return (
      <a className="text-primary" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  

interface Props {
    children?: string
}

export default function ModMarkdown({children}: Props) {
    return (<Markdown components={{ a: LinkRenderer}} className="markdown text-justify" remarkPlugins={[remarkGfm]}>{children}</Markdown>)
}