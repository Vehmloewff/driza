# Halyard

Raising the bar for cross-platform applications

TODO: A paragraph on what this framework does

[Documentation](/docs/README.md) • [Discord Server](https://discord.gg/EzctDxj)

<p>
  <a href="https://www.npmjs.com/package/halyard">
    <img src="https://img.shields.io/npm/v/halyard.svg?color=blue" alt="npm version">
  </a>

  <a href="https://packagephobia.now.sh/result?p=halyard">
    <img src="https://packagephobia.now.sh/badge?p=halyard" alt="install size">
  </a>

  <a href="https://npmjs.com/package/halyard">
	<img src="https://img.shields.io/npm/dw/halyard?color=blue" alt="installs per week">
  </a>

  <a href="https://github.com/Vehmloewff/halyard/actions">
    <img src="https://img.shields.io/github/workflow/status/Vehmloewff/halyard/Node CI?logo=github"
         alt="build status">
  </a>

  <a href="https://github.com/Vehmloewff/halyard/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/Vehmloewff/halyard?color=blue" alt="license">
  </a>
</p>

## Development

Pull Requests are encouraged and always welcome. [Pick an issue](https://github.com/Vehmloewff/halyard/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and help us out!

To install Halyard locally:

```bash
git clone https://github.com/Vehmloewff/halyard
cd halyard
npm install
```

To build the runtime framework:

```bash
npm run build
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
