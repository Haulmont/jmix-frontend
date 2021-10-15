import { Descriptions } from "antd";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { HotkeyConfig } from "@amplicode/react-core";

function groupBy<T extends Record<string, any>>(arr: T[], propName: string): Record<string, T[]> {
  return arr.reduce<any>((acc, el) => {
    if (acc[el[propName]]) {
      acc[el[propName]].push(el);
    } else {
      acc[el[propName]] = []
      acc[el[propName]].push(el);
    }
    return acc;
  }, {});
}

interface HotkeyInfoProps {
  hotkeyConfigs: HotkeyConfig[];
}
export const HotkeyInfo = observer(({hotkeyConfigs}: HotkeyInfoProps) => {
  const intl = useIntl();

  const hotkeysConfigByCategory = groupBy(hotkeyConfigs, 'categoryName');

  return (
    <div>
      {Object.entries(hotkeysConfigByCategory)
        .map(([category, categoryHotkeysConfig]) => (
          <Descriptions
            key={category}
            title={intl.formatMessage({id: category})}
            column={1}
          >
            {categoryHotkeysConfig
              .map(hotkeyConfig =>
                <Descriptions.Item
                  key={hotkeyConfig.description}
                  label={hotkeyConfig.pattern}
                >
                  {intl.formatMessage({id: hotkeyConfig.description})}
                </Descriptions.Item>
              )
            }
          </Descriptions>
        ))
      }
    </div>
  )
});
