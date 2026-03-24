import type { PropsWithChildren, ReactNode } from "react";

type SectionProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}>;

export function Section({
  eyebrow,
  title,
  description,
  actions,
  className,
  children,
}: SectionProps) {
  return (
    <section className={`section ${className ?? ""}`.trim()}>
      <div className="section-heading">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
        {actions ? <div className="section-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
