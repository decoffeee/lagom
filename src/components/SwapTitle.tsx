import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  text: string;
  href?: string;
  className?: string;
  as?: "h3" | "div" | "span";
  onClick?: () => void;
  target?: string;
  rel?: string;
  children?: ReactNode;
} & Pick<ComponentProps<"a">, "aria-current">;

/** Link whose text slides up on hover and is replaced by a duplicate from below. */
export function SwapTitle({ text, href, className = "", as: Tag = "h3", onClick, target, rel, ...rest }: Props) {
  const inner = (
    <span className="swap-wrap">
      <span className="swap-span" data-after={text}>
        {text}
      </span>
    </span>
  );
  return (
    <Tag className={`swap-title ${className}`.trim()} onClick={onClick}>
      {href ? (
        href.startsWith("http") ? (
          <a className="swap-anchor" href={href} target={target} rel={rel} {...rest}>
            {inner}
          </a>
        ) : (
          <Link className="swap-anchor" href={href} {...rest}>
            {inner}
          </Link>
        )
      ) : (
        <button type="button" className="swap-anchor">
          {inner}
        </button>
      )}
    </Tag>
  );
}
