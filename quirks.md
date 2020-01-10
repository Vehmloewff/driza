# Quirks and wierd things

This a list of quirks, hiccups, and wrinkles I noticed while running the tests for `sveltronova`. Maybe this information will help others shorten those long hours of debugging.

These quirks really only apply to Cordova. One of the main goals of Sveltronova is to simplify the build and configuration steps of development, so that you can focus on your app.

-   The app's version must be a [semver](https://semver.org/) string that starts with a number greater than or equal to `1`. If that is not provided, an error similar to the following will be thrown when building for android:

    ```
    adb: Command failed with exit code 1 Error output:
    adb: failed to install <project_dir>/dist/cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk: Failure [INSTALL_FAILED_VERSION_DOWNGRADE]
    ```

-   If you are getting an error when building for android, try removing the `width` and `height` attributes from the icon tag in `config.xml`.

    `<icon src="some/path.png" width="512" height="512" />` -> `<icon src="some/path.png" />`

    Failure to do this can sometimes result in the following error:

    ```
    Execution failed for task ':app:processDebugResources'.
    > Android resource linking failed
    <project_dir>/dist/cordova/platforms/android/app/build/intermediates/merged_manifests/debug/AndroidManifest.xml:22: AAPT: error: resource mipmap/ic_launcher (aka com.mrawesome.sveltronovaapp:mipmap/ic_launcher) not found.

    	error: failed processing manifest.
    ```

-   The icon path in `config.xml` MUST be relative the directory that `cordova` is run in.
