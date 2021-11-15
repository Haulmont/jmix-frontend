import {Home} from "./home/Home";
import {screenStore} from "@amplicode/react-core";

screenStore.registerScreen("home", {
  component: Home,
  captionKey: 'screen.home'
});
