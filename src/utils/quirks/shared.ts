export function quirkSVGImage(uri: string, uriStructure: URL): [uri: string] {
	if (uriStructure.protocol !== 'data:') return [uri];
	const svgPart = uri.split(',')[1];
	if (!svgPart.includes('svg')) return [uri];
	const blob = new Blob([svgPart], { type: 'image/svg+xml' });

	return [URL.createObjectURL(blob)];
}
