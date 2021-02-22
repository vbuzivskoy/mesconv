install:
	npm ci

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npm run test

link:
	npm link