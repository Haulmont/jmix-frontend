import {getNewMenuItem, getMenuItem, getSubMenuItem, updateAppMenuContent, MenuItemTypes} from "../../../../generators/react-typescript/common/menu"
import uuid from "uuid";
import {assert} from 'chai'
import {stripNewLines} from "../../../test-commons";

describe ('AppMenu generation', () => {
  describe('new menu item generation', () => {
    it('test getMenuItem', () => {
      const key = uuid.v4();
      const componentName = "TestComponent";
  
      const expectedMenuItem  = `
    <MenuItem 
      screenId={"${componentName}"}
      icon={<BarsOutlined />}
      caption={"screen.${componentName}"}
      key={'${key}'}
    />`;
      assert.equal(getMenuItem(componentName, key), expectedMenuItem);
    });

    it('test getSubMenuItem', () => {
      const key = uuid.v4();
      const caption = "custom.TestComponent";
  
      const expectedMenuItem  = `
    <SubMenuItem 
      caption={"${caption}"}
      key={"${key}"}
    >
      
    </SubMenuItem >`;
      assert.equal(getSubMenuItem(caption, key), expectedMenuItem);
    });

    it('test getNewMenuItem with menu item generartion', () => {
      const key = uuid.v4();
      const componentName = "TestComponent";
  
      const expectedMenuItem  = `
    <MenuItem 
      screenId={"${componentName}"}
      icon={<BarsOutlined />}
      caption={"screen.${componentName}"}
      key={'${key}'}
    />`;

      assert.equal(getNewMenuItem(componentName, key, MenuItemTypes.MenuItem), expectedMenuItem);
    });
    it('test getNewMenuItem with sub menu item generation', () => {
      const key = uuid.v4();
      const caption = "custom.TestComponent";
  
      const expectedMenuItem  = `
    <SubMenuItem 
      caption={"${caption}"}
      key={"${key}"}
    >
      
    </SubMenuItem >`;

      assert.equal(
        stripNewLines(getNewMenuItem(caption, key, MenuItemTypes.SubMenuItem)), 
        stripNewLines(expectedMenuItem)
      );
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
    
        assert.equal(stripNewLines(updateAppMenuContent(appMenuContent, componentName, menuNode, key)), stripNewLines(expectedUpdatedMenuContent));
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

        assert.equal(stripNewLines(updateAppMenuContent(appMenuContent, componentName, menuNode, key)), stripNewLines(expectedUpdatedMenuContent));
      });

      it('adding new menu item to ADDON node', () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const menuNode = "ADDON";
        const appMenuContent = `
        <VerticalMenu>
          <MenuItem/>
          <SubMenuItem
                key={"addons"}
                caption={"addons.Addons"}
          >
          </SubMenuItem>
        </VerticalMenu>
        `;
        const expectedUpdatedMenuContent = `\r
        <VerticalMenu>\r
          <MenuItem/>\r
          <SubMenuItem\r
                key={"addons"}\r
                caption={"addons.Addons"}\r
          >\r
            <MenuItem \r
                  screenId={"${componentName}"}\r
                  icon={<BarsOutlined />}\r
                  caption={"screen.${componentName}"}\r
                  key={'${key}'}\r
                /></SubMenuItem>\r
        </VerticalMenu>\r
        `;

        assert.equal(
          stripNewLines(updateAppMenuContent(appMenuContent, componentName, menuNode, key)), 
          stripNewLines(expectedUpdatedMenuContent)
        );
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

        assert.equal(stripNewLines(updateAppMenuContent(appMenuContent, componentName, null, key)), stripNewLines(appMenuContent));
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
    
        assert.equal(stripNewLines(updateAppMenuContent(appMenuContent, componentName, menuNode, key)), stripNewLines(expectedUpdatedMenuContent));
      });
      it('adding new menu item to ADDON node', () => {
        const key = uuid.v4();
        const componentName = "TestComponent";
        const menuNode = "ADDON";
        const appMenuContent = `
        <HorizontalMenu>
          <MenuItem/>
          <SubMenuItem
                key={"addons"}
                caption={"addons.Addons"}
          >
          </SubMenuItem>
        </HorizontalMenu>
        `;
        const expectedUpdatedMenuContent = `\r
        <HorizontalMenu>\r
          <MenuItem/>\r
          <SubMenuItem\r
                key={"addons"}\r
                caption={"addons.Addons"}\r
          >\r
            <MenuItem \r
                  screenId={"${componentName}"}\r
                  icon={<BarsOutlined />}\r
                  caption={"screen.${componentName}"}\r
                  key={'${key}'}\r
                /></SubMenuItem>\r
        </HorizontalMenu>\r
        `;

        assert.equal(
          stripNewLines(updateAppMenuContent(appMenuContent, componentName, menuNode, key)), 
          stripNewLines(expectedUpdatedMenuContent)
        );
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

        assert.equal(stripNewLines(updateAppMenuContent(appMenuContent, componentName, menuNode, key)), stripNewLines(expectedUpdatedMenuContent));
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

        assert.equal(stripNewLines(updateAppMenuContent(appMenuContent, componentName, null, key)), stripNewLines(appMenuContent));
      })
    })
  })
})