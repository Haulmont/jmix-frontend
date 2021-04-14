import React from "react";

interface Props {
    children?: JSX.Element | JSX.Element[];
}

export const Previews: React.FC<Props> = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};
