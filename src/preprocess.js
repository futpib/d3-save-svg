/* global XMLSerializer */

import setInlineStyles from './setInlineStyles';
import prefix from './namespaces';

export default function (svg) {
	svg.setAttribute('version', '1.1');

	// Removing attributes so they aren't doubled up
	svg.removeAttribute('xmlns');
	svg.removeAttribute('xlink');

	// These are needed for the svg
	if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns')) {
		svg.setAttributeNS(prefix.xmlns, 'xmlns', prefix.svg);
	}

	if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns:xlink')) {
		svg.setAttributeNS(prefix.xmlns, 'xmlns:xlink', prefix.xlink);
	}

	setInlineStyles(svg);

	const xmls = new XMLSerializer();
	const source = xmls.serializeToString(svg);
	const doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
	const rect = svg.getBoundingClientRect();
	const svgInfo = {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height,
		class: svg.getAttribute('class'),
		id: svg.getAttribute('id'),
		childElementCount: svg.childElementCount,
		source: [ doctype + source ],
	};

	return svgInfo;
}
