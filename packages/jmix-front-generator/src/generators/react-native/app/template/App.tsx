import React from 'react';
import {AsyncStorage} from 'react-native';
import {registerBase64} from "./util/base64";
import {JmixAppProvider} from "@haulmont/jmix-react-core";
import {Root} from "./components/Root";
import {jmixREST, REST_TOKEN_STORAGE_KEY} from './rest/rest';

registerBase64();

export default function App() {
  return (
    <JmixAppProvider jmixREST={jmixREST} retrieveRestApiToken={() => AsyncStorage.getItem(REST_TOKEN_STORAGE_KEY)}>
      <Root/>
    </JmixAppProvider>
  );
}
