let aqp = require('api-query-params')

let query = aqp('status=sent&timestamp>2016-01-01&author.firstName=/john/i&limit=100&skip=50&sort=-timestamp&populate=logs&fields=id,logs.ip');
//console.log(query);



const queryString = require('query-string');

let qr = queryString.parseUrl('Foo?foo=bar');
console.log(qr.url);
//=> {url: 'https://foo.bar', query: {foo: 'bar'}}