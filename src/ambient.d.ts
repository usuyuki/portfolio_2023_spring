// Squelch warnings of all imports from your image assets dir
declare module '$lib/assets/*' {
	const image: Record<string, any>;
	export default image;
}
