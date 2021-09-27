import { Breadcrumb } from "antd";
import { observer } from "mobx-react";
import { useScreens } from "../../screen-api/ScreenContext";
import { BreadcrumbState } from "../../screen-api/Screens";
import "./BreadcrumbsArea.css";

type BreadcrumbsAreaProps = {
  breadcrumbs: BreadcrumbState[];
};

export const BreadcrumbsArea = observer(
  ({ breadcrumbs }: BreadcrumbsAreaProps) => {
    const screens = useScreens();

    if (breadcrumbs.length > 1) {
      return (
        <Breadcrumb style={{ marginBottom: "12px" }}>
          {breadcrumbs.map((breadcrumb: BreadcrumbState) => (
            <Breadcrumb.Item key={breadcrumb.key}>
              {breadcrumb.key === screens.activeBreadcrumb?.key && (
                <span className="amplifront-breadcrumb amplifront-breadcrumb_active">
                  {breadcrumb.caption}
                </span>
              )}
              {breadcrumb.key !== screens.activeBreadcrumb?.key && (
                <button
                  onClick={() => screens.makeBreadcrumbActive(breadcrumb.key)}
                  className="amplifront-breadcrumb amplifront-breadcrumb_inactive"
                >
                  {breadcrumb.caption}
                </button>
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      );
    }

    return null;
  }
);
