import React from "react";
// import className from "classnames";

type IButtonProps = {
  xl?: boolean;
  children: React.ReactNode;
  classProps?: string; // Made optional
  onClick?: () => void;
};

const Button = (props: IButtonProps) => {
  // const btnClass = className({
  //   btn: true,
  //   "btn-xl": props.xl,
  //   "btn-base": !props.xl,
  //   "btn-primary": true,
  // });

  return (
    <button
      className={`${props.classProps || ""}`}
      onClick={props.onClick}
    >
      {props.children}

      <style jsx>
        {`
          .btn {
            display: inline-block;
            border-radius: 0.375rem;
            text-align: center;
          }

          .btn-base {
            font-size: 1.125rem;
            font-weight: 600;
            padding: 0.5rem 1rem;
          }

          .btn-xl {
            font-weight: 800;
            font-size: 1.25rem;
            padding: 1rem 1.5rem;
          }

          .btn-primary {
            color: white;
            background-color: #0070f3;
          }

          .btn-primary:hover {
            background-color: #0055b3;
            cursor: pointer;
          }
        `}
      </style>
    </button>
  );
};

export { Button };
