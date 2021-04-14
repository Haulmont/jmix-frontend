import {useState, useEffect} from 'react';
import {useMainStore} from "@haulmont/jmix-react-core";
import {InitialHookStatus} from "@haulmont/react-ide-toolbox";

export const useDevLogin: () => InitialHookStatus = () => {
    const mainStore = useMainStore();
    const [status, setStatus] = useState<InitialHookStatus>({loading: true, error: false});

    useEffect(() => {
        const login: string = process.env.REACT_APP_DEVMODE_LOGIN ?? 'admin';
        const password: string = process.env.REACT_APP_DEVMODE_PASSWORD ?? 'admin';
        mainStore!.login(login, password)
        .then(() => {
          setStatus({
            error: false, 
            loading: false
          })
        })
        .catch(() => {
          setStatus({
            loading: false, 
            error: true
          })
        })  
    }, []);
    return status;
}
