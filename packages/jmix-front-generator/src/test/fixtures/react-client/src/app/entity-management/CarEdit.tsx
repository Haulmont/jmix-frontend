import React from "react";
import { Form, Alert, Button, Card, message } from "antd";
import { FormInstance } from "antd/es/form";
import { observer } from "mobx-react";
import { CarManagement } from "./CarManagement";
import { Link, Redirect } from "react-router-dom";
import {
  IReactionDisposer,
  observable,
  action,
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
  createAntdFormValidationMessages
} from "@haulmont/jmix-react-ui";

import {
  loadAssociationOptions,
  DataCollectionStore,
  instance,
  MainStoreInjected,
  injectMainStore
} from "@haulmont/jmix-react-core";

import { Field, MultilineText, Spinner } from "@haulmont/jmix-react-ui";

import "app/App.css";

import { Car } from "jmix/entities/mpg$Car";
import { Garage } from "jmix/entities/mpg$Garage";
import { TechnicalCertificate } from "jmix/entities/mpg$TechnicalCertificate";
import { FileDescriptor } from "jmix/entities/base/sys$FileDescriptor";

type Props = EditorProps & MainStoreInjected;

type EditorProps = {
  entityId: string;
};

class CarEditComponent extends React.Component<Props & WrappedComponentProps> {
  dataInstance = instance<Car>(Car.NAME, {
    view: "car-edit",
    loadImmediately: false
  });

  garagesDc: DataCollectionStore<Garage> | null = null;

  technicalCertificatesDc: DataCollectionStore<
    TechnicalCertificate
  > | null = null;

  photosDc: DataCollectionStore<FileDescriptor> | null = null;

  updated = false;
  formRef: React.MutableRefObject<FormInstance | null> = { current: null };
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
    "garage",
    "technicalCertificate",
    "photo"
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

      this.photosDc =
        loadAssociationOptions(
          Car.NAME,
          "photo",
          FileDescriptor.NAME,
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
      ).then(
        action(({ success, globalErrors }) => {
          if (success) {
            this.updated = true;
          } else {
            this.globalErrors = globalErrors;
          }
        })
      );
    }
  };

  isNewEntity = () => {
    return this.props.entityId === CarManagement.NEW_SUBPATH;
  };

  constructor(props: Props & WrappedComponentProps) {
    super(props);

    makeObservable(this, {
      garagesDc: observable,

      technicalCertificatesDc: observable,

      photosDc: observable,

      updated: observable,
      formRef: observable,
      globalErrors: observable,

      loadAssociationOptions: action
    });
  }

  render() {
    if (this.updated) {
      return <Redirect to={CarManagement.PATH} />;
    }

    const { status, lastError, load } = this.dataInstance;
    const { mainStore, entityId, intl } = this.props;
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
          <Button htmlType="button" onClick={() => load(entityId)}>
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
          ref={action(
            (ref: FormInstance | null) => (this.formRef.current = ref)
          )}
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

          <Field
            entityName={Car.NAME}
            propertyName="photo"
            optionsContainer={this.photosDc ?? undefined}
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
            <Link to={CarManagement.PATH}>
              <Button htmlType="button">
                <FormattedMessage id="common.cancel" />
              </Button>
            </Link>
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
      this.dataInstance.load(this.props.entityId);
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

export default injectIntl(injectMainStore(observer(CarEditComponent)));
