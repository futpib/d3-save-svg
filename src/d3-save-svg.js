/* global window */

import download from './download';
import preprocess from './preprocess';
import prefix from './namespaces';
import { getImageBase64, isDataURL } from './convertRaster';

export function save(svgElement, config) {
	if (svgElement.nodeName !== 'svg' || svgElement.nodeType !== 1) {
		throw new TypeError('Need an svg element input');
	}

	config = config || {};
	let svgInfo = preprocess(svgElement, config);
	const defaultFileName = getDefaultFileName(svgInfo);
	const filename = config.filename || defaultFileName;
	svgInfo = preprocess(svgElement);
	download(svgInfo, filename);
}

export function embedRasterImages(svg) {
	const images = svg.querySelectorAll('image');
	[].forEach.call(images, image => {
		const url = image.getAttribute('href');

		// Check if it is already a data URL
		if (!isDataURL(url)) {
			// Convert to base64 image and embed.
			getImageBase64(url, (err, d) => {
				image.setAttributeNS(prefix.xlink, 'href', 'data:image/png;base64,' + d);
			});
		}
	});
}

function getDefaultFileName(svgInfo) {
	let defaultFileName = 'untitled';
	if (svgInfo.id) {
		defaultFileName = svgInfo.id;
	} else if (svgInfo.class) {
		defaultFileName = svgInfo.class;
	} else if (window.document.title) {
		defaultFileName = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
	}

	return defaultFileName;
}
