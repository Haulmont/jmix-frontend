import React from "react";
import MvpScreenEditor from "../app/mvp/MvpScreenEditor";
import MvpScreen from "../app/mvp/MvpScreen";
import { Previews, ComponentPreview } from "@haulmont/react-ide-toolbox";

export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/MvpScreen">
        <MvpScreen />
      </ComponentPreview>
      <ComponentPreview path="/MvpScreenEditor">
        <MvpScreenEditor />
      </ComponentPreview>
    </Previews>
  );
};
