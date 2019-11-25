# nodejs-template

## Startup

```sh
npx degit Vehmloewff/nodejs-template#typescript nodejs-app
# or the javascript branch
cd nodejs-app
npm i
```

## Running the tests

```sh
npm test
# or
npm test -- -w
```

## Linting

```sh
npm run lint
# or
npm run lint:test
```

_Delete everything below this line_

---

# versatilejs

_A different approach to application development._

There are lots of usefull tools, frameworks, and libraries out there for building both native and web UI applications. Bringing these tools together though, can be a bit of a challenge. There are usually lots of complications, compatibility problems, and endless configurations. This often reslts in, either multipule codebases, or one overwieght and bug-filled one. By building a platform that controls the flow of your project, and allows third-party frameworks to communicate with each other, Versatile takes care of all that dreaded configuration for you, resulting in smaller, easier to maintain projects, and a :smile: developer.

## How it works

`versatilejs` ships a CLI and API that simply channels the flow of your project to plugins of your choice. It includes a dependency Compatibility manager, and a watcher.

Example:

```js
// versatile.config.js
import svelteASR from 'versatile-plugin-svelte-asr';
import server from 'versatile-plugin-server';
import web from 'versatile-plugin-web';
import electron from 'versatile-plugin-electron';
import nativescript from 'versatile-plugin-nativescript';

export default () => ({
	name: `Versatile App`,
	plugins: [
		svelteASR(), // Your client-side app
		server(), // A server-side api to go with it
		web(), // Bundle and deploy the client-side on the web
		electron(), // ...on desktop
		nativescript(), // ...and on IOS and Android
	],
	watch: {
		enable: true, // Watch the included files and recompile on changes
	},
});
```

For a list of all the plugins, click [here](/plugins/README.md).

## Installation

```sh
# npm i versatile -D TODO: uncomment this when package is published
```

It is most often installed as a devDependency, because it just builds youe code.

## CLI Usage

Common usage:

```sh
versatile compile ...args
```

All args are passed straight into your config's default export function when called.

Default config location: `versatile.config.js`.

For more information about the config, see [config](#config).

Full list of options:

```sh
# TODO: add the result of versatile --help
```

## API usage

TODO: This needs some docs

## Config

A config is just a javascript file that exports a function at default. That function must return an containing the following properties. All of them are optional.

```ts
{
	name?: string, // Default is `Versatile App`
	machineName?: string,  // Default is `versatile-app`
	description?: string, // Default is `TODO: add a description`
	plugins?: Plugin[], // Default is []
	watch?: {
		enable?: boolean, // Default is false
		clearScreen?: boolean, // Default is true
	}
	dependencies?: {
		nativeModules?: string[], // Default is []
		sandboxedModules?: string[],  // Default is []
		dualModules?: string[], // Default is []
	}
	[otherOptions: string]: any, // Plugins may require more options
}
```

## Plugins

These are the core of Versatile. With plugins, you can easily link frameworks together in a seamless, flowing manner, with next-to-zero configuration.

There is a [list of plugins here](/plugins/README.md).

## Developing a plugin

First, what is a plugin?

A Versatile plugin is just a function that is called before the build starts. It is passed in a bunch of properties. If that function returns a promise, Versatile will not call the next plugin, until that promise has been resolved.

### PluginParams

The following values are passed into the plugin function:

```ts
{
	versatileParams: BuildOptions;
	setRuntime: (code: string, pluginId: string) => void;
	setValue: (key: string, value: any) => void;
	getValue: (key: string) => any;
	addWatchFile: (path: string) => void;
	emitter: () => EventEmitter;
}
```

#### versatileParams: BuildOptions

This is just an object containing the default export of the config, or the second param passed into [`buildApp`](#api-usage) if the API approach is used.

#### setRuntime: (code: string, pluginId: string) => void

#### setValue: (key: string, value: any) => void

... TODO

## Contributing?

**Sure!**

```sh
# fork repo
git clone https://github.com/[your_username]/todo
cd todo
npm i
npm test -- -w
```

Pull Requests are always welcome!

_PS: Don't forget to `npm run lint`!_ :wink:

## License

[MIT](/LICENSE)
