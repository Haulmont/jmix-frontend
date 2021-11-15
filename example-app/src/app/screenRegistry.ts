import { ReadOnlyOwnerList } from "./read-only-owner/ReadOnlyOwnerList";
import { PetList } from "./pet/PetList";
import { OwnerList } from "./owner/OwnerList";
import { Home } from "./home/Home";
import { screenStore } from "@amplicode/react-core";

screenStore.registerScreen("home", {
  component: Home,
  captionKey: "screen.home"
});

screenStore.registerScreen("owner-list", {
  component: OwnerList,
  captionKey: "screen.OwnerList"
});

screenStore.registerScreen("pet-list", {
  component: PetList,
  captionKey: "screen.PetList"
});

screenStore.registerScreen("read-only-owner-list", {
  component: ReadOnlyOwnerList,
  captionKey: "screen.ReadOnlyOwnerList"
});
