import React from "react";
import {FormattedMessage} from 'react-intl';

const HomePage = () => (
  <div>
    <FormattedMessage id='home.welcome'/> <%=title%>!
  </div>
);

export default HomePage;
