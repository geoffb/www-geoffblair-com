# www.geoffblair.com

Personal site of Geoff Blair, hosted at [www.geoffblair.com][1].

## Tech

Although this site is served statically, it's built using [Node.js][5] and a number of helpful packages:

* [Metalsmith][2]
* [Jade][3]
* [LESS][4]

## Development

Run the `make develop` command which will build, watch for changes, and serve the site to `localhost:8080`.

## Deployment

Run the `make deploy` command which will build and push the site to Amazon S3. The Makefile is configured specifically for www.geoffblair.com, but the domain and AWS profile can easily be changed. Under the hood, the `deploy` target uses the AWS CLI to sync the local files to S3. As such, you'll need to install the AWS CLI before the deployment step can be executed. I've installed it via Homebrew, but via Python or other options would work just as well.

## TODO

* Tech
	* Update to latest Metalsmith
	* Update to latest pug (renamed from jade)
	* Switch to yarn for package management
	* Deprecate `Makefile` in favor of `package.json` scripts?

[1]: http://www.geoffblair.com
[2]: http://www.metalsmith.io/
[3]: http://jade-lang.com/
[4]: http://lesscss.org/
[5]: http://nodejs.org/
