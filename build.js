var minimist = require("minimist");
var Metalsmith = require("metalsmith");
var permalinks = require("metalsmith-permalinks");
var templates = require("metalsmith-templates");
var markdown = require("metalsmith-markdown");
var less = require("metalsmith-less");
var ignore = require("metalsmith-ignore");
var dev = require("metalsmith-dev");

var argv = minimist(process.argv.slice(2), {
	default: {
		watch: false,
		serve: false,
		port: 8080
	}
});

var ms = Metalsmith(__dirname);

ms.source("./htdocs").destination("./_site");

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
