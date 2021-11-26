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
import CustomAppLayouts from "../app/custom-app-layouts/CustomAppLayouts";
import CustomDataDisplayComponents from "../app/custom-data-display-components/CustomDataDisplayComponents";
import CustomFormControls from "../app/custom-form-controls/CustomFormControls";
import ExampleCustomScreen from "../app/example-custom-screen/ExampleCustomScreen";
import { ArrowUpOutlined } from "@ant-design/icons";
import {
  Category,
  Component,
  Variant,
  Palette
} from "@haulmont/react-ide-toolbox";
import * as React from "react";

const palette = () => (
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
    <Category name="Screens">
      <Component name="ExampleCustomScreen">
        <Variant>
          <ExampleCustomScreen />
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
