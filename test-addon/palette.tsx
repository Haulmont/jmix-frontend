import React from "react"
import {SomeScreen1, SomeScreen2} from "./dist";
import {
  Palette,
  Category,
  Component,
  Variant
} from "@react-buddy/ide-toolbox";

export const TestAddonPalette: React.FC = () => {
  return (
    <Palette>
      <Category name={"test-addon"}>
        <Component name={"some screen 1"}>
          <Variant>
            <SomeScreen1/>
          </Variant>
        </Component>
        <Component name={"some screen 2"}>
          <Variant>
            <SomeScreen2/>
          </Variant>
        </Component>
      </Category>
    </Palette>
  )
}
