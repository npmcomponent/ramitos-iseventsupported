*This repository is a mirror of the [component](http://component.io) module [ramitos/iseventsupported](http://github.com/ramitos/iseventsupported). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/ramitos-iseventsupported`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# iseventsupported

A function for analyzing event support in browsers (using feature detection)

## Installation

```bash
$ component install ramitos/iseventsupported
```

## API

```js
var evSupported = require('iseventsupported');

evSupported('click'); // => true/false
evSupported('canplay', document.createElement('video')); // => true/false
```

## License

MIT