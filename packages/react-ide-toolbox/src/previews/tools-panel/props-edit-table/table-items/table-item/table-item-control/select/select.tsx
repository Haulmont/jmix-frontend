import React from "react";

interface Props extends React.HTMLProps<HTMLSelectElement> {
  oprionsData?: string[] | number[]
}

export const Select: React.FC<Props> = ({oprionsData, ...restProps}) => {
  return (
    <select {...restProps}>
      {oprionsData?.map((value: string | number) => {
        return (
          <option
            value={value}
            key={value}
          >
            {value}
          </option>
        )
      })}
    </select>
  )
}
