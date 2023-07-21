# www.geoffblair.com

[![Continuous Deployment](https://github.com/geoffb/www-geoffblair-com/actions/workflows/continuous-deployment.yml/badge.svg)](https://github.com/geoffb/www-geoffblair-com/actions/workflows/continuous-deployment.yml)

Personal website of Geoff Blair, hosted at [www.geoffblair.com](https://www.geoffblair.com).

## 🏗 Tech

- [Eleventy](https://www.11ty.dev) - Static site generation
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating
- [Less](http://lesscss.org) - CSS preprocessing
- [Prism](https://prismjs.com) - Syntax highlighting
- [Yarn](https://yarnpkg.com) - Package/dependency management

## 🔨 Development

Run the `yarn develop` command which will build, watch for changes, and serve the site to [localhost:8080](localhost:8080).

## 🚀 Deployment

The site is automatically built and published to [GitHub Pages](https://pages.github.com) using [GitHub Actions](https://github.com/features/actions) whenever commits are pushed to `main`. See workflows in `.github/workflows`.
