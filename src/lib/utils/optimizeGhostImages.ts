interface ImageDimensions {
	width: number;
	height: number;
}

function getBestGhostSize(targetWidth: number, _targetHeight: number): string {
	// Available Ghost sizes (w300 is the minimum)
	const availableSizes = [
		{ key: "w300", width: 300, height: Infinity },
		{ key: "w600", width: 600, height: Infinity },
		{ key: "w720", width: 720, height: Infinity },
		{ key: "w960", width: 960, height: Infinity },
		{ key: "w1000", width: 1000, height: Infinity },
		{ key: "w1200", width: 1200, height: Infinity },
		{ key: "w1600", width: 1600, height: Infinity },
		{ key: "w2000", width: 2000, height: Infinity },
		{ key: "w2400", width: 2400, height: Infinity },
	];

	// Find the smallest size that's larger than or equal to target width
	for (const size of availableSizes) {
		if (size.width >= targetWidth) {
			return size.key;
		}
	}

	// If target is larger than all available sizes, use the largest
	return "w2400";
}

export function optimizeGhostImageUrl(
	originalUrl: string,
	dimensions: ImageDimensions,
	_quality = 80,
): string {
	if (!originalUrl) return originalUrl;

	try {
		const url = new URL(originalUrl);

		if (
			url.hostname.includes("blogapi.usuyuki.net") ||
			url.hostname.includes("ghost")
		) {
			// Ghost supports /size/w{width}/ path format for resizing
			const pathParts = url.pathname.split("/");
			const contentIndex = pathParts.indexOf("content");
			const imagesIndex = pathParts.indexOf("images");

			if (contentIndex !== -1 && imagesIndex !== -1) {
				// Check if size path already exists
				const sizeIndex = pathParts.indexOf("size");
				const targetWidth = Math.ceil(dimensions.width);
				const targetHeight = Math.ceil(dimensions.height);

				// Find best matching Ghost size
				const ghostSize = getBestGhostSize(targetWidth, targetHeight);

				if (sizeIndex === -1) {
					// Insert size parameter: /content/images/size/{ghostSize}/year/month/filename
					const beforeSize = pathParts.slice(0, imagesIndex + 1);
					const afterSize = pathParts.slice(imagesIndex + 1);
					const newPath = [...beforeSize, "size", ghostSize, ...afterSize].join(
						"/",
					);

					return `${url.origin}${newPath}`;
				} else {
					// Replace existing size parameter
					pathParts[sizeIndex + 1] = ghostSize;
					return `${url.origin}${pathParts.join("/")}`;
				}
			}
		}

		return originalUrl;
	} catch (error) {
		console.warn("Failed to optimize Ghost image URL:", error);
		return originalUrl;
	}
}