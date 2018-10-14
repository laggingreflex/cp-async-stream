# cp-async-stream

Gives you an async iterator of a [child process]'s stdout/stderr streams.

## Install

```
npm i cp-async-stream
```

## Usage


```js
const { spawn } = require('child_process');
const cpStream = require('cp-async-stream');

const cp = spawn(...)

for await (const {stdout, stderr} of cpStream(cp)) {
  stderr && console.error(stderr)
  stdout && console.log(stdout)
}
```

[child process]: https://nodejs.org/api/child_process.html
