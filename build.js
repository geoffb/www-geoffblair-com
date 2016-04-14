var minimist = require("minimist");
var Metalsmith = require("metalsmith");
var drafts = require("metalsmith-drafts");
var collections = require("metalsmith-collections");
var permalinks = require("metalsmith-permalinks");
var templates = require("metalsmith-templates");
var markdown = require("metalsmith-markdown");
var less = require("metalsmith-less");
var ignore = require("metalsmith-ignore");
var metallic = require("metalsmith-metallic");
var tags = require("metalsmith-tags");
var dev = require("metalsmith-dev");

var argv = minimist(process.argv.slice(2), {
	default: {
		watch: false,
		serve: false,
		drafts: false,
		port: 8080
	}
});

var ms = Metalsmith(__dirname);

ms.source("./htdocs").destination("./_site");

// Optionally include drafts
if (!argv.drafts) { ms.use(drafts()); }

ms.use(ignore([
	"**/README.*"
]));

ms.use(tags({
	path: "tags/:tag/index.html",
	template: "tag-list.jade",
	sortBy: "date",
	reverse: true
}));

ms.use(collections({
	blog: {
		pattern: "blog/*.md",
		sortBy: "date",
		reverse: true
	}
}));

ms.use(metallic());

ms.use(markdown());

ms.use(permalinks({
	pattern: ":permalink",
	relative: false
}));

ms.use(templates("jade"));

ms.use(less({
	pattern: "**/combo.less",
	parse: {
		paths: "./htdocs/media/stylesheets"
	}
}));

// Don't copy certain files to the destination
ms.use(ignore([
	"**/.DS_Store",
	"**/*.less"
]));

ms.build(function (err) {
	err && console.log(err);
});

// Optionally watch for changes
if (argv.watch) {
	dev.watch(ms, [
		"templates/**/*"
	]);
}

// Optionally serve statically
if (argv.serve) {
	dev.serve(ms, argv.port);
}
