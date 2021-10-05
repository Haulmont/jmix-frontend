import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import App from "../app/App";

export const ComponentPreviews = () => {
  return (
    <Previews>
        <ComponentPreview path="/App">
            <App/>
        </ComponentPreview>
    </Previews>
  );
};
