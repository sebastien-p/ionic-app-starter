# Install

* Install [Git](https://git-scm.com/downloads)
* Install [Node.js](https://nodejs.org/en/download/)
* Install [needed mobile SDKs](https://cordova.apache.org/docs/en/5.1.1/guide/platforms/index.html)
* On Windows, as explained in [node-gyp documentation](https://github.com/nodejs/node-gyp):
  * Install Python 2.7.x. Python 3.x.y is not supported
  * Install Microsoft Visual Studio C++ 2013 (Express version works well)
* Execute `$ sudo npm install cordova --global` once (don't use `sudo` on Windows)
* Execute `$ npm install`, then wait...
* You should now have everything you need to get started (those folders listed in *./.gitignore* for example)

# Run in your default Web browser (Chrome is better)

* Execute `$ npm start` and enjoy ;)
* It is possible that you'll be prompted to choose an IP address or *localhost*, pick the one that suits you better
* A browser window should now open automatically, if it doesn't, go to *http://<ip or localhost>:8100*
* Now everytime a file located in *./www* is updated the browser will refresh, how cool is that?

# Run on devices

* For iOS, execute `$ sudo npm install ios-deploy --global` once (don't use `sudo` on Windows)
* [Setup your devices for development use](http://developer.android.com/tools/device.html) first, and hook them up to your computer
* Execute `$ npm run ios` and/or `$ npm run android` and enjoy ;)

# Run on emulators

* For iOS, execute `$ sudo npm install ios-sim --global` once (don't use `sudo` on Windows)
* Execute `$ npm run ios:emulator` and/or `$ npm run android:emulator` and enjoy ;)
* You can start a specific emulator using `$ npm run <platform>:emulator -- --target="<target>"`

# Build

* Execute `$ npm run build`. That's it, you now have a *./build/* directory containing the built app and this directory is automagically pushed to the *phonegap-build* Git branch

# Infos

* Contact: [@fingerproof](https://twitter.com/fingerproof), sp@fing.pro
