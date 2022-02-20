const rss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config) {
	config.addPlugin(rss);
	config.addPlugin(syntaxHighlight);

	config.addPassthroughCopy({
		"static": ".",
	});

	return {
		dir: {
			input: "htdocs",
			output: "dist",
		},
		templateFormats: [
			"md",
			"njk",
		],
	};
};
