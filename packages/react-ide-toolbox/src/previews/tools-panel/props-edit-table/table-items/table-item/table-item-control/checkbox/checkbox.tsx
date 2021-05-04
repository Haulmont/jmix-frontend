import React from "react";

export const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = ({className, ...restProps}) => {
  return (
    <div className={className}>
      <input
        {...restProps}
        type={"checkbox"}
      />
    </div>
  )
}
