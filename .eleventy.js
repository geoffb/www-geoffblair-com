"use strict";

const rss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = function (config) {
	config.addPlugin(rss);
	config.addPlugin(syntaxHighlight);

	config.addPassthroughCopy({
		static: ".",
	});

	config.addTransform("htmlmin", function (content) {
		if (this.outputPath && this.outputPath.endsWith(".html")) {
			const minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}
		return content;
	});

	return {
		dir: {
			input: "htdocs",
			output: "dist",
		},
		templateFormats: ["md", "njk"],
	};
};
