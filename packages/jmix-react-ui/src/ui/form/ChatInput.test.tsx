import * as React from 'react';
import  {act, create, ReactTestRenderer} from 'react-test-renderer';
import {CharInput} from "./CharInput";
import {Input} from "antd";

describe('CharInput', () => {
  const ref = React.createRef<Input>();
  let charInputTestRenderer: ReactTestRenderer;
  it('Renders correctly with required props', () => {
    act(() => {
      charInputTestRenderer = create(<CharInput ref={ref} />);
    });
  })

  it('Passes refs to the container component', () => {
    const input = charInputTestRenderer.root.findByType(Input).instance;
    expect(input).toEqual(ref.current);
  });

  it('Unmounts', () => {
    act(() => charInputTestRenderer.unmount());
  })
})
