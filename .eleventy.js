const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(config) {
  config.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: "htdocs",
      output: "dist",
    },
    templateFormats: [
      "md",
      "txt",
      "css",
      "ico",
      "png",
      "jpg",
    ],
  };
};
