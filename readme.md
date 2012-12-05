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