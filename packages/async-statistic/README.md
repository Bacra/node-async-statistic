async-statistic
===============

## Install

```shell
npm install async-statistic
```

## Usage

```javascript
const statistic = require('async-statistic');
statistic(() => {
  return new Promise(resolve => setTimeout(resolve), 10);
})
  .then(data => {
    console.log(data);
    // print
    // { inRun:
    //   [ { type: 'PROMISE' },
    //     { type: 'Timeout' },
    //     { type: 'TIMERWRAP' },
    //     { type: 'PROMISE' } ],
    //   outRun:
    //   [ { type: 'PROMISE' },
    //     { type: 'PROMISE' } ]
    // }
  });
```
