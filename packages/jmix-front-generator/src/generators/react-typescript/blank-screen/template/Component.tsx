import React from "react";
import {registerScreen} from "@haulmont/jmix-react-web";

const ROUTING_PATH = '/<%= nameLiteral %>';

const <%= className %> = () => (
  <div>
    <%= className %>
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

export default <%= className %>;
