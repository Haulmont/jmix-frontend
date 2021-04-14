
import React, {useEffect, useState, useCallback } from "react";

interface RouteProps {
    children: React.ReactNode,
    path?: string,
    exact?: boolean
}

export const Route: React.FC<RouteProps> = ({children, path, exact}) => {
    const [ , setUpdate] = useState(false);
    const update = useCallback(() => {
        setUpdate((reRender) => {
            return !reRender;
        })
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', update);
        return () => {
            window.removeEventListener('popstate', update);
        }
      }, []);
      
    if (path) {
        return isMatchPath(path, exact) ? <>{children}</> : null;
    }

    return <>{children}</>
}

export function isMatchPath(path: string, exact: boolean = false): boolean {
    const currentPath = getCurrentPath();
    const match = new RegExp(`^${path}`).exec(currentPath);
  
    if (match) { 
        const [url] = match;
        return exact ?  currentPath === url : true;
    }
  
    return false;
}

function getCurrentPath() {
    const {hash, pathname} = window.location;
    return hash ? hash.replace("#", "") : pathname;
}
  