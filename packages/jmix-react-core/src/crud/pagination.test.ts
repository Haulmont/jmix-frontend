import {EntityInstance} from "./EntityInstance";
import {JmixPagination, paginate} from "./pagination";

describe('paginate()', () => {
  let entityList: EntityInstance[] = [];

  beforeEach(() => {
    entityList = [];
    for (let i = 0; i < 50; i++) {
      entityList.push({id: `id${i}`});
    }
  });

  it('valid current/pageSize', () => {
    testPagination(
      [
        {id: 'id0'},
        {id: 'id1'},
        {id: 'id2'},
        {id: 'id3'},
        {id: 'id4'},
      ],
      entityList,
      {
        current: 1,
        pageSize: 5
      }
    );

    testPagination(
      [
        {id: 'id5'},
        {id: 'id6'},
        {id: 'id7'},
        {id: 'id8'},
        {id: 'id9'},
      ],
      entityList,
      {
        current: 2,
        pageSize: 5
      }
    );

    testPagination(
      [
        {id: 'id6'},
        {id: 'id7'},
        {id: 'id8'},
      ],
      entityList,
      {
        current: 3,
        pageSize: 3
      }
    );
  });

  it('outside bounds', () => {
    testPagination(
      [],
      entityList,
      {
        current: 10,
        pageSize: 10
      }
    );
  });

  it('zero current', () => {
    testPagination(
      [],
      entityList,
      {
        current: 0,
        pageSize: 5
      }
    );
  });

  it('zero pageSize', () => {
    testPagination(
      [],
      entityList,
      {
        current: 1,
        pageSize: 0
      }
    );
  });

  it('current, pageSize or pagination is undefined', () => {
    testPagination(
      entityList,
      entityList,
      {
        current: undefined,
        pageSize: undefined
      }
    );

    testPagination(
      entityList,
      entityList,
      {
        current: 1,
        pageSize: undefined
      }
    );

    testPagination(
      entityList,
      entityList,
      {
        current: undefined,
        pageSize: 10
      }
    );

    testPagination(
      entityList,
      entityList,
      undefined
    );
  });

});

function testPagination(expected: EntityInstance[], entityList: EntityInstance[], pagination?: JmixPagination) {
  const paginated = paginate(entityList, pagination);
  expect(paginated, JSON.stringify(pagination)).toEqual(expected);
}
