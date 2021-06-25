import {assertNever, ContentDisplayMode, useMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import React from "react";
import { SingleContentArea } from "../single-content-area/SingleContentArea";
import {MultiTabs} from "../Tabs";

export const ContentArea = observer(() => {
  const {contentDisplayMode} = useMainStore();

  switch (contentDisplayMode) {
    case ContentDisplayMode.ActivateExistingTab:
    case ContentDisplayMode.AlwaysNewTab:
      return <MultiTabs />;
    case ContentDisplayMode.NoTabs:
      return <SingleContentArea />;
    default:
      assertNever('MainStore.contentDisplayMode', contentDisplayMode);
  }
});