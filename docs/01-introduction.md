# Introduction

> NOTICE: Driza very early in development, and some major things may change before we hit version `1.0.0`.

> NOTICE: This document is a work-in-progress. If you get stuck or experience any trouble, you can get help via the [Discord Chatroom](https://discord.gg/EzctDxj).

Ready to get started? There is a [starter template](https://github.com/Vehmloewff/driza-template) for the ambitious.

TODO: Template repo doesn't exist. It needs to be created.

## Components

A Driza component is really just a function. When the function is called, it returns an instance of the component.

```ts
const instance = SomeComponent(props);
```

A component instance looks like this:

```ts
{
	// Event handlers
	on: (event: string, cb: EventListener) => void;
	once: (event: string, cb: EventListener) => void;
	dispatch: (event: string, data?: any) => Promise<number>;

	// Lifecycle handlers
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;

	// The props that this component was initiated with
	props: any;

	// Other
	children: Store<PublicComponentBasics[]>;
	hasBeenRendered: Store<boolean>;
	type: () => ComponentTypes;
}
```

### Creating a Component

The [`createComponent`](02-driza.md) function returns a [component](#components). The only paramater is a function that is called on each instance of that component.

The args that [`createComponent`](02-driza.md) passes into that function are:

-   `props`: The props passed into the component when it is initiated.
-   `UI`: An object that contains all of the [built-in elements](07-built-in-elements.md).
-   `SELF`: The component instance itself plus a [`render`](#selfrendercomponents-componentbasics) function.

```ts
import { createComponent } from 'driza';

const SomeComponent = createComponent((props, UI, SELF) => {
	const label = UI.label({
		text: props.name,
	});

	SELF.render(label);
});
```

### SELF.render(...components: ComponentBasics[])

`components` is an array of component or [element](07-built-in-elements.md) instances.

This function sets all the component instances in the `components` array as children of that component.

> WARNING: Each call to `SELF.render` replaces the current children with the contents of the `components` array.

```ts
function componentConstructor(props, UI, SELF) {
	// This is just a regular component
	const navbar = Navbar();

	// This is a built-in element
	const body = UI.label({
		text: props.text,
	});

	// SElF.render works with both
	SELF.render(navbar, body);
}
```

## Stores

As they make Driza reactive, [stores](03-driza-store.md) could well be considered the backbone of driza.

A store is just an object that has a few methods: `get`, `subscribe`, `set`, and `update`.

```ts
{
	get: () => any, // Gets the current value
	set: (value: any) => Promise<void>, // Sets the value

	// Calls `fn` every time the value changes
	subscribe: (fn: (newValue: any, initialCall: boolean) => void|Promise<void>) => void;

	// Sets the store to the result of `fn`
	update: (fn: (currentValue: any) => any) => void;
}
```

Creating a store is easy.

```ts
import { simpleStore } from 'driza';

const store = simpleStore(true);

store.subscribe(val => {
	console.log(val); // First `true`, then `false`, then `true`
});

console.log(store.get()); // -> true

store.set(false);

console.log(store.get()); // -> false

store.update(val => !val);

console.log(store.get()); // -> true
```

Stores are so integrated into driza, that all props passed into elements are allowed to be a store instance.

```ts
import { createComponent, simpleStore } from 'driza';

createComponent((_, UI, SELF) => {
	const value = simpleStore(`type here`);

	const input = UI.textField({ value, style: { textSize: 200 } });

	value.subscribe((val, initalCall) => {
		if (initialCall) console.log(`Start value is "${val}".`);
		else console.log(`The user typed "${val}".`);
	});
});
```

## Styles

Almost all of the [built-in elements](07-built-in-elements.md) allow styling through a `style` prop.

See the [Styles](04-styles.md) section for more info.

```ts
createComponent((_, UI) => {
	UI.button({
		style: {
			padding: 10,
		},
	});
});
```

## Setting a Renderer

Wondererd how Driza works cross platform? The answer is renderers. You can switch out different renderers for use on different platforms.

> NOTICE: `setRenderer` must be called before [`bootstrapComponent`](#bootstraping-a-component]).

For a list of renderers [click here](renderers.md). For instructions on building a renderer [check out these docs](08-creating-a-renderer.md).

```ts
import { setRenderer } from 'driza';

setRenderer(renderer);
```

## Bootstraping A Component

At some point, you will want to tell Driza to start your app by rendering a particular component.

```ts
import { bootstrapComponent } from 'driza';

async function startApp() {
	await bootstrapComponent(RootComponent());

	console.log(`App started!`);
}
```

## Review

Congrats! Now you know the basics of driza.

For more information, and a explanation of the ins and outs of Driza, check out the [API docs](README.md#api).

```ts
import { createComponent, bootstrapComponent, simpleStore, setRenderer } from 'driza';
import delay from 'delay';

const App = createComponent((_, UI, SELF) => {
	const text = simpleStore(``);
	const fullString = `Ready to build a truly cross-platform app?`;

	SELF.render(UI.label({ text }));

	async function typeWriter() {
		if (text.get().length === fullString.length) return;

		await delay(50);

		text.update(text => fullString[text.length]);

		await typeWriter();
	}

	SELF.once(`mount`, async () => {
		await typeWriter();
		await delay(300);

		SELF.destroy();
		SELF.reMount();
	});
});
```
