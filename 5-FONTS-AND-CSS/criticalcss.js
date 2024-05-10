const dimensions = [
  { height: 568, width: 320 },
  { height: 1024, width: 768 },
  { height: 900, width: 1024 },
];

import("critical").then((critical) => {
  // Generate the critical CSS for each dimension
  dimensions.forEach((dimension) => {
    critical.generate({
      inline: true,
      base: "dist/",
      src: "index.html",
      width: dimension.width,
      height: dimension.height,
      target: "index.html",
    });
  });
});
