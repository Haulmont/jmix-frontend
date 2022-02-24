import {
  Alert,
  AutoComplete,
  Avatar, Badge,
  Button,
  Card,
  Checkbox,
  Col, Collapse,
  DatePicker,
  Divider, Dropdown,
  Image,
  Input, InputNumber, List, Menu,
  Radio,
  Row, Select, Slider,
  Space, Statistic, Switch,
  Tabs, TimePicker,
  Typography
} from "antd";
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
  SyncOutlined, TeamOutlined,
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
import {Field} from "@haulmont/jmix-react-antd";
import { FormattedMessage } from "react-intl";
import * as React from "react";

const ENTITY_NAME = '';
const readOnlyMode = false;

const palette = () =>
  <Palette>
    <Category name="Text">
      <Component name="Formatted Message">
        <Variant>
          <FormattedMessage />
        </Variant>
      </Component>
      <Component name="Heading">
        <Variant name='h1'>
          <Typography.Title></Typography.Title>
        </Variant>
        <Variant name='h2'>
          <Typography.Title level = {2}></Typography.Title>
        </Variant>
        <Variant name='h3'>
          <Typography.Title level = {3}></Typography.Title>
        </Variant>
        <Variant name='h4'>
          <Typography.Title level = {4}></Typography.Title>
        </Variant>
        <Variant name='h5'>
          <Typography.Title level = {5}></Typography.Title>
        </Variant>
      </Component>
      <Component name='Text'>
        <Variant>
          <Typography.Text></Typography.Text>
        </Variant>
        <Variant name = 'Secondary'>
          <Typography.Text type="secondary"></Typography.Text>
        </Variant>
        <Variant name = 'Success'>
          <Typography.Text type="success"></Typography.Text>
        </Variant>
        <Variant name = 'Warning'>
          <Typography.Text type="warning"></Typography.Text>
        </Variant>
        <Variant name = 'Danger'>
          <Typography.Text type="danger"></Typography.Text>
        </Variant>
        <Variant name = 'Disabled'>
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
          <Button type="primary" ></Button>
        </Variant>
        <Variant name="Link">
          <Button type="link" ></Button>
        </Variant>
        <Variant name="Dropdown">
          <Dropdown
            trigger={['click']}
            overlay={<Menu>
              <Menu.Item>
              </Menu.Item>
              <Menu.Item>
              </Menu.Item>
              <Menu.Item>
              </Menu.Item>
            </Menu>}
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

      <Component name='Switch'>
        <Variant>
          <Switch />
        </Variant>
      </Component>

      <Component name='Radio Group'>
        <Variant>
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Variant>
        <Variant name = 'Button'>
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
        <Variant name='Number'>
          <InputNumber />
        </Variant>
      </Component>

      <Component name='Select'>
        <Variant>
          <Select defaultValue="1">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Variant>
        <Variant name='Multiple'>
          <Select
            defaultValue={["1"]}
            mode="multiple"
            allowClear
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Variant>
      </Component>

      <Component name="Link">
        <Variant>
          <Typography.Link href="" target="_blank">
          </Typography.Link>
        </Variant>
      </Component>

      <Component name='Slider'>
        <Variant>
          <Slider defaultValue={30} />
        </Variant>
        <Variant name = 'Range'>
          <Slider range defaultValue={[20, 50]}/>
        </Variant>
      </Component>
    </Category>
    <Category name="Data Display">
    <Component name="Field">
        <Variant>
          <Field
            entityName={ENTITY_NAME}
            disabled={readOnlyMode}
            propertyName=''
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
        <Variant name = "Tab Pane">
          <Tabs.TabPane>
          </Tabs.TabPane>
        </Variant>
      </Component>
      <Component name="Collapse">
        <Variant>
          <Collapse defaultActiveKey='1'>
            <Collapse.Panel header="This is panel header 1" key="1">
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 2" key="2">
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 3" key="3">
            </Collapse.Panel>
          </Collapse>
        </Variant>
      </Component>
      <Component name="Image">
        <Variant>
          <Image
            width={200}
            src=""
          />
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
          <Badge count={1}>
          </Badge>
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
      <Component name='List'>
        <Variant>
          <List
            bordered
            dataSource={[]}
            renderItem={item => (
              <List.Item>
              </List.Item>
            )}
          />
        </Variant>
      </Component>
    </Category>
    <Category name="Icons">
      <Component name="Arrow">
        <Variant name = 'Up'>
          <ArrowUpOutlined />
        </Variant>
        <Variant name = 'Down'>
          <ArrowDownOutlined />
        </Variant>
        <Variant name = 'Left'>
          <ArrowLeftOutlined />
        </Variant>
        <Variant name = 'Right'>
          <ArrowRightOutlined />
        </Variant>
      </Component>
      <Component name = 'Question'>
        <Variant>
          <QuestionOutlined />
        </Variant>
        <Variant name = 'Circle'>
          <QuestionCircleOutlined />
        </Variant>
      </Component>
      <Component name = 'Plus'>
        <Variant>
          <PlusOutlined />
        </Variant>
        <Variant name = 'Circle'>
          <PlusCircleOutlined />
        </Variant>
      </Component>
      <Component name = 'Info'>
        <Variant>
          <InfoOutlined />
        </Variant>
        <Variant name = 'Circle'>
          <InfoCircleOutlined />
        </Variant>
      </Component>
      <Component name = 'Exclamation'>
        <Variant>
          <ExclamationOutlined />
        </Variant>
        <Variant name = 'Circle'>
          <ExclamationCircleOutlined />
        </Variant>
      </Component>
      <Component name = 'Close'>
        <Variant>
          <CloseOutlined />
        </Variant>
        <Variant name = 'Circle'>
          <CloseCircleOutlined />
        </Variant>
      </Component>
      <Component name = 'Check'>
        <Variant>
          <CheckOutlined />
        </Variant>
        <Variant name = 'Circle'>
          <CheckCircleOutlined />
        </Variant>
      </Component>
      <Component name = 'Edit'>
        <Variant>
          <EditOutlined />
        </Variant>
      </Component>
      <Component name = 'Copy'>
        <Variant>
          <CopyOutlined />
        </Variant>
      </Component>
      <Component name = 'Delete'>
        <Variant>
          <DeleteOutlined />
        </Variant>
      </Component>
      <Component name = 'Bars'>
        <Variant>
          <BarsOutlined />
        </Variant>
      </Component>
      <Component name = 'Bell'>
        <Variant>
          <BellOutlined />
        </Variant>
      </Component>
      <Component name = 'Clear'>
        <Variant>
          <ClearOutlined />
        </Variant>
      </Component>
      <Component name = 'Download'>
        <Variant>
          <DownloadOutlined />
        </Variant>
      </Component>
      <Component name = 'Upload'>
        <Variant>
          <UploadOutlined />
        </Variant>
      </Component>
      <Component name = 'Sync'>
        <Variant>
          <SyncOutlined />
        </Variant>
      </Component>
      <Component name = 'Save'>
        <Variant>
          <SaveOutlined />
        </Variant>
      </Component>
      <Component name = 'Search'>
        <Variant>
          <SearchOutlined />
        </Variant>
      </Component>
      <Component name = 'Settings'>
        <Variant>
          <SettingOutlined />
        </Variant>
      </Component>
      <Component name = 'Paperclip'>
        <Variant>
          <PaperClipOutlined />
        </Variant>
      </Component>
      <Component name = 'Phone'>
        <Variant>
          <PhoneOutlined />
        </Variant>
      </Component>
      <Component name = 'Mail'>
        <Variant>
          <MailOutlined />
        </Variant>
      </Component>
      <Component name = 'Home'>
        <Variant>
          <HomeOutlined />
        </Variant>
      </Component>
      <Component name = 'Contacts'>
        <Variant>
          <ContactsOutlined />
        </Variant>
      </Component>
      <Component name = 'User'>
        <Variant>
          <UserOutlined />
        </Variant>
        <Variant name = 'Add'>
          <UserAddOutlined />
        </Variant>
        <Variant name = 'Remove'>
          <UserDeleteOutlined />
        </Variant>
      </Component>
      <Component name = 'Team'>
        <Variant>
          <TeamOutlined />
        </Variant>
      </Component>
    </Category>
  </Palette>

export default palette;
