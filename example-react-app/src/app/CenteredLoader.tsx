import { LoadingOutlined } from "@ant-design/icons";
import Centered from "./common/Centered";
import React from "react";
import "./CenteredLoader.css";

const CenteredLoader = () => (
  <Centered>
    <LoadingOutlined className="centered-loader-icon" spin={true} />
  </Centered>
);

export default CenteredLoader;
