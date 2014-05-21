default: build

build: node_modules
	node build.js

develop: node_modules
	node build.js --watch --serve

deploy: build
	aws s3 sync _site s3://www.geoffblair.com --acl public-read --profile geoffblair

node_modules:
	npm install

clean:
	@rm -rf _site

.PHONY: clean
