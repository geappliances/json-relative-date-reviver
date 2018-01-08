var moment = require('relative-time-parser');
var parsedDate = false;

function relativeDateReviver (key, data) {
  if (key === 'RelativeDate') {
    parsedDate = moment().relativeTime(data.when).format(data.format);
  } else if (parsedDate) {
    var retDate = parsedDate;
    parsedDate=false;
    return retDate;
  } else {
    return data;
  }
}

module.exports = relativeDateReviver;
