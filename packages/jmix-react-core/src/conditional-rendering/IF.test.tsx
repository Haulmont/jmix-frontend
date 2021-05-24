import React from 'react';
import {IF} from "./IF";
import TestRenderer, { ReactTestRenderer, ReactTestRendererJSON, ReactTestRendererNode } from 'react-test-renderer';

let compWithIf: ReactTestRenderer;
let compWithIfChildren: ReactTestRendererNode[] | null;

const TestedCompWithIf: React.FC = () => {
  return (
    <div>
      some test content
      <IF condition={true} onTrue={() => (
        <span>
          content with true condition
        </span>
      )}/>
      <IF onTrue={() => (
        <p>
          content with false condition
        </p>
      )}/>
    </div>
  ) 
}

describe("IF component",() => {
  it('IF component renders wihout crashing' ,() => {
    TestRenderer.act(() => {
      compWithIf = TestRenderer.create(
        <TestedCompWithIf/>
      )
    })
    compWithIfChildren = (compWithIf.toJSON() as ReactTestRendererJSON).children;
  });

  it("true condition works correctly", () => {
    const compWithIfSpanChild = compWithIfChildren!.find((child: any) => {
      return child?.type === 'span'
    })
    expect(compWithIfSpanChild).not.toBeUndefined();
  });

  it("false condition works correctly", () => {
    const compWithIfPChild = compWithIfChildren!.find((child: any) => {
      return child?.type === 'p'
    })
    expect(compWithIfPChild).toBeUndefined();
  })
})
