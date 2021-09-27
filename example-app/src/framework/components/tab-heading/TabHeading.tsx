import { CloseOutlined } from "@ant-design/icons";
import { MouseEventHandler } from "react";

interface Props {
  caption: string;
  onClose: MouseEventHandler;
}

export const TabHeading = ({ caption, onClose }: Props) => {
  return (
    <span>
      {caption}
      &nbsp;
      <CloseOutlined onClick={onClose} style={{ marginRight: 0 }} />
    </span>
  );
};
