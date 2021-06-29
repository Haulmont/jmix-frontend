import * as React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {LongInput} from "./LongInput";
import {InputNumber} from "antd";

describe('LongInput', () => {
  const ref = React.createRef<typeof InputNumber>();
  let longInputTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      longInputTestRenderer = create(<LongInput ref={ref} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = longInputTestRenderer.root.findByType(InputNumber).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => longInputTestRenderer.unmount());
  })
})
