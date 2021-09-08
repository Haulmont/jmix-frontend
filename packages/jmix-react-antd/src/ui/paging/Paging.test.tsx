import React from 'react';
import { Paging } from "./Paging";
import {
  defaultPaginationConfig
} from "@haulmont/jmix-react-web";
import renderer from 'react-test-renderer';

describe('Paging component', () => {

  it('Paging is rendered', async () => {
    const props = {
      paginationConfig: {...defaultPaginationConfig},
      pageSize: 10,
      total: 50,
      onPagingChange: () => ({})
    };

    const items = renderer.create(<Paging {...props}/>).root
      .findAll(el => el.props.className?.indexOf('ant-pagination-item ant-pagination-item-') === 0);
    expect(items?.length).toBe(5);
  });
});


