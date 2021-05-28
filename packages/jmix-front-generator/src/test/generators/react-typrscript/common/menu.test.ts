import {getNewMenuItem, updateAppMenuContent} from "../../../../generators/react-typescript/common/menu"
import uuid from "uuid";
import {assert} from 'chai'

describe ('AppMenu generation', () => {
  it('test getNewMenuItem', () => {
    const key = uuid.v4();
    const componentName = "TestComponent";

    const expectedMenuItem  = `
    <MenuItem 
      screenId={"${componentName}"}
      icon={<BarsOutlined />}
      caption={<FormattedMessage id={"router.${componentName}"} />}
      key={'${key}'}
    />`;

    assert.equal(getNewMenuItem(componentName, key), expectedMenuItem);
  })

  it('test updateAppMenuContent', () => {
    const key = uuid.v4();
    const componentName = "TestComponent";
    const menuNode = "ROOT";
    const appMenuContent = `
    <VerticalMenu>
      <MenuItem/>
    </VerticalMenu>
    `;
    const expectedUpdatedMenuContentn = `
    <VerticalMenu>
      <MenuItem/>
     
    <MenuItem 
      screenId={"${componentName}"}
      icon={<BarsOutlined />}
      caption={<FormattedMessage id={"router.${componentName}"} />}
      key={'${key}'}
    /></VerticalMenu>
    `;

    assert.equal(updateAppMenuContent(appMenuContent, componentName, menuNode, key), expectedUpdatedMenuContentn);
  })
})