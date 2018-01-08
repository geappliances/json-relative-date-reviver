const assert=require('assert'),
	moment = require('moment'),
	relativeDateReviver = require('../json-relative-date-reviver');

var jsonstr = '{"foo": {"RelativeDate": {"when":"now"}},"bar":{"baz":"boom"}}';
var oneWeekInFuture = '{"foo": {"RelativeDate": {"when":"+1w","format":"YYYY-MM-DD"}},"bar":{"baz":"boom"}}';

describe('json-relative-date-reviver', function() {
	it('should substitute dates relative to sysdate', function() {
		var v = JSON.parse(jsonstr, relativeDateReviver);
		assert.ok(moment().isSame(v.foo, 'day'));
		assert.equal('boom', v.bar.baz, "should leave other properties untouched");
	});
	it('handle format parameter', function() {
		var now = moment().startOf('day');
		var v = JSON.parse(oneWeekInFuture, relativeDateReviver);
		console.log(v.foo);
		assert.equal(-7, now.diff(v.foo,'days'));
		assert.equal('boom', v.bar.baz, "should leave other properties untouched");
	});
});
