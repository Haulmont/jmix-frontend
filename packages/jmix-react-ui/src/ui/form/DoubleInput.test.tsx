import React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {DoubleInput} from "./DoubleInput";
import {InputNumber} from "antd";

describe('DoubleInput', () => {
  const ref = React.createRef<typeof InputNumber>();
  let inputWithMaskTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      inputWithMaskTestRenderer = create(<DoubleInput ref={ref} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = inputWithMaskTestRenderer.root.findByType(InputNumber).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => inputWithMaskTestRenderer.unmount());
  })
}) 

