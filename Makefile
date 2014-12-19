default: build

build: node_modules
	node build.js

develop: node_modules
	node build.js --watch --serve --drafts

deploy: build
	aws s3 sync _site s3://www.geoffblair.com --cache-control max-age=86400 --size-only --acl public-read --delete --profile geoffblair

node_modules:
	npm install

clean:
	@rm -rf _site

.PHONY: clean
