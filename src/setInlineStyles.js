/* global window */

import prefix from './namespaces';

export default function (svg) {
	// Add empty svg element
	const emptySvg = window.document.createElementNS(prefix.svg, 'svg');
	window.document.body.append(emptySvg);
	const emptySvgDeclarationComputed = window.getComputedStyle(emptySvg);

	// Hardcode computed css styles inside svg
	const allElements = traverse(svg);
	let i = allElements.length;
	while (i--) {
		explicitlySetStyle(allElements[i]);
	}

	emptySvg.parentNode.removeChild(emptySvg);

	function explicitlySetStyle(element) {
		const cSSStyleDeclarationComputed = window.getComputedStyle(element);
		let i;
		let len;
		let key;
		let value;
		let computedStyleStr = '';

		for (i = 0, len = cSSStyleDeclarationComputed.length; i < len; i++) {
			key = cSSStyleDeclarationComputed[i];
			value = cSSStyleDeclarationComputed.getPropertyValue(key);
			if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
				// Don't set computed style of width and height. Makes SVG elmements disappear.
				if ((key !== 'height') && (key !== 'width')) {
					computedStyleStr += key + ':' + value + ';';
				}
			}
		}

		element.setAttribute('style', computedStyleStr);
	}

	function traverse(obj) {
		const tree = [];
		tree.push(obj);
		visit(obj);
		function visit(node) {
			if (node && node.hasChildNodes()) {
				let child = node.firstChild;
				while (child) {
					if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
						tree.push(child);
						visit(child);
					}

					child = child.nextSibling;
				}
			}
		}

		return tree;
	}
}
