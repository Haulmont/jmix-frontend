import React, { createContext, useContext } from "react";
import { MasterDetailStore } from "./MasterDetailStore";

export const MasterDetailManagerContext = createContext<{
    masterDetailStore: MasterDetailStore;
}>({
    masterDetailStore: new MasterDetailStore(),
});

export const useMasterDetailStore = () => {
    const {masterDetailStore} = useContext(MasterDetailManagerContext);

    return masterDetailStore;
}

export const MasterDetailProvider = ({children}: {children: React.ReactNode}) => (
    <MasterDetailManagerContext.Consumer>
        {({masterDetailStore}) => (
            <MasterDetailManagerContext.Provider value={{ masterDetailStore }}>
                {children}
            </MasterDetailManagerContext.Provider>
        )}
    </MasterDetailManagerContext.Consumer>
);
