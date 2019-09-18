/* global window, document, Blob */

export default function (svgInfo, filename) {
	window.URL = (window.URL || window.webkitURL);
	const blob = new Blob(svgInfo.source, { type: 'text/xml' });
	const url = window.URL.createObjectURL(blob);
	const { body } = document;
	const a = document.createElement('a');

	body.append(a);
	a.setAttribute('download', filename + '.svg');
	a.setAttribute('href', url);
	a.style.display = 'none';
	a.click();
	a.parentNode.removeChild(a);

	setTimeout(() => {
		window.URL.revokeObjectURL(url);
	}, 10);
}
