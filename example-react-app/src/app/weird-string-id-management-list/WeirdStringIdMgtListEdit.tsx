import * as React from "react";
import { Form, Alert, Button, Card, message } from "antd";
import { FormInstance } from "antd/es/form";
import { observer } from "mobx-react";
import {
  IReactionDisposer,
  observable,
  reaction,
  toJS,
  makeObservable
} from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import {
  defaultHandleFinish,
  createAntdFormValidationMessages,
  MultiScreenContext
} from "@haulmont/jmix-react-ui";
import {
  Screens,
  ScreensContext,
  IMultiScreenItem
} from "@haulmont/jmix-react-core";

import {
  instance,
  MainStoreInjected,
  injectMainStore
} from "@haulmont/jmix-react-core";

import { Field, MultilineText, Spinner } from "@haulmont/jmix-react-ui";

import "../../app/App.css";

import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";

interface IWeirdStringIdMgtListEditComponentProps {
  screens: Screens;
}

type Props = MainStoreInjected;

// const ENTITY_NAME = 'scr_WeirdStringIdTestEntity';
const ROUTING_PATH = "/weirdStringIdMgtListManagement";

class WeirdStringIdMgtListEditComponent extends React.Component<
  Props & WrappedComponentProps & IWeirdStringIdMgtListEditComponentProps
> {
  static contextType = MultiScreenContext;
  context: IMultiScreenItem = null!;

  dataInstance = instance<WeirdStringIdTestEntity>(
    WeirdStringIdTestEntity.NAME,
    {
      view: "_local",
      loadImmediately: false
    }
  );

  updated = false;
  formRef: React.RefObject<FormInstance> = React.createRef();
  reactionDisposers: IReactionDisposer[] = [];

  fields = [
    "description",
    "id",
    "createTs",
    "createdBy",
    "updateTs",
    "updatedBy",
    "deleteTs",
    "deletedBy",
    "version"
  ];

  globalErrors: string[] = [];

  handleFinishFailed = () => {
    const { intl } = this.props;
    message.error(
      intl.formatMessage({ id: "management.editor.validationError" })
    );
  };

  handleFinish = (values: { [field: string]: any }) => {
    const { intl } = this.props;

    if (this.formRef.current != null) {
      defaultHandleFinish(
        values,
        this.dataInstance,
        intl,
        this.formRef.current,
        this.isNewEntity() ? "create" : "edit"
      ).then(({ success, globalErrors }) => {
        if (success) {
          this.updated = true;
        } else {
          this.globalErrors = globalErrors;
        }
      });
    }
  };

  isNewEntity = () => {
    return this.context?.params?.entityId === undefined;
  };

  onCancelBtnClick = () => {
    if (this.props.screens.currentScreenIndex === 1) {
      window.history.pushState({}, "", ROUTING_PATH);
    }
    this.props.screens.setActiveScreen(this.context.parent!, true);
  };

  constructor(props) {
    super(props);

    makeObservable(this, {
      updated: observable,
      formRef: observable,
      globalErrors: observable
    });
  }

  render() {
    const { status, lastError, load } = this.dataInstance;
    const { mainStore, intl } = this.props;
    if (mainStore == null || !mainStore.isEntityDataLoaded()) {
      return <Spinner />;
    }

    // do not stop on "COMMIT_ERROR" - it could be bean validation, so we should show fields with errors
    if (status === "ERROR" && lastError === "LOAD_ERROR") {
      return (
        <>
          <FormattedMessage id="common.requestFailed" />.
          <br />
          <br />
          <Button
            htmlType="button"
            onClick={() => load(this.context?.params?.entityId!)}
          >
            <FormattedMessage id="common.retry" />
          </Button>
        </>
      );
    }

    return (
      <Card className="narrow-layout">
        <Form
          onFinish={this.handleFinish}
          onFinishFailed={this.handleFinishFailed}
          layout="vertical"
          ref={this.formRef}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="description"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="id"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="createTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="createdBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="updateTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="updatedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="deleteTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="deletedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={WeirdStringIdTestEntity.NAME}
            propertyName="version"
            formItemProps={{
              style: { marginBottom: "12px" },
              rules: [{ required: true }]
            }}
          />

          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <Button htmlType="button" onClick={this.onCancelBtnClick}>
              <FormattedMessage id="common.cancel" />
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={status !== "DONE" && status !== "ERROR"}
              loading={status === "LOADING"}
              style={{ marginLeft: "8px" }}
            >
              <FormattedMessage id="common.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  componentDidMount() {
    if (this.isNewEntity()) {
      this.dataInstance.setItem(new WeirdStringIdTestEntity());
    } else {
      this.dataInstance.load(this.context?.params?.entityId!);
    }

    this.reactionDisposers.push(
      reaction(
        () => this.dataInstance.status,
        () => {
          const { intl } = this.props;
          if (
            this.dataInstance.lastError != null &&
            this.dataInstance.lastError !== "COMMIT_ERROR"
          ) {
            message.error(intl.formatMessage({ id: "common.requestFailed" }));
          }
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => this.formRef.current,
        (formRefCurrent, _prevFormRefCurrent, formRefReaction) => {
          if (formRefCurrent != null) {
            // The Form has been successfully created.
            // It is now safe to set values on Form fields.
            this.reactionDisposers.push(
              reaction(
                () => this.dataInstance.item,
                () => {
                  formRefCurrent.setFieldsValue(
                    this.dataInstance.getFieldValues(this.fields)
                  );
                },
                { fireImmediately: true }
              )
            );
            formRefReaction.dispose();
          }
        },
        { fireImmediately: true }
      )
    );
  }

  componentWillUnmount() {
    this.reactionDisposers.forEach(dispose => dispose());
  }
}

const WeirdStringIdMgtListEdit = injectIntl(
  injectMainStore(observer(WeirdStringIdMgtListEditComponent))
);

export default observer(() => {
  const screens = React.useContext(ScreensContext);

  return <WeirdStringIdMgtListEdit screens={screens} />;
});
