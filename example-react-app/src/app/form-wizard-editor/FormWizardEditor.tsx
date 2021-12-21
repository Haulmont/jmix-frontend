import {
  Field,
  FormWizardManager,
  FormWizardStep,
  FormWizardStepStatus,
  Spinner,
  RetryDialog,
  GlobalErrorsAlert,
  useEntityEditorFromWizard,
  withFormWizardProvider,
  FormWizardButtons,
  useEntityPersistCallbacks,
  useSubmitFailedCallback,
  ant_to_jmixFront
} from "@haulmont/jmix-react-antd";
import {
  createAntdFormValidationMessages,
  EntityEditorProps,
  registerEntityEditor,
  MultiScreenContext
} from "@haulmont/jmix-react-web";
import { Card } from "antd";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import gql from "graphql-tag";
import styles from "../../app/App.module.css";
import { FormWizardTestEntity } from "../../jmix/entities/scr_FormWizardTestEntity";

const ENTITY_NAME = "scr_FormWizardTestEntity";
const ROUTING_PATH = "/formWizardEditor";

const LOAD_SCR_FORMWIZARDTESTENTITY = gql`
  query scr_FormWizardTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_FormWizardTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      notNull
      date
      time
      integer
      associationO2O {
        id
        _instanceName
      }
      compositionO2O {
        id
        _instanceName
        name
      }
    }

    scr_FormWizardAssociationO2OTestEntityList {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_FORMWIZARDTESTENTITY = gql`
  mutation Upsert_scr_FormWizardTestEntity(
    $formWizardTestEntity: inp_scr_FormWizardTestEntity!
  ) {
    upsert_scr_FormWizardTestEntity(
      formWizardTestEntity: $formWizardTestEntity
    ) {
      id
    }
  }
`;

const FIELD_NAMES_STEP_1 = ["notNull", "date"];

const FIELD_NAMES_STEP_2 = ["time", "integer"];

const FIELD_NAMES_STEP_3 = ["associationO2O", "compositionO2O"];

const FormWizardEditor = withFormWizardProvider(
  observer((props: EntityEditorProps<FormWizardTestEntity>) => {
    const { entityInstance } = props;
    const multiScreen = useContext(MultiScreenContext);
    const onSubmitFailed = useSubmitFailedCallback();
    const {
      intl,
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      handleSubmit,
      handleSubmitBtn,
      serverValidationErrors,
      handleCancelBtnClick,
      handleNextStep,
      handlePreviousStep,
      handleSelectStep,
      relationOptions
    } = useEntityEditorFromWizard({
      loadQuery: LOAD_SCR_FORMWIZARDTESTENTITY,
      upsertMutation: UPSERT_SCR_FORMWIZARDTESTENTITY,
      entityId: multiScreen?.params?.entityId,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityInstance,
      persistEntityCallbacks: useEntityPersistCallbacks(),
      uiKit_to_jmixFront: ant_to_jmixFront
    });

    if (queryLoading) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className={styles.narrowLayout}>
        <FormWizardManager
          entityName={ENTITY_NAME}
          onFinish={handleSubmit}
          onFinishFailed={onSubmitFailed}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <FormWizardStepStatus onSelectStep={handleSelectStep} />

          <FormWizardStep stepName="step1" fieldNames={FIELD_NAMES_STEP_1}>
            <Field
              entityName={ENTITY_NAME}
              propertyName="notNull"
              formItemProps={{
                style: { marginBottom: "12px" }
              }}
            />

            <Field
              entityName={ENTITY_NAME}
              propertyName="date"
              formItemProps={{
                style: { marginBottom: "12px" }
              }}
            />
          </FormWizardStep>

          <FormWizardStep stepName="step2" fieldNames={FIELD_NAMES_STEP_2}>
            <Field
              entityName={ENTITY_NAME}
              propertyName="time"
              formItemProps={{
                style: { marginBottom: "12px" }
              }}
            />

            <Field
              entityName={ENTITY_NAME}
              propertyName="integer"
              formItemProps={{
                style: { marginBottom: "12px" }
              }}
            />
          </FormWizardStep>

          <FormWizardStep stepName="step3" fieldNames={FIELD_NAMES_STEP_3}>
            <Field
              entityName={ENTITY_NAME}
              propertyName="associationO2O"
              associationOptions={relationOptions?.get(
                "scr_FormWizardAssociationO2OTestEntity"
              )}
              formItemProps={{
                style: { marginBottom: "12px" }
              }}
            />

            <Field
              entityName={ENTITY_NAME}
              propertyName="compositionO2O"
              formItemProps={{
                style: { marginBottom: "12px" }
              }}
            />
          </FormWizardStep>

          <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

          <FormWizardButtons
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
            onSubmit={handleSubmitBtn}
            onCancel={handleCancelBtnClick}
          />
        </FormWizardManager>
      </Card>
    );
  })
);

registerEntityEditor({
  component: FormWizardEditor,
  caption: "screen.FormWizardEditor",
  screenId: "FormWizardEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default FormWizardEditor;
