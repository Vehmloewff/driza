> Still in development.  This package is not even published on npm yet.

# Driza

Raising the bar for cross-platform applications

TODO: A paragraph on what this framework does

[Documentation](/docs/README.md) • [Discord Server](https://discord.gg/EzctDxj)

<p>
  <a href="https://www.npmjs.com/package/driza">
    <img src="https://img.shields.io/npm/v/driza.svg?color=blue" alt="npm version">
  </a>

  <a href="https://packagephobia.now.sh/result?p=driza">
    <img src="https://packagephobia.now.sh/badge?p=driza" alt="install size">
  </a>

  <a href="https://npmjs.com/package/driza">
	<img src="https://img.shields.io/npm/dw/driza?color=blue" alt="installs per week">
  </a>

  <a href="https://github.com/Vehmloewff/driza/actions">
    <img src="https://img.shields.io/github/workflow/status/Vehmloewff/driza/CI?logo=github"
         alt="build status">
  </a>

  <a href="https://github.com/Vehmloewff/driza/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/Vehmloewff/driza?color=blue" alt="license">
  </a>
</p>

## Development

Pull Requests are encouraged and always welcome. [Pick an issue](https://github.com/Vehmloewff/driza/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and help us out!

To install Driza locally:

```bash
git clone https://github.com/Vehmloewff/driza
cd driza
npm install
```

To build the runtime framework:

```bash
npm run build
```

To watch the file system and rebuild on changes:

```bash
npm run build -- -w
```

The runtime framework is located in the [`/src/runtime`](/src/runtime) directory.

### Running the tests

The tests can be run with the following command:

```bash
npm test
```

To watch the file system and re-run the tests on changes:

```bash
npm test -- -w
```

## License

[MIT](/LICENSE)
