import React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {IntegerInput} from "./IntegerInput";
import {InputNumber} from "antd";

describe('IntegerInput', () => {
  const ref = React.createRef<typeof InputNumber>();
  let integerInputTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      integerInputTestRenderer = create(<IntegerInput ref={ref} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = integerInputTestRenderer.root.findByType(InputNumber).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => integerInputTestRenderer.unmount());
  })
})
