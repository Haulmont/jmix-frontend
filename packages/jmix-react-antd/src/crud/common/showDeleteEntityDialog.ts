import {IntlShape} from "react-intl";
import {EntityInstance} from "@haulmont/jmix-react-core";
import {modals} from "../../ui/modals";

export function showDeleteEntityDialog(
  onConfirm: () => void,
  intl: IntlShape,
  entityInstance?: EntityInstance,
) {
  modals.open({
    content: intl.formatMessage(
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
