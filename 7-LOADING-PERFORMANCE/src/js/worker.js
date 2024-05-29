import { getSpentTime } from "./common";

self.onmessage = (event) => {
  console.log("Service worker event:", event);
  if (event.data === "start") {
    const spentTime = getSpentTime();
    console.log("Service worker calculated spent time:", spentTime);
    self.postMessage({ type: "response", data: spentTime });
  } else {
    console.warn("Service worker received unexpected message:", event.data);
  }
};
