# Install

* Install [Git](https://git-scm.com/downloads)
* Install [Node.js](https://nodejs.org/en/download/)
* Install [needed mobile SDKs](https://cordova.apache.org/docs/en/latest/)
* On Windows, as explained in [node-gyp documentation](https://github.com/nodejs/node-gyp): (this is needed for Sass building)
  * Install Python 2.7.x. Python 3.x.y is not supported
  * Install Microsoft [Visual Studio C++ 2013](https://www.microsoft.com/en-gb/download/details.aspx?id=44914) (Express version works well)
* Execute `$ npm install`, then wait...
* You should now have everything you need to get started (those folders listed in *./.gitignore* for example)

# Environment Setup

* You are free to use whatever IDE you like to use but it is recommended to use [WebStorm 2017 +](https://www.jetbrains.com/webstorm/download/) as it has completion for almost every file type used in the project
* You may have to install Pug plugin to Webstorm (or any Jetbrains IDE) to have completion on pug file, go to File > Settings > Plugins - type Pug (or jade), select plugin Pug (ex-Jade) then click on 'Install Jetbrains Plugin', you could be prompted to restart IDE.

# Setup

* Run `$ npm run restore:web` to setup application for development on web browser with [Chrome mobile device emulator](https://developers.google.com/web/tools/chrome-devtools/device-mode/)
* If you want to deploy on mobile device or SDK emulator, run `$ npm run restore` to prepare cordova

# Run in your default Web browser (Chrome is better)

* Execute `$ npm start` and enjoy ;)
* It is possible that you'll be prompted to choose an IP address or *localhost*, pick the one that suits you better
* A browser window should now open automatically, if it doesn't, go to *http://<ip or localhost>:8100/smartphone.html*
* Now everytime a file located in *./src* is updated the browser will refresh, how cool is that?

# Run on devices

* For iOS, execute `$ sudo npm install ios-deploy --global` once (don't use `sudo` on Windows)
* [Setup your devices for development use](http://developer.android.com/tools/device.html) first, and hook them up to your computer
* For Android, you need JDK 1.8+ and Android SDK 25
* Execute `$ npm run (ios|android):<app>` and enjoy ;)
* If you do that, you can still run `$ npm start` to execute on your web browser (no need to restore:web again as it is already done with restore task)

**TODO** support for [windows phone](https://cordova.apache.org/docs/fr/latest/guide/platforms/win8/)

# Run on emulators

* Refer to platform specific emulator installation to have emulator available on your environment
* For iOS, execute `$ sudo npm install ios-sim --global` once (don't use `sudo` on Windows)
* Execute `$ npm run (ios|android):<app>:emulator` and enjoy ;)
* You can start a specific emulator using `$ npm run (ios|android):<app>:emulator -- --target="<target>"`

# Tests

You can run some automatic tests on the application with dedicated NPM scripts.

## Unit Tests

Karma, PhantomJS and everything needed for unit tests is automatically installed with npm installation.

To run unit tests, simply use

    npm run test:unit

On Dev environment, this will run test with livereload in your console, meaning if you made any change to a test file (in test/unit), tests will run again.

To add some tests, go to test/unit/, folders are the same as in src (one folder for angular module).

## E2E Tests

Install selenium and chrome driver standalone (this should be done on npm install script, see package.json, but if not, run this once instead)

    node ./node_modules/protractor/bin/webdriver-manager update

Start selenium before running tests

    node ./node_modules/protractor/bin/webdriver-manager start

Run tests

    npm run test:e2e
    
To add some tests, go to test/e2e/
    
There is also a global test script to run unit and e2e tests

    npm run test

# Applications and builds configuration (aka Expert mode)

Take a look at the *package.json* file. You'll see that it's not only used for listing Node-related dependencies but also for storing informations about Cordova and some custom scripts and configuration.

## Cordova plugins

Cordova plugins are also listed in *package.json*, this is an Ionic feature that we take advantage of for several reasons. First, plugins listed here will be automatically saved and installed when needed which is cool. Then, depending on the selected build (see below), some on them would be automatically ignored too. Now that's the dream!

There's one thing that you should keep in mind though: you should always install a new plugin using `$ ionic plugin add <plugin>@<spec>`, preferrably passing `spec` as a fixed version number. Omitting `spec` is a bad habbit anyway and it'll break the automatic plugins installation feature mentionned above. So be warned.

## Cordova platforms

Cordova platforms should be listed in *package.json* just like plugins. They will also be automatically installed when needed.

## Scripts

NPM allows us to define custom scripts in *package.json* and provides us with some default ones. I advise you to read the documentation [here](https://docs.npmjs.com/misc/scripts) and [here](https://docs.npmjs.com/cli/run-script) if you don't know about this feature.

Now that you know what you're doing, here is a detailed explanation of the available custom scripts for you tu use:
* `$ npm run restore(:web)` - Setup environment, default to smartphone (with all cordova dependencies), use :web version if you only want to test on your web brwoser.
* `$ npm run serve:(smartphone|tablet)` - actually, `$ npm start` (see above) is an alias to `$ npm run serve:smartphone` so you should quickly understand what this script does. Use ionic `$q` command to stop watch and livereload.
* `$ npm run build:<device>:<build>` - run a build to get *.apk* and *.ipa* files (takes a while but only Jenkins should do this anyway)
* `$ npm run (ios|android)` and `$ npm run (ios|android):emulator` - see above
* `$ npm run build:android:prod` - to generated signed apk for release in store

Please note that you should execute a `restore` script at least once before using the scripts that allow you to run the application (meaning all scripts except `build` ones).
Please also note that after using a setup task for a specific environment, you are not supposed to run a build task on a different environment, because app ids are specific to environment and are set on setup task only.
Please also not that Android build for prod environnement will sign app using generated build.json properties (from project.json prod build info + .keystore file in /assets/packaging/default)

## Configuration

Apps are defined in *project.json* as properties of the `apps` object. Builds (for environment) are defined in *project.json* as properties of the `builds` object. There's a `common` object useful for storing common configuration (meaning settings that will apply regardless of the selected app and build).

If you want to define some new apps and/or builds, just look at how it's done and copy+paste, see how easy it is? For your insterest, `constants` will be turned into Angular constants at runtime, `excludePlugins` is used to exclude unwanted Cordova plugins at build time.

## ESLint

ESLint is installed locally. Version is specified in package.json file.
You should configure your IDE to use the local ESLint package.
* WebStorm : Settings > Languages & Frameworks > Javascript > Code Quality Tools > ESlint : check Enable and in ESlint package find ESlint folder in your project local node_modules folder

## Application locales

You can add some locales (i18n languages) in the app simply by adding locale code in app I18N constants in project.json file.
Then add some translation files, in any module, add a folder i18n/ with a file for each locale. (like fr-FR.json or en-US).
There is an existing directive to add a dropdown to switch locale in the application.

# Release a new version of the application

Before releasing a new version of the application, you must check that :
* The version number in package.json is up to date (application must be deleted/installed again if the version number does not change)
* A git tag has been generated with the version number as name
* Code is merged in develop for a release on Test, merged in master for a release on PP/Prod

## Version number

Must follow following pattern : M.m.p(-<additionnalName>) where :
* "M" is the major version number
* "m" is the minor version number
* "p" is the patch version number
* <additionnalName> can be replace with anything and is optionnal, convention is to add "-dev" for release on Test/Dev

## How to release

* Use Greenhouse CI to build (credentials are not stored in this repository)
* Use TestFairy to deploy (credentials are not stored in this repository)

# Troubleshooting

* Before running the application on Android, make sure you [have everything installed](https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/INSTALLATION.md) to be able to build the PhoneGap Push plugin.

* If install fails on bower with git protocol:
    * try this : git config --global url."https://".insteadOf git://
    * To revert : git config --global --unset url."https://".insteadOf


## Current directory is not a cordova based project

Run `$ npm run restore` to generate cordova files.


# project.json

{
  "common": {
    // Base Angular app constants.
    "constants": {}
  },
  "builds": {
    "dev": {
      // Allows to exclude some cordova plugins per build.
      "excludePlugins": [],
      // Per build Angular constants.
      "constants": {}
    },
    "test": {
      "excludePlugins": [],
      "constants": {}
    },
    "preprod": {
      "excludePlugins": [],
      "constants": {}
    },
    "qa": {
      "excludePlugins": [],
      "constants": {}
    },
    "prod": {
      "excludePlugins": [
        // The Cordova console plugin should be
        // excluded in the production build.
        "cordova-plugin-console"
      ],
      "constants": {}
    }
  },
  "apps": {
    "default": {
      // App name in config.xml, optionnal as it can be specified per build.
      "name": "App",
      // App id in config.xml, optionnal is it can be specified per build.
      // Can either be a string or an object. If an object then a "ios" key
      // must be present (default) and an "android" key can be present so
      // that one can use a different id for iOS and Android. iOS allows
      // dashes and disallows underscores in the id, Android does the
      // opposite. For this reason you should not use both of them and
      // specify the id as a string.
      "id": {
        "ios": "",
        "android": ""
      },
      // Per app Angular constants.
      // You should always use UNDERSCORE_SNAKE names by convention.
      "constants": {
        // Mandatory
        "I18N": {
          // Mandatory, you must provide at least one locale for your app.
          // Use bcp47 locale identifiers.
          "locales": ["en-US"],
          // Optionnal: first locale in locales array if not specified.
          "default": "en-US"
        }
      },
      // Per app builds configuration.
      "builds": {
        "dev": {
          // Optionnal if a global app name is specified. If so, the
          // build key will be appended to the app name to allow for
          // quick apps differenciation on the device springboard.
          // If specified, the overrides the global app name.
          "name": "App dev",
          // Same as global app id except this will override
          // it if specified. If not specified, a global one must
          // exist and the build key will be appended to it to allow
          // for installing multiple builds on the same device.
          "id": {
            "ios": "",
            "android": ""
          },
          // Per app build Angular constants.
          "constants": {
            "API_SERVER_URL": ""
          }
        },
        "test": {
          "name": "App test",
          "id": {
            "ios": "",
            "android": ""
          },
          "constants": {
            "API_SERVER_URL": ""
          }
        },
        "preprod": {
          "name": "App preprod",
          "id": {
            "ios": "",
            "android": ""
          },
          "constants": {
            "API_SERVER_URL": ""
          }
        },
        "qa": {
          "name": "App qa",
          "id": {
            "ios": "",
            "android": ""
          },
          "constants": {
            "API_SERVER_URL": ""
          }
        },
        "prod": {
          // The build key will not be appended to the app name for prod.
          "name": "App",
          "id": {
            "ios": "",
            "android": ""
          },
          "constants": {
            "API_SERVER_URL": ""
          }
        }
      },
      "targets": {
        "smartphone": {
          "constants": {}
        },
        "tablet": {
          "constants": {}
        }
      }
    }
  }
}
