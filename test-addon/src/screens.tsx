import React from "react";
import { FormattedMessage } from "react-intl";

export const SomeScreen1: React.FC = () => {
  return (
    <div>
      <FormattedMessage
        id={"addons.SomeAddonName.testedCaption1"} 
      />
    </div>
  )
}

export const SomeScreen2: React.FC = () => {
  return (
    <div>
      <FormattedMessage
        id={"addons.SomeAddonName.testedCaption2"} 
      />
    </div>
  )
}
