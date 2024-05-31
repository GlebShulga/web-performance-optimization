import "../styles/index.scss";

import { getSpentTime } from "./common";

const buttonWithoutWW = document.getElementById("bWithoutWW");
const buttonWithWW = document.getElementById("bWithWW");
const spinner = document.getElementById("spinner");
const result = document.getElementById("result");
const timeSpent = document.getElementById("timeSpent");
const withoutWW = document.getElementById("withoutWW");
const withWW = document.getElementById("withWW");

buttonWithoutWW.addEventListener("click", () => {
  preStart();
  nonWebWorker();
});

buttonWithWW.addEventListener("click", () => {
  preStart();
  withWebWorker();
});

function nonWebWorker() {
  const time = getSpentTime();

  afterStop(time, false);
}

async function withWebWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "./worker.js",
        { type: "module" }
      );
      console.log("Service worker registered:", registration);

      if (registration.active) {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (e) => {
          if (e.data.type === "response") {
            afterStop(e.data.data, true);
          }
        };

        registration.active.postMessage("start", [messageChannel.port2]);
      } else {
        console.log("No active service worker found. Reloading the page.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  } else {
    console.warn("Service worker not supported in this browser");
  }
}

function preStart() {
  result.classList.add("hidden");
  withWW.classList.add("hidden");
  withoutWW.classList.add("hidden");
  spinner.classList.remove("hidden");
}

function afterStop(time, mode) {
  timeSpent.innerText = `${time}ms`;
  spinner.classList.add("hidden");

  if (mode) {
    withWW.classList.remove("hidden");
    withoutWW.classList.add("hidden");
  } else {
    withoutWW.classList.remove("hidden");
    withWW.classList.add("hidden");
  }

  result.classList.remove("hidden");
}
