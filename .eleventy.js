"use strict";

const rss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const less = require("less");
const htmlmin = require("html-minifier");

const staticAssets = ["htdocs/*.ico", "htdocs/*.txt"];

module.exports = function (config) {
	// Plugins
	config.addPlugin(rss);
	config.addPlugin(syntaxHighlight);

	// Static assets
	for (const asset of staticAssets) {
		config.addPassthroughCopy(asset);
	}
	config.addPassthroughCopy({
		static: ".",
	});

	// Quick and dirty date formatting
	config.addNunjucksFilter("format_date", function (value) {
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const date = new Date(value);
		const month = monthNames[date.getMonth()];
		return `${month} ${date.getDate()}, ${date.getFullYear()}`;
	});

	// Less templates: https://lesscss.org
	config.addExtension("less", {
		outputFileExtension: "css",
		compile: async (input) => {
			return async () => {
				const output = await less.render(input, {
					paths: ["htdocs/_includes"],
				});
				return output.css;
			};
		},
	});

	// TODO: Minify CSS output

	// Minify HTML output
	// TODO: Target html specifically (without the path comparison)
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
		templateFormats: ["md", "less", "njk"],
	};
};
