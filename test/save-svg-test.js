const tape = require('tape');
const jsdom = require('jsdom');
const xmls = require('xmlserializer');
const Blob = require('w3c-blob');
const d3SaveSvg = require('..');

const revokeObjectURLShim = function () {};

const createObjectURLShim = function () {};

const xmlsShim = function () {
	this.serializeToString = xmls.serializeToString;
};

tape('save() throws an error if element is not an svg element.', test => {
	jsdom.env({
		html: '<html><body><h1>hello</h1><svg></svg></body></html>',
		done(errs, window) {
			window.URL.createObjectURL = createObjectURLShim;
			window.URL.revokeObjectURL = revokeObjectURLShim;
			global.window = window;
			global.XMLSerializer = xmlsShim;
			global.Blob = Blob;
			global.document = window.document;
			const h1 = window.document.querySelector('h1');
			test.throws(() => {
				d3SaveSvg.save(h1);
			});
		},
	});

	test.end();
});

tape('save() accepts svg elements', test => {
	jsdom.env({
		html: '<html><body><h1>hello</h1><svg></svg></body></html>',
		done(errs, window) {
			window.URL.createObjectURL = createObjectURLShim;
			window.URL.revokeObjectURL = revokeObjectURLShim;
			global.window = window;
			global.XMLSerializer = xmlsShim;
			global.Blob = Blob;
			global.document = window.document;
			const svg = window.document.querySelector('svg');
			test.doesNotThrow(() => {
				d3SaveSvg.save(svg);
			});
		},
	});

	test.end();
});
