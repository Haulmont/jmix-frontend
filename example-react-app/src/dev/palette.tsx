import {
  AutoComplete,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Space
} from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import {
  Category,
  Component,
  Variant,
  Palette
} from "@haulmont/react-ide-toolbox";
import * as React from "react";

export default () => (
  <Palette>
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
          <Button />
        </Variant>
        <Variant name="Primary">
          <Button type="primary" />
        </Variant>
        <Variant name="Link">
          <Button type="link" />
        </Variant>
      </Component>

      <Component name="Checkbox">
        <Variant>
          <Checkbox />
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

      <Component name="Input">
        <Variant>
          <Input />
        </Variant>
      </Component>
    </Category>

    <Category name="Data Display">
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
    </Category>

    <Category name="Icons">
      <Component name="ArrowUpOutlined">
        <Variant>
          <ArrowUpOutlined />
        </Variant>
      </Component>
    </Category>
  </Palette>
);
