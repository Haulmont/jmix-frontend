import React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {InputWithMask} from "./InputWithMask";
import {Input} from "antd";

describe('InputWithMask', () => {
  const ref = React.createRef<Input>();
  let inputWithMaskTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      inputWithMaskTestRenderer = create(<InputWithMask ref={ref} mask={"+4\\\\9 99 999 99"} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = inputWithMaskTestRenderer.root.findByType(Input).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => inputWithMaskTestRenderer.unmount());
  })
})
