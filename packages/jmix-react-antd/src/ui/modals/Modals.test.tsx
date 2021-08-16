import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Modals, modals } from "./Modals";

let container = document.createElement("div");

const testedJsx = (
  <Modals>
    <div>
      tested content
    </div>
  </Modals>
)

describe('Modals component and API', () => {

  describe('Modals component', () => {

    it('Modals renders without crashing', () => {
      TestRenderer.act(() => {
        TestRenderer.create(testedJsx)
      })
    })
  })

  describe('Modals API', () => {

    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
    });

    it('open method', () => {
      act(() => {
        render(testedJsx, container);
      });
      act(() => {
        modals.open({
          content: <span id="testedModal"> tested Modal</span>
        });
      });
      const testedModalContent = document.getElementById("testedModal");
      expect(testedModalContent).not.toBeNull();
    });

    it('dispose method, which open method returned', () => {
      let disposeOpenedModal: any;
      let testedModalContent: HTMLElement | null = null;
      act(() => {
        render(testedJsx, container);
      });
      act(() => {
        disposeOpenedModal = modals.open({
          content: <span id="testedModal"> tested Modal</span>
        });
      });
      testedModalContent = document.getElementById("testedModal");
      expect(testedModalContent).not.toBeNull();

      act(() => {
        disposeOpenedModal();
      });
      testedModalContent = document.getElementById("testedModal");
      expect(testedModalContent).toBeNull();
    });

    it('close method', () => {
      const firstModalOptions = {
        content: <span id="firstModal">first tested Modal</span>
      }
      const secondModalOptions = {
        content: <span id="secondModal">second tested Modal</span>
      }
      let firstTestedModalContent: HTMLElement | null = null;
      let secondTestedModalContent: HTMLElement | null = null;

      act(() => {
        render(testedJsx, container);
      });

      act(() => {
        modals.open(firstModalOptions);
        modals.open(secondModalOptions);
      });
      firstTestedModalContent = document.getElementById("firstModal");
      secondTestedModalContent = document.getElementById("secondModal");
      expect(firstTestedModalContent).not.toBeNull();
      expect(secondTestedModalContent).not.toBeNull();

      act(() => {
        modals.close(firstModalOptions);
      });
      firstTestedModalContent = document.getElementById("firstModal");
      secondTestedModalContent = document.getElementById("secondModal");
      expect(firstTestedModalContent).toBeNull();
      expect(secondTestedModalContent).not.toBeNull();

      act(() => {
        modals.close(secondModalOptions);
      });
      firstTestedModalContent = document.getElementById("firstModal");
      secondTestedModalContent = document.getElementById("secondModal");
      expect(firstTestedModalContent).toBeNull();
      expect(secondTestedModalContent).toBeNull();
    });

    it('closeAll method', () => {
      const firstModalOptions = {
        content: <span id="firstModal">first tested Modal</span>
      }
      const secondModalOptions = {
        content: <span id="secondModal">second tested Modal</span>
      }
      let firstTestedModalContent: HTMLElement | null = null;
      let secondTestedModalContent: HTMLElement | null = null;

      act(() => {
        render(testedJsx, container);
      });

      act(() => {
        modals.open(firstModalOptions);
        modals.open(secondModalOptions);
      });
      firstTestedModalContent = document.getElementById("firstModal");
      secondTestedModalContent = document.getElementById("secondModal");
      expect(firstTestedModalContent).not.toBeNull();
      expect(secondTestedModalContent).not.toBeNull();

      act(() => {
        modals.closeAll();
      });
      firstTestedModalContent = document.getElementById("firstModal");
      secondTestedModalContent = document.getElementById("secondModal");
      expect(firstTestedModalContent).toBeNull();
      expect(secondTestedModalContent).toBeNull();
    });

  })
})
