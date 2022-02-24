import {
  Alert,
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Dropdown,
  Image,
  Input,
  InputNumber,
  List,
  Menu,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Statistic,
  Switch,
  Tabs,
  TimePicker,
  Typography
} from "antd";
import TrickyIdBrowserTable from "../app/tricky-id-browser-table/TrickyIdBrowserTable";
import TrickyIdEditor from "../app/tricky-id-editor/TrickyIdEditor";
import BoringStringIdBrowserTable from "../app/boring-string-id-browser-table/BoringStringIdBrowserTable";
import BoringStringIdEditor from "../app/boring-string-id-editor/BoringStringIdEditor";
import WeirdStringIdBrowserTable from "../app/weird-string-id-browser-table/WeirdStringIdBrowserTable";
import WeirdStringIdBrowserList from "../app/weird-string-id-browser-list/WeirdStringIdBrowserList";
import WeirdStringIdBrowserCards from "../app/weird-string-id-browser-cards/WeirdStringIdBrowserCards";
import WeirdStringIdEditor from "../app/weird-string-id-editor/WeirdStringIdEditor";
import StringIdBrowserTable from "../app/string-id-browser-table/StringIdBrowserTable";
import StringIdBrowserList from "../app/string-id-browser-list/StringIdBrowserList";
import StringIdBrowserCards from "../app/string-id-browser-cards/StringIdBrowserCards";
import StringIdMgtCardsEdit from "../app/string-id-editor/StringIdMgtCardsEdit";
import StringIdCards from "../app/string-id-cards/StringIdCards";
import IntIdentityIdBrowserList from "../app/int-identity-id-browser-list/IntIdentityIdBrowserList";
import IntIdentityIdBrowserCards from "../app/int-identity-id-browser-cards/IntIdentityIdBrowserCards";
import IntIdentityIdBrowserTable from "../app/int-identity-id-browser-table/IntIdentityIdBrowserTable";
import IntIdentityIdEditor from "../app/int-identity-id-editer/IntIdentityIdEditor";
import IntIdentityIdCards from "../app/int-id-cards/IntIdentityIdCards";
import IntIdBrowserList from "../app/int-id-browser-list/IntIdBrowserList";
import IntIdBrowserCards from "../app/int-id-browser-cards/IntIdBrowserCards";
import IntIdBrowserTable from "../app/int-id-browser-table/IntIdBrowserTable";
import IntIdEditor from "../app/int-id-editor/IntIdEditor";
import DeeplyNestedO2MTestEntityEditor from "../app/deeplyNestedO2M-editor/DeeplyNestedO2MTestEntityEditor";
import DeeplyNestedO2MTestEntityTable from "../app/deeplyNestedO2M-browser/DeeplyNestedO2MTestEntityTable";
import DeeplyNestedTestEntityEditor from "../app/deeplyNestedO2O-editor/DeeplyNestedTestEntityEditor";
import CompositionO2MBrowserTable from "../app/compositionO2M-management/CompositionO2MBrowserTable";
import CompositionO2MEditor from "../app/compositionO2M-management/CompositionO2MEditor";
import CompositionO2OBrowserTable from "../app/compositionO2O-management/CompositionO2OBrowserTable";
import CompositionO2OEditor from "../app/compositionO2O-management/CompositionO2OEditor";
import AssociationM2MBrowserTable from "../app/associationM2M-management/AssociationM2MBrowserTable";
import AssociationM2MEditor from "../app/associationM2M-management/AssociationM2MEditor";
import AssociationM2OBrowserTable from "../app/associationM2O-management/AssociationM2OBrowserTable";
import AssociationM2OEditor from "../app/associationM2O-management/AssociationM2OEditor";
import AssociationO2MBrowserTable from "../app/associationO2M-management/AssociationO2MBrowserTable";
import AssociationO2MEditor from "../app/associationO2M-management/AssociationO2MEditor";
import AssociationO2OBrowserTable from "../app/associationO2O-management/AssociationO2OBrowserTable";
import AssociationO2OEditor from "../app/associationO2O-management/AssociationO2OEditor";
import DatatypesTestCards from "../app/datatypes-test-cards/DatatypesTestCards";
import DatatypesTestBrowserTable from "../app/datatypes-test-browser-table/DatatypesTestBrowserTable";
import DatatypesTestBrowserList from "../app/datatypes-test-browser-list/DatatypesTestBrowserList";
import DatatypesTestBrowserCards from "../app/datatypes-test-browser-cards/DatatypesTestBrowserCards";
import DatatypesTestEditor from "../app/datatypes-test-editor/DatatypesTestEditor";
import CarMultiSelectionTable from "../app/car-multi-selection-table/CarMultiSelectionTable";
import FormWizardBrowserTable from "../app/form-wizard-browser/FormWizardBrowserTable";
import FormWizardEditor from "../app/form-wizard-editor/FormWizardEditor";
import FormWizardCompositionO2O from "../app/form-wizard-compositionO2O-editor/FormWizardCompositionO2O";
import CarMasterDetail from "../app/car-master-detail/CarMasterDetail";
import CarTableWithFilters from "../app/car-table-with-filters/CarTableWithFilters";
import CarCardsWithDetails from "../app/car-cards-with-details/CarCardsWithDetails";
import FavoriteCars from "../app/entity-cards/FavoriteCars";
import CarCardsGrid from "../app/car-cards-grid/CarCardsGrid";
import CarBrowserTable from "../app/car-browser-table/CarBrowserTable";
import CarBrowserList from "../app/car-browser-list/CarBrowserList";
import CarBrowserCards from "../app/car-browser-cards/CarBrowserCards";
import CarEditor from "../app/car-editor/CarEditor";
import TestBlankScreen from "../app/blank-screen/TestBlankScreen";
import ErrorBoundaryTests from "../app/error-boundary-tests/ErrorBoundaryTests";
import CustomControls from "../app/custom-controls/CustomControls";
import CustomAppLayouts from "../app/custom-app-layouts/CustomAppLayouts";
import CustomDataDisplayComponents from "../app/custom-data-display-components/CustomDataDisplayComponents";
import CustomFormControls from "../app/custom-form-controls/CustomFormControls";
import CustomEntityFilterTest from "../app/custom-entity-filter-test/CustomEntityFilterTest";
import ExampleCustomScreen from "../app/example-custom-screen/ExampleCustomScreen";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  BarsOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ContactsOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  MailOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  SaveOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  TeamOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Category,
  Component,
  Variant,
  Palette
} from "@haulmont/react-ide-toolbox";
import { Field } from "@haulmont/jmix-react-antd";
import { FormattedMessage } from "react-intl";
import * as React from "react";

const ENTITY_NAME = "";
const readOnlyMode = false;

const palette = () => (
  <Palette>
    <Category name="Text">
      <Component name="Formatted Message">
        <Variant>
          <FormattedMessage />
        </Variant>
      </Component>
      <Component name="Heading">
        <Variant name="h1">
          <Typography.Title></Typography.Title>
        </Variant>
        <Variant name="h2">
          <Typography.Title level={2}></Typography.Title>
        </Variant>
        <Variant name="h3">
          <Typography.Title level={3}></Typography.Title>
        </Variant>
        <Variant name="h4">
          <Typography.Title level={4}></Typography.Title>
        </Variant>
        <Variant name="h5">
          <Typography.Title level={5}></Typography.Title>
        </Variant>
      </Component>
      <Component name="Text">
        <Variant>
          <Typography.Text></Typography.Text>
        </Variant>
        <Variant name="Secondary">
          <Typography.Text type="secondary"></Typography.Text>
        </Variant>
        <Variant name="Success">
          <Typography.Text type="success"></Typography.Text>
        </Variant>
        <Variant name="Warning">
          <Typography.Text type="warning"></Typography.Text>
        </Variant>
        <Variant name="Danger">
          <Typography.Text type="danger"></Typography.Text>
        </Variant>
        <Variant name="Disabled">
          <Typography.Text disabled></Typography.Text>
        </Variant>
      </Component>
    </Category>
    <Category name="Layout">
      <Component name="Divider">
        <Variant>
          <Divider />
        </Variant>
      </Component>

      <Component name="Grid">
        <Variant name="Simple Row">
          <Row></Row>
        </Variant>
        <Variant name="Two columns">
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
        </Variant>
        <Variant name="Three columns">
          <Row>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
          </Row>
        </Variant>
      </Component>

      <Component name="Space">
        <Variant>
          <Space />
        </Variant>
        <Variant name="Small">
          <Space size={"small"} />
        </Variant>
        <Variant name="Large">
          <Space size={"large"} />
        </Variant>
      </Component>
    </Category>
    <Category name="Controls">
      <Component name="Autocomplete">
        <Variant>
          <AutoComplete placeholder="input here" />
        </Variant>
      </Component>

      <Component name="Button">
        <Variant>
          <Button></Button>
        </Variant>
        <Variant name="Primary">
          <Button type="primary"></Button>
        </Variant>
        <Variant name="Link">
          <Button type="link"></Button>
        </Variant>
        <Variant name="Dropdown">
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item></Menu.Item>
                <Menu.Item></Menu.Item>
                <Menu.Item></Menu.Item>
              </Menu>
            }
          >
            <Button></Button>
          </Dropdown>
        </Variant>
      </Component>

      <Component name="Checkbox">
        <Variant>
          <Checkbox />
        </Variant>
      </Component>

      <Component name="Switch">
        <Variant>
          <Switch />
        </Variant>
      </Component>

      <Component name="Radio Group">
        <Variant>
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Variant>
        <Variant name="Button">
          <Radio.Group>
            <Radio.Button value={1}>A</Radio.Button>
            <Radio.Button value={2}>B</Radio.Button>
            <Radio.Button value={3}>C</Radio.Button>
            <Radio.Button value={4}>D</Radio.Button>
          </Radio.Group>
        </Variant>
      </Component>

      <Component name="DatePicker">
        <Variant>
          <DatePicker />
        </Variant>
        <Variant name="Range">
          <DatePicker.RangePicker />
        </Variant>
      </Component>

      <Component name="TimePicker">
        <Variant>
          <TimePicker />
        </Variant>
        <Variant name="Range">
          <TimePicker.RangePicker />
        </Variant>
      </Component>

      <Component name="Input">
        <Variant>
          <Input />
        </Variant>
        <Variant name="Number">
          <InputNumber />
        </Variant>
      </Component>

      <Component name="Select">
        <Variant>
          <Select defaultValue="1">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Variant>
        <Variant name="Multiple">
          <Select defaultValue={["1"]} mode="multiple" allowClear>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Variant>
      </Component>

      <Component name="Link">
        <Variant>
          <Typography.Link href="" target="_blank"></Typography.Link>
        </Variant>
      </Component>

      <Component name="Slider">
        <Variant>
          <Slider defaultValue={30} />
        </Variant>
        <Variant name="Range">
          <Slider range defaultValue={[20, 50]} />
        </Variant>
      </Component>
    </Category>
    <Category name="Data Display">
      <Component name="Field">
        <Variant>
          <Field
            entityName={ENTITY_NAME}
            disabled={readOnlyMode}
            propertyName=""
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />
        </Variant>
      </Component>
      <Component name="Card">
        <Variant>
          <Card />
        </Variant>
        <Variant name="With Title">
          <Card>
            <Card title="Card title">
              <p>Card content</p>
            </Card>
          </Card>
        </Variant>
        <Variant name="My custom card">
          <Card>
            <Card title="Card title">
              <p>Card content</p>
              <Avatar />
            </Card>
          </Card>
        </Variant>
      </Component>
      <Component name="Tabs">
        <Variant>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </Tabs.TabPane>
          </Tabs>
        </Variant>
        <Variant name="Tab Pane">
          <Tabs.TabPane></Tabs.TabPane>
        </Variant>
      </Component>
      <Component name="Collapse">
        <Variant>
          <Collapse defaultActiveKey="1">
            <Collapse.Panel
              header="This is panel header 1"
              key="1"
            ></Collapse.Panel>
            <Collapse.Panel
              header="This is panel header 2"
              key="2"
            ></Collapse.Panel>
            <Collapse.Panel
              header="This is panel header 3"
              key="3"
            ></Collapse.Panel>
          </Collapse>
        </Variant>
      </Component>
      <Component name="Image">
        <Variant>
          <Image width={200} src="" />
        </Variant>
      </Component>
      <Component name="Avatar">
        <Variant>
          <Avatar icon={<UserOutlined />} />
        </Variant>
        <Variant name="Image">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </Variant>
      </Component>
      <Component name="Badge">
        <Variant>
          <Badge count={1}></Badge>
        </Variant>
      </Component>
      <Component name="Statistic">
        <Variant>
          <Statistic title="Title" value={112893} />
        </Variant>
      </Component>
      <Component name="Alert">
        <Variant name="Success">
          <Alert message="Text" type="success" />
        </Variant>
        <Variant name="Info">
          <Alert message="Text" type="info" />
        </Variant>
        <Variant name="Warning">
          <Alert message="Text" type="warning" />
        </Variant>
        <Variant name="Error">
          <Alert message="Text" type="error" />
        </Variant>
      </Component>
      <Component name="List">
        <Variant>
          <List
            bordered
            dataSource={[]}
            renderItem={item => <List.Item></List.Item>}
          />
        </Variant>
      </Component>
    </Category>
    <Category name="Icons">
      <Component name="Arrow">
        <Variant name="Up">
          <ArrowUpOutlined />
        </Variant>
        <Variant name="Down">
          <ArrowDownOutlined />
        </Variant>
        <Variant name="Left">
          <ArrowLeftOutlined />
        </Variant>
        <Variant name="Right">
          <ArrowRightOutlined />
        </Variant>
      </Component>
      <Component name="Question">
        <Variant>
          <QuestionOutlined />
        </Variant>
        <Variant name="Circle">
          <QuestionCircleOutlined />
        </Variant>
      </Component>
      <Component name="Plus">
        <Variant>
          <PlusOutlined />
        </Variant>
        <Variant name="Circle">
          <PlusCircleOutlined />
        </Variant>
      </Component>
      <Component name="Info">
        <Variant>
          <InfoOutlined />
        </Variant>
        <Variant name="Circle">
          <InfoCircleOutlined />
        </Variant>
      </Component>
      <Component name="Exclamation">
        <Variant>
          <ExclamationOutlined />
        </Variant>
        <Variant name="Circle">
          <ExclamationCircleOutlined />
        </Variant>
      </Component>
      <Component name="Close">
        <Variant>
          <CloseOutlined />
        </Variant>
        <Variant name="Circle">
          <CloseCircleOutlined />
        </Variant>
      </Component>
      <Component name="Check">
        <Variant>
          <CheckOutlined />
        </Variant>
        <Variant name="Circle">
          <CheckCircleOutlined />
        </Variant>
      </Component>
      <Component name="Edit">
        <Variant>
          <EditOutlined />
        </Variant>
      </Component>
      <Component name="Copy">
        <Variant>
          <CopyOutlined />
        </Variant>
      </Component>
      <Component name="Delete">
        <Variant>
          <DeleteOutlined />
        </Variant>
      </Component>
      <Component name="Bars">
        <Variant>
          <BarsOutlined />
        </Variant>
      </Component>
      <Component name="Bell">
        <Variant>
          <BellOutlined />
        </Variant>
      </Component>
      <Component name="Clear">
        <Variant>
          <ClearOutlined />
        </Variant>
      </Component>
      <Component name="Download">
        <Variant>
          <DownloadOutlined />
        </Variant>
      </Component>
      <Component name="Upload">
        <Variant>
          <UploadOutlined />
        </Variant>
      </Component>
      <Component name="Sync">
        <Variant>
          <SyncOutlined />
        </Variant>
      </Component>
      <Component name="Save">
        <Variant>
          <SaveOutlined />
        </Variant>
      </Component>
      <Component name="Search">
        <Variant>
          <SearchOutlined />
        </Variant>
      </Component>
      <Component name="Settings">
        <Variant>
          <SettingOutlined />
        </Variant>
      </Component>
      <Component name="Paperclip">
        <Variant>
          <PaperClipOutlined />
        </Variant>
      </Component>
      <Component name="Phone">
        <Variant>
          <PhoneOutlined />
        </Variant>
      </Component>
      <Component name="Mail">
        <Variant>
          <MailOutlined />
        </Variant>
      </Component>
      <Component name="Home">
        <Variant>
          <HomeOutlined />
        </Variant>
      </Component>
      <Component name="Contacts">
        <Variant>
          <ContactsOutlined />
        </Variant>
      </Component>
      <Component name="User">
        <Variant>
          <UserOutlined />
        </Variant>
        <Variant name="Add">
          <UserAddOutlined />
        </Variant>
        <Variant name="Remove">
          <UserDeleteOutlined />
        </Variant>
      </Component>
      <Component name="Team">
        <Variant>
          <TeamOutlined />
        </Variant>
      </Component>
    </Category>
    <Category name="Screens">
      <Component name="ExampleCustomScreen">
        <Variant>
          <ExampleCustomScreen />
        </Variant>
      </Component>
      <Component name="CustomEntityFilterTest">
        <Variant>
          <CustomEntityFilterTest />
        </Variant>
      </Component>
      <Component name="CustomFormControls">
        <Variant>
          <CustomFormControls />
        </Variant>
      </Component>
      <Component name="CustomDataDisplayComponents">
        <Variant>
          <CustomDataDisplayComponents />
        </Variant>
      </Component>
      <Component name="CustomAppLayouts">
        <Variant>
          <CustomAppLayouts />
        </Variant>
      </Component>
      <Component name="CustomControls">
        <Variant>
          <CustomControls />
        </Variant>
      </Component>
      <Component name="ErrorBoundaryTests">
        <Variant>
          <ErrorBoundaryTests />
        </Variant>
      </Component>
      <Component name="TestBlankScreen">
        <Variant>
          <TestBlankScreen />
        </Variant>
      </Component>
      <Component name="CarEditor">
        <Variant>
          <CarEditor />
        </Variant>
      </Component>
      <Component name="CarBrowserCards">
        <Variant>
          <CarBrowserCards />
        </Variant>
      </Component>
      <Component name="CarBrowserList">
        <Variant>
          <CarBrowserList />
        </Variant>
      </Component>
      <Component name="CarBrowserTable">
        <Variant>
          <CarBrowserTable />
        </Variant>
      </Component>
      <Component name="CarCardsGrid">
        <Variant>
          <CarCardsGrid />
        </Variant>
      </Component>
      <Component name="FavoriteCars">
        <Variant>
          <FavoriteCars />
        </Variant>
      </Component>
      <Component name="CarCardsWithDetails">
        <Variant>
          <CarCardsWithDetails />
        </Variant>
      </Component>
      <Component name="CarTableWithFilters">
        <Variant>
          <CarTableWithFilters />
        </Variant>
      </Component>
      <Component name="CarMasterDetail">
        <Variant>
          <CarMasterDetail />
        </Variant>
      </Component>
      <Component name="FormWizardCompositionO2O">
        <Variant>
          <FormWizardCompositionO2O />
        </Variant>
      </Component>
      <Component name="FormWizardEditor">
        <Variant>
          <FormWizardEditor />
        </Variant>
      </Component>
      <Component name="FormWizardBrowserTable">
        <Variant>
          <FormWizardBrowserTable />
        </Variant>
      </Component>
      <Component name="CarMultiSelectionTable">
        <Variant>
          <CarMultiSelectionTable />
        </Variant>
      </Component>
      <Component name="DatatypesTestEditor">
        <Variant>
          <DatatypesTestEditor />
        </Variant>
      </Component>
      <Component name="DatatypesTestBrowserCards">
        <Variant>
          <DatatypesTestBrowserCards />
        </Variant>
      </Component>
      <Component name="DatatypesTestBrowserList">
        <Variant>
          <DatatypesTestBrowserList />
        </Variant>
      </Component>
      <Component name="DatatypesTestBrowserTable">
        <Variant>
          <DatatypesTestBrowserTable />
        </Variant>
      </Component>
      <Component name="DatatypesTestCards">
        <Variant>
          <DatatypesTestCards />
        </Variant>
      </Component>
      <Component name="AssociationO2OEditor">
        <Variant>
          <AssociationO2OEditor />
        </Variant>
      </Component>
      <Component name="AssociationO2OBrowserTable">
        <Variant>
          <AssociationO2OBrowserTable />
        </Variant>
      </Component>
      <Component name="AssociationO2MEditor">
        <Variant>
          <AssociationO2MEditor />
        </Variant>
      </Component>
      <Component name="AssociationO2MBrowserTable">
        <Variant>
          <AssociationO2MBrowserTable />
        </Variant>
      </Component>
      <Component name="AssociationM2OEditor">
        <Variant>
          <AssociationM2OEditor />
        </Variant>
      </Component>
      <Component name="AssociationM2OBrowserTable">
        <Variant>
          <AssociationM2OBrowserTable />
        </Variant>
      </Component>
      <Component name="AssociationM2MEditor">
        <Variant>
          <AssociationM2MEditor />
        </Variant>
      </Component>
      <Component name="AssociationM2MBrowserTable">
        <Variant>
          <AssociationM2MBrowserTable />
        </Variant>
      </Component>
      <Component name="CompositionO2OEditor">
        <Variant>
          <CompositionO2OEditor />
        </Variant>
      </Component>
      <Component name="CompositionO2OBrowserTable">
        <Variant>
          <CompositionO2OBrowserTable />
        </Variant>
      </Component>
      <Component name="CompositionO2MEditor">
        <Variant>
          <CompositionO2MEditor />
        </Variant>
      </Component>
      <Component name="CompositionO2MBrowserTable">
        <Variant>
          <CompositionO2MBrowserTable />
        </Variant>
      </Component>
      <Component name="DeeplyNestedTestEntityEditor">
        <Variant>
          <DeeplyNestedTestEntityEditor />
        </Variant>
      </Component>
      <Component name="DeeplyNestedO2MTestEntityTable">
        <Variant>
          <DeeplyNestedO2MTestEntityTable />
        </Variant>
      </Component>
      <Component name="DeeplyNestedO2MTestEntityEditor">
        <Variant>
          <DeeplyNestedO2MTestEntityEditor />
        </Variant>
      </Component>
      <Component name="IntIdEditor">
        <Variant>
          <IntIdEditor />
        </Variant>
      </Component>
      <Component name="IntIdBrowserTable">
        <Variant>
          <IntIdBrowserTable />
        </Variant>
      </Component>
      <Component name="IntIdBrowserCards">
        <Variant>
          <IntIdBrowserCards />
        </Variant>
      </Component>
      <Component name="IntIdBrowserList">
        <Variant>
          <IntIdBrowserList />
        </Variant>
      </Component>
      <Component name="IntIdentityIdCards">
        <Variant>
          <IntIdentityIdCards />
        </Variant>
      </Component>
      <Component name="IntIdentityIdEditor">
        <Variant>
          <IntIdentityIdEditor />
        </Variant>
      </Component>
      <Component name="IntIdentityIdBrowserTable">
        <Variant>
          <IntIdentityIdBrowserTable />
        </Variant>
      </Component>
      <Component name="IntIdentityIdBrowserCards">
        <Variant>
          <IntIdentityIdBrowserCards />
        </Variant>
      </Component>
      <Component name="IntIdentityIdBrowserList">
        <Variant>
          <IntIdentityIdBrowserList />
        </Variant>
      </Component>
      <Component name="StringIdCards">
        <Variant>
          <StringIdCards />
        </Variant>
      </Component>
      <Component name="StringIdMgtCardsEdit">
        <Variant>
          <StringIdMgtCardsEdit />
        </Variant>
      </Component>
      <Component name="StringIdBrowserCards">
        <Variant>
          <StringIdBrowserCards />
        </Variant>
      </Component>
      <Component name="StringIdBrowserList">
        <Variant>
          <StringIdBrowserList />
        </Variant>
      </Component>
      <Component name="StringIdBrowserTable">
        <Variant>
          <StringIdBrowserTable />
        </Variant>
      </Component>
      <Component name="WeirdStringIdEditor">
        <Variant>
          <WeirdStringIdEditor />
        </Variant>
      </Component>
      <Component name="WeirdStringIdBrowserCards">
        <Variant>
          <WeirdStringIdBrowserCards />
        </Variant>
      </Component>
      <Component name="WeirdStringIdBrowserList">
        <Variant>
          <WeirdStringIdBrowserList />
        </Variant>
      </Component>
      <Component name="WeirdStringIdBrowserTable">
        <Variant>
          <WeirdStringIdBrowserTable />
        </Variant>
      </Component>
      <Component name="BoringStringIdEditor">
        <Variant>
          <BoringStringIdEditor />
        </Variant>
      </Component>
      <Component name="BoringStringIdBrowserTable">
        <Variant>
          <BoringStringIdBrowserTable />
        </Variant>
      </Component>
      <Component name="TrickyIdEditor">
        <Variant>
          <TrickyIdEditor />
        </Variant>
      </Component>
      <Component name="TrickyIdBrowserTable">
        <Variant>
          <TrickyIdBrowserTable />
        </Variant>
      </Component>
    </Category>
  </Palette>
);

export default palette;
