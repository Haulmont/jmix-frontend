import React from "react";
import { ChangeEventHandler } from "react";

export interface ColorPickerProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  /**
   * To be used as `label`'s `for` attribute:
   *
   * <label for="...">
   *
   * Pass `propertyName` here if this component is used in conjunction with Form.Item.
   */
  id?: string;
}

/**
 * A simple color picker component that uses browser's color picker implementation.
 *
 * @param value
 * @param onChange
 * @param disabled
 * @param id
 * @constructor
 */
export const ColorPicker = ({value, onChange, disabled, id}: ColorPickerProps) => (
  <input type='color'
         value={value}
         disabled={disabled}
         onChange={onChange}
         id={id}
  />
);