import {getNewMenuItem, updateAppMenuContent} from "../../../../generators/react-typescript/common/menu"
import uuid from "uuid";
import {assert} from 'chai'

describe ('AppMenu generation', () => {
  describe('new menu item generation', () => {
    it('test getNewMenuItem', () => {
      const key = uuid.v4();
      const componentName = "TestComponent";
  
      const expectedMenuItem  = `
    <MenuItem 
      screenId={"${componentName}"}
      icon={<BarsOutlined />}
      caption={"screen.${componentName}"}
      key={'${key}'}
    />`;

      assert.equal(getNewMenuItem(componentName, key), expectedMenuItem);
    });
  });

  describe("update contentn in AppMenu", () => {
    describe("AppMenu with VerticalMenu", () => {
      it('adding new menu item to ROOT node', () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const menuNode = "ROOT";
        const appMenuContent = `
        <VerticalMenu>
          <MenuItem/>
        </VerticalMenu>
        `;
        const expectedUpdatedMenuContent = `\r
        <VerticalMenu>\r
          <MenuItem/>\r
          <MenuItem \r
                screenId={"${componentName}"}\r
                icon={<BarsOutlined />}\r
                caption={"screen.${componentName}"}\r
                key={'${key}'}\r
              /></VerticalMenu>\r
        `;
    
        assert.equal(updateAppMenuContent(appMenuContent, componentName, menuNode, key), expectedUpdatedMenuContent);
      });

      it('adding new menu item to custom node', () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const menuNode = "test";
        const appMenuContent = `
        <VerticalMenu>
          <MenuItem/>
          <SubMenuItem
                key={"test"}
          >
            <MenuItem/>
          </SubMenuItem>
          <MenuItem/>
        </VerticalMenu>
        `;
        const expectedUpdatedMenuContent = `\r
        <VerticalMenu>\r
          <MenuItem/>\r
          <SubMenuItem\r
                key={"test"}\r
          >\r
            <MenuItem/>\r
            <MenuItem \r
                  screenId={"${componentName}"}\r
                  icon={<BarsOutlined />}\r
                  caption={"screen.${componentName}"}\r
                  key={'${key}'}\r
                /></SubMenuItem>\r
          <MenuItem/>\r
        </VerticalMenu>\r
        `;

        assert.equal(updateAppMenuContent(appMenuContent, componentName, menuNode, key), expectedUpdatedMenuContent);
      });

      it("updating doesn't happen when menu node is null", () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const appMenuContent = `
        <VerticalMenu>
          <MenuItem/>
          <SubMenuItem
                key={"test"}
          >
            <MenuItem/>
          </SubMenuItem>
          <MenuItem/>
        </VerticalMenu>
        `;

        assert.equal(updateAppMenuContent(appMenuContent, componentName, null, key), appMenuContent);
      })
    })

    describe("AppMenu with HorizontalMenu", () => {
      it('adding new menu item to ROOT node', () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const menuNode = "ROOT";
        const appMenuContent = `
        <HorizontalMenu>
          <MenuItem/>
        </HorizontalMenu>
        `;
        const expectedUpdatedMenuContent = `\r
        <HorizontalMenu>\r
          <MenuItem/>\r
          <MenuItem \r
                screenId={"${componentName}"}\r
                icon={<BarsOutlined />}\r
                caption={"screen.${componentName}"}\r
                key={'${key}'}\r
              /></HorizontalMenu>\r
        `;
    
        assert.equal(updateAppMenuContent(appMenuContent, componentName, menuNode, key), expectedUpdatedMenuContent);
      });

      it('adding new menu item to custom node', () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const menuNode = "test";
        const appMenuContent = `
        <HorizontalMenu>
          <MenuItem/>
          <SubMenuItem
                key={"test"}
          >
            <MenuItem/>
          </SubMenuItem>
          <MenuItem/>
        </HorizontalMenu>
        `;
        const expectedUpdatedMenuContent = `\r
        <HorizontalMenu>\r
          <MenuItem/>\r
          <SubMenuItem\r
                key={"test"}\r
          >\r
            <MenuItem/>\r
            <MenuItem \r
                  screenId={"${componentName}"}\r
                  icon={<BarsOutlined />}\r
                  caption={"screen.${componentName}"}\r
                  key={'${key}'}\r
                /></SubMenuItem>\r
          <MenuItem/>\r
        </HorizontalMenu>\r
        `;

        assert.equal(updateAppMenuContent(appMenuContent, componentName, menuNode, key), expectedUpdatedMenuContent);
      });

      it("updating doesn't happen when menu node is null", () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const appMenuContent = `
        <HorizontalMenu>
          <MenuItem/>
          <SubMenuItem
                key={"test"}
          >
            <MenuItem/>
          </SubMenuItem>
          <MenuItem/>
        </HorizontalMenu>
        `;

        assert.equal(updateAppMenuContent(appMenuContent, componentName, null, key), appMenuContent);
      })
    })
  })
})