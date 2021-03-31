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
  IMultiScreenItem,
  redirect
} from "@haulmont/jmix-react-core";

import {
  loadAssociationOptions,
  DataCollectionStore,
  instance,
  MainStoreInjected,
  injectMainStore
} from "@haulmont/jmix-react-core";

import { Field, MultilineText, Spinner } from "@haulmont/jmix-react-ui";

import "../../app/App.css";

import { Car } from "../../jmix/entities/scr$Car";
import { Garage } from "../../jmix/entities/scr$Garage";
import { TechnicalCertificate } from "../../jmix/entities/scr$TechnicalCertificate";

interface ICarEdit3ComponentProps {
  screens: Screens;
}

type Props = MainStoreInjected;

// const ENTITY_NAME = 'scr$Car';
const ROUTING_PATH = "/carManagement3";

class CarEdit3Component extends React.Component<
  Props & WrappedComponentProps & ICarEdit3ComponentProps
> {
  static contextType = MultiScreenContext;
  context: IMultiScreenItem = null!;

  dataInstance = instance<Car>(Car.NAME, {
    view: "car-edit",
    loadImmediately: false
  });

  garagesDc: DataCollectionStore<Garage> | null = null;

  technicalCertificatesDc: DataCollectionStore<
    TechnicalCertificate
  > | null = null;

  updated = false;
  formRef: React.RefObject<FormInstance> = React.createRef();
  reactionDisposers: IReactionDisposer[] = [];

  fields = [
    "manufacturer",
    "model",
    "regNumber",
    "purchaseDate",
    "manufactureDate",
    "wheelOnRight",
    "carType",
    "ecoRank",
    "maxPassengers",
    "price",
    "mileage",
    "version",
    "createdBy",
    "createdDate",
    "lastModifiedBy",
    "lastModifiedDate",
    "photo",
    "garage",
    "technicalCertificate"
  ];

  globalErrors: string[] = [];

  /**
   * This method should be called after the user permissions has been loaded
   */
  loadAssociationOptions = () => {
    // MainStore should exist at this point
    if (this.props.mainStore != null) {
      const { getAttributePermission } = this.props.mainStore.security;

      this.garagesDc =
        loadAssociationOptions(
          Car.NAME,
          "garage",
          Garage.NAME,
          getAttributePermission,
          { view: "_minimal" }
        ) ?? null;

      this.technicalCertificatesDc =
        loadAssociationOptions(
          Car.NAME,
          "technicalCertificate",
          TechnicalCertificate.NAME,
          getAttributePermission,
          { view: "_minimal" }
        ) ?? null;
    }
  };

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
      redirect(ROUTING_PATH);
    }
    this.props.screens.setActiveScreen(this.context.parent!, true);
  };

  constructor(props) {
    super(props);

    makeObservable(this, {
      garagesDc: observable,

      technicalCertificatesDc: observable,

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
            entityName={Car.NAME}
            propertyName="manufacturer"
            formItemProps={{
              style: { marginBottom: "12px" },
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="model"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="regNumber"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="purchaseDate"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="manufactureDate"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="wheelOnRight"
            formItemProps={{
              style: { marginBottom: "12px" },
              valuePropName: "checked"
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="carType"
            formItemProps={{
              style: { marginBottom: "12px" },
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="ecoRank"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="maxPassengers"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="price"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="mileage"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="version"
            formItemProps={{
              style: { marginBottom: "12px" },
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="createdBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="createdDate"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="lastModifiedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="lastModifiedDate"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="photo"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="garage"
            optionsContainer={this.garagesDc ?? undefined}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="technicalCertificate"
            optionsContainer={this.technicalCertificatesDc ?? undefined}
            formItemProps={{
              style: { marginBottom: "12px" }
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
      this.dataInstance.setItem(new Car());
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
        () => this.props.mainStore?.security.isDataLoaded,
        (isDataLoaded, _prevIsDataLoaded, permsReaction) => {
          if (isDataLoaded === true) {
            // User permissions has been loaded.
            // We can now load association options.
            this.loadAssociationOptions(); // Calls REST API
            permsReaction.dispose();
          }
        },
        { fireImmediately: true }
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

const CarEdit3 = injectIntl(injectMainStore(observer(CarEdit3Component)));

export default observer(() => {
  const screens = React.useContext(ScreensContext);

  return <CarEdit3 screens={screens} />;
});
