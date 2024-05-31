function getSpentTime() {
  const a = [];

  for (let i = 50000; i >= 0; i--) {
    a.push(i);
  }

  const start = new Date().getTime();

  sort(a);

  const end = new Date().getTime();

  return end - start;
}

function sort(a) {
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i] > a[i + 1]) {
        const temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}

self.onmessage = (event) => {
  console.log("Service worker event:", event);
  if (event.data === "start" && event.ports.length > 0) {
    const spentTime = getSpentTime();
    event.ports[0].postMessage({ type: "response", data: spentTime });
  } else {
    console.warn("Service worker received unexpected message:", event.data);
  }
};
