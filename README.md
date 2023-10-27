> Abandonded because I longer need this project and don't have time to maintain it.

# Driza

Raising the bar for cross-platform applications

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

## What is Driza?

Driza is a compiler and runtime that links web-based platforms (`electron`, `browser`, `cordova`) together. The goal is to remove that headache seemingly endless configuration.

This library does not just limit the platform options to `electron`, `cordova`, and the `browser`, anyone can build a platform implemention.

## Current platform implementations

-   [Electron](src/platforms/electron/index.ts)
-   [Android](src/platforms/android/index.ts)
-   [Static (www)](src/platforms/www/index.ts)
-   [Browser](src/platforms/browser/index.ts)

## Installation

```bash
npm install driza
```

## API

-   [Cli](#cli)
    -   [Default behavior](#default-behavior)
-   [Config](#config)
    -   [Build Options](#buildoptions)

## Cli

```bash
Usage: sova [options] [arguments...]

Options:
  -v, --version  output the current version
  --config       Path to the config file.  By default driza will look for a `driza.config.js`
  --verbose      display lots of logs (good for debugging)
  --silent       only errors will show
  -h, --help     output usage information
```

If the config file exports a function at default, all arguments will be passed straight to that function.

### Default Behavior

If a config is not found, driza will apply a default config.

By default that config will set `watch.enable` to `true`. This can be disabled with the `nowatch` argument.

By default that config will set the platform as `electron`. If the config finds a `android` or `A` argument, it will set the platform as `android`.

By default the config will set `object` to `run`. This can be changed to build by specifing a `build` argument, or compile by specifying a `compile` argument.

## Config

The config file can be written in `commonjs` or `es6`.

It is required that the config file `export default`/`module.exports` an object containing the `BuildOptions`, or do the same to a function that returns the same type of object.

### BuildOptions

Please refer to [`src/interfaces.ts#L39`](/src/compiler/interfaces.ts#L39).

## Development

Pull Requests are encouraged and always welcome. [Pick an issue](https://github.com/Vehmloewff/driza/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and help us out!

To install Driza locally:

```bash
git clone https://github.com/Vehmloewff/driza
cd driza
npm install
```

To build the compiler and runtime:

```bash
npm run build
```

To watch the file system and rebuild on changes:

```bash
npm run build -- -w
```

The compiler is located in the [`src/compiler`](src/compiler) directory.

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
