import { expect } from 'chai';
import {splitBySteps} from '../../../../generators/react-typescript/entity-form-wizard/template-model';

const createNumberArray = (start: number, end: number) =>
  new Array(end - start + 1)
    .fill(0)
    .map((_, i) => start + i);

describe('entity-form-wizard template helpers', () => {
  describe('splitBySteps', () => {
    it('odd array length', () => {
      const from1To3 = createNumberArray(1, 3);

      expect(splitBySteps(from1To3, 1)).deep.eq([[1, 2, 3]]);
      expect(splitBySteps(from1To3, 2)).deep.eq([[1, 2], [3]]);
      expect(splitBySteps(from1To3, 3)).deep.eq([[1], [2], [3]]);
    });

    it('even array length', () => {
      const from1To4 = createNumberArray(1, 4);

      expect(splitBySteps(from1To4, 1)).deep.eq([[1, 2, 3, 4]]);
      expect(splitBySteps(from1To4, 2)).deep.eq([[1, 2], [3, 4]]);
      expect(splitBySteps(from1To4, 3)).deep.eq([[1, 2], [3], [4]]);
      expect(splitBySteps(from1To4, 4)).deep.eq([[1], [2], [3], [4]]);
    });

    it('long array', () => {
      const from1To10 = createNumberArray(1, 10);

      expect(splitBySteps(from1To10, 1)).deep.eq([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
      expect(splitBySteps(from1To10, 2)).deep.eq([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]);
      expect(splitBySteps(from1To10, 3)).deep.eq([[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]);
      expect(splitBySteps(from1To10, 4)).deep.eq([[1, 2, 3], [4, 5, 6], [7, 8], [9, 10]]);
      expect(splitBySteps(from1To10, 5)).deep.eq([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]);
      expect(splitBySteps(from1To10, 6)).deep.eq([[1, 2], [3, 4], [5, 6], [7, 8], [9], [10]]);
      expect(splitBySteps(from1To10, 7)).deep.eq([[1, 2], [3, 4], [5, 6], [7], [8], [9], [10]]);
      expect(splitBySteps(from1To10, 8)).deep.eq([[1, 2], [3, 4], [5], [6], [7], [8], [9], [10]]);
      expect(splitBySteps(from1To10, 9)).deep.eq([[1, 2], [3], [4], [5], [6], [7], [8], [9], [10]]);
      expect(splitBySteps(from1To10, 10)).deep.eq([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]);
    });
  });
});