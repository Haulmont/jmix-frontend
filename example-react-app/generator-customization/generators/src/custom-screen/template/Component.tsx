import React from "react";
import {registerScreen} from "@haulmont/jmix-react-ui";

const ROUTING_PATH = '/<%= nameLiteral %>';

export const <%= className %> = () => (
  <div>
    CUSTOM GENERATOR <%= className %>
  </div>
);

registerScreen({
  component: <%= className %>,
  caption: 'screen.<%= className %>',
  screenId: '<%= className %>',
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH,
  }
});
