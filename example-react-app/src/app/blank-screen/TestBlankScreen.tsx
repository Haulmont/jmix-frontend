import React from "react";
import { registerScreen, Button } from "@haulmont/jmix-react-ui";

const ROUTING_PATH = "/testBlankScreen";

export const TestBlankScreen = () => (
  <div>
    Buttons
    <div>
      <Button
        type={"primary"}
      >
        Default antd button
      </Button>
    </div>
    <div>
      <Button<MyButtonProps>
        title={"Custom button"}
        buttonComponent={MyButton}
      />
    </div>
  </div>
);

interface MyButtonProps {
  title: string
}
const MyButton = ({ title }: MyButtonProps) => {
  return (
    <button
      style={{ backgroundColor: "red" }}
    >
      {title}
    </button>
  )
}

registerScreen({
  component: TestBlankScreen,
  caption: "screen.TestBlankScreen",
  screenId: "TestBlankScreen",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
