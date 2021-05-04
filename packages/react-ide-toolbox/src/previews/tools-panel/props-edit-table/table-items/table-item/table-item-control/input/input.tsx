import React from "react";

export const Input: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  return (
    <input
      {...props}
      type={"text"}
    />
  )
}
