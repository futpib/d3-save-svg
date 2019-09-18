/* global window, XMLHttpRequest */

export { converterEngine, getImageBase64, isDataURL };

function converterEngine(input) { // Fn BLOB => Binary => Base64 ?
	const uInt8Array = new Uint8Array(input);
	let i = uInt8Array.length;
	const biStr = []; // New Array(i);
	while (i--) {
		biStr[i] = String.fromCharCode(uInt8Array[i]);
	}

	const base64 = window.btoa(biStr.join(''));
	return base64;
}

function getImageBase64(url, callback) {
	const xhr = new XMLHttpRequest(url);
	let img64;
	xhr.open('GET', url, true); // Url is the url of a PNG/JPG image.
	xhr.responseType = 'arraybuffer';
	xhr.callback = callback;
	xhr.addEventListener('load', function () {
		img64 = converterEngine(this.response); // Convert BLOB to base64
		this.callback(null, img64); // Callback : err, data
	});

	xhr.addEventListener('error', () => {
		callback('B64 ERROR', null);
	});

	xhr.send();
}

function isDataURL(str) {
	const uriPattern = /^\s*data:([a-z]+\/[a-z0-9-]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+,;=\-._~:@/?%\s]*\s*$/i;
	return Boolean(str.match(uriPattern));
}
