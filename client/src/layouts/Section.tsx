import type { ReactNode } from "react";

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  children?: ReactNode;
  className?: string;
};

const Section = (props: ISectionProps) => (
  <div
    className={`${props.className} mx-auto max-w-[1200px] px-7 md:px-5 ${
      props.yPadding ? props.yPadding : "py-[4.2rem]"
    }`}
  >
    {(props.title || props.description) && (
      <div className="mb-4 mt-4 text-left">
        {props.title && (
          <h2 className="text-3xl font-bold text-gray-900">{props.title}</h2>
        )}
        {props.description && (
          <div className="mt-4 text-xl md:px-20">{props.description}</div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
