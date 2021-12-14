import React, {useState} from "react";
import {createAntdFormValidationMessages, Msg} from "@haulmont/jmix-react-web";
import {Button, Form, Input, Select, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import {useIntl} from "react-intl";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {
  FilterChangeCallback,
  JmixEntityFilter, MetaClassInfo,
  useMetadata
} from "@haulmont/jmix-react-core";

type EntityFilterProps = {
  entityName: string,
  onFilterApply?: FilterChangeCallback,
  className?: string,
}

export const EntityFilter = ({entityName, onFilterApply, className}: EntityFilterProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const metadata = useMetadata();
  const [selectedProperty, setSelectedProperty] = useState<string>();
  const [availableProperties, setAvailableProperties] = useState<string[]>(getAvailableProperties(metadata.entities, entityName));

  const availablePropertiesOptions = availableProperties.map(propertyName => ({
    label: <Msg entityName={entityName} propertyName={propertyName}/>,
    value: propertyName,
  }));

  const onAddProperty = (add: (defaultValue: JmixEntityFilter) => void) => {
    add({[selectedProperty!]: {_eq: ""}});
    setSelectedProperty(undefined);
  };

  const onFilterChange = (changedFields: any) => {
    const filter: (JmixEntityFilter[] | undefined) = changedFields.find((field: any) => field?.name[0] === "filter")?.value;
    if (Array.isArray(filter)) {
      setAvailableProperties(getAvailableProperties(metadata.entities, entityName, getProperties(filter)));
    }
  }

  return (
    <Form
      validateMessages={createAntdFormValidationMessages(intl)}
      layout="vertical"
      form={form}
      className={className}
      onFieldsChange={onFilterChange}
    >
      <Form.List name="filter">
        {((fields, {add, remove}) => (
          <Space direction="vertical" size="middle">
            <Space direction="horizontal" align="end">
              <Form.Item label="Filters" style={{marginBottom: 0}}>
                <Select
                  showSearch
                  style={{width: 200}}
                  placeholder={intl.formatMessage({id: "jmix.entityFilter.selectFilter"})}
                  value={selectedProperty}
                  onSelect={setSelectedProperty}
                  options={availablePropertiesOptions}
                />
              </Form.Item>
              <Button
                icon={<PlusOutlined/>}
                disabled={selectedProperty === undefined}
                onClick={() => onAddProperty(add)}
              >
                {intl.formatMessage({id: "jmix.entityFilter.addFilter"})}
              </Button>
            </Space>
            {fields.map(field => {
              const propertyName = getProperty(form.getFieldValue(["filter", field.name]));
              return (
                <Form.Item
                  key={field.key}
                  label={<Msg entityName={entityName} propertyName={propertyName}/>}
                  style={{marginBottom: 0}}
                >
                  <Space direction="horizontal">
                    <Form.Item name={[field.name, propertyName, "_eq"]} noStyle>
                      <Input placeholder={intl.formatMessage({id: "jmix.entityFilter.enterFilterValue"})}/>
                    </Form.Item>
                    <CloseOutlined onClick={() => remove(field.name)}/>
                  </Space>
                </Form.Item>
              )
            })}
            <Button type="primary" onClick={() => onFilterApply?.(form.getFieldValue("filter"))}>
              {intl.formatMessage({id: "jmix.entityFilter.applyFilter"})}
            </Button>
          </Space>
        ))}
      </Form.List>
    </Form>
  )
}

// filter should have at least one property
const getProperty = (filter: JmixEntityFilter): string => Object.keys(filter)[0];

const getProperties = (filters: JmixEntityFilter[]): string[] => {
  return filters.map((filter: JmixEntityFilter) => getProperty(filter));
}

const getAvailableProperties = (entities: MetaClassInfo[] = [], entityName: string, selectedProperties: string[] = []) => {
  const ALLOWED_TYPES = ["Date", "LocalDate", "DateTime", "LocalDateTime",
    "OffsetDateTime", "Time", "LocalTime", "OffsetTime", "Integer", "Double",
    "Long", "BigDecimal", "Character", "String"];

  const entity = entities.find(entity => entity.entityName === entityName);

  const availableMap = new Map(entity?.properties.map(property => [property.name, property]));
  selectedProperties.forEach(propertyName => {
    availableMap.delete(propertyName);
  });

  availableMap.forEach((property, propertyName) => {
    if (!ALLOWED_TYPES.includes(property.type)) {
      availableMap.delete(propertyName);
      return
    }
  })

  return [...availableMap.keys()];
}