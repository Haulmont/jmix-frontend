import {Modal} from "antd";
import {IntlShape} from "react-intl";
import {MayHaveId, MayHaveInstanceName} from "@haulmont/jmix-react-core";

export function showDeleteEntityDialog(
  onConfirm: () => void,
  intl: IntlShape,
  entityInstance?: MayHaveId & MayHaveInstanceName,
) {
  Modal.confirm({
    title: intl.formatMessage(
      {id: "management.browser.delete.areYouSure"},
      {
        instanceName: entityInstance?._instanceName
          ?? entityInstance?.id
          ?? intl.formatMessage({id: 'common.unsavedEntity'})
      }
    ),
    okText: intl.formatMessage({id: "management.browser.delete.ok"}),
    cancelText: intl.formatMessage({id: "common.cancel"}),
    onOk: onConfirm
  });
}