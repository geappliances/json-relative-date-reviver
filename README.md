## json-relative-date-reviver

```
var relativeDateReviver = require('json-relative-date-reviver');

var o = JSON.parse('{
  "foo": {
    "RelativeDate": {
      "when": "now"
    }
  }
}', relativeDateReviver);
console.log(o.foo); // will be todays dates
```

This library uses the NPM module [relative-time-parser](https://www.npmjs.com/package/relative-time-parser) and wraps it in a reviver class that
can be supplied to a JSON.parse call.  It's meant for use in scenarios where static test
data is created for unit testing but said data has a relationship with the current/system
date.

The `when` property is processed as described by the relative-time-parser and can be used to
select dates/times relative to the current date.

The reviver looks for the presence of a `RelativeDate` property and triggers the translation
from there.  It also accepts a secondary property `format` which uses the format as described
by the [moment](momentjs.com) module.

```
var o = JSON.parse('{
  "oneWeekInFuture": {
    "RelativeDate": {
      "when": "+7d",
      "format": "YYYY-MM-DD"
    }
  }
}', relativeDateReviver);

console.log(o.oneWeekInFuture);
```
