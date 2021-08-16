import * as React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {BigDecimalInput} from "./BigDecimalInput";
import {InputNumber} from "antd";

describe('BigDecimalInput', () => {
  const ref = React.createRef<typeof InputNumber>();
  let bigDecimalInputTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      bigDecimalInputTestRenderer = create(<BigDecimalInput ref={ref} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = bigDecimalInputTestRenderer.root.findByType(InputNumber).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => bigDecimalInputTestRenderer.unmount());
  })
})
