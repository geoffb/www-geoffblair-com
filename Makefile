default: build

build: node_modules clean
	node build.js

develop: node_modules clean
	node build.js --watch --serve

#deploy: build
	# deploy using hobgoblin?

node_modules:
	npm install

clean:
	@rm -rf _site

.PHONY: clean
