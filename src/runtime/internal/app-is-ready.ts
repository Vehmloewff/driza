import { simpleStore } from 'versatilejs/store';

// TODO: `appIsReady` needs to be made a lot better
// BODY: If two modules are using it at the same time, it will end up failing
// BODY: There should be something like a `createDelay(resolve)` function,
// BODY: then an `onReady` function.
export const appIsReady = simpleStore(true);
