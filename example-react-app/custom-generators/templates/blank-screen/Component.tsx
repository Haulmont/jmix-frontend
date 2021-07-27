import React from "react";
import {registerScreen} from "@haulmont/jmix-react-ui";

const ROUTING_PATH = '/<%= nameLiteral %>';

export const <%= className %> = () => (
  <div>
    WE HAVE JUST USED THE BLANK-SCREEN GENERATOR BUT WITH OUR OWN TEMPLATE <%= className %>
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
