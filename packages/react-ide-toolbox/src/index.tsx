import React from "react";

export const DEV_MODE = process.env.REACT_APP_IDE_DEVMODE === "true";

export const DevSupport: React.FC = ({children}: any) => {
    return <>{children} </>
}
