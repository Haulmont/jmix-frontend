import * as React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {UuidInput} from "./UuidInput";
import {Input} from "antd";

describe('LongInput', () => {
  const ref = React.createRef<Input>();
  let uuidInputTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      uuidInputTestRenderer = create(<UuidInput ref={ref} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = uuidInputTestRenderer.root.findByType(Input).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => uuidInputTestRenderer.unmount());
  })
})
