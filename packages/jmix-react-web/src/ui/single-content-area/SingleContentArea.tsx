import { Screens, ScreensContext } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import React, {useState} from "react";
import {singleContentArea} from "./SingleContentAreaState";

export const SingleContentArea = observer(() => {
  const [screens] = useState(new Screens());

  return (
    <ScreensContext.Provider value={screens}>
      {singleContentArea.content}
    </ScreensContext.Provider>
  );
});