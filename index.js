const asyncStream = require('streams-to-async-iterator');
const merge = require('merge-async-iterators');

module.exports = async function*(cp, opts = {}) {
  try {
    const std = {
      stdout: asyncStream(cp.stdout.setEncoding('utf8')),
      stderr: asyncStream(cp.stderr.setEncoding('utf8')),
    };
    const outputStreams = merge([std.stdout, std.stderr], { yieldIterator: true });
    for await (const { iterator, value: output } of outputStreams) {
      for (const line of output.split(/[\n\r]+/g).map(_ => _.trim()).filter(Boolean)) {
        yield {
          [iterator === std.stdout ? 'stdout' : 'stderr']: line
        };
      }
    }
  } finally {
    if (opts.finally) {
      opts.finally();
    } else {
      // cp.kill();
    }
  }
}
