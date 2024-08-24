// Get image input and convert button
const imageInput = document.getElementById("image-input");
const convertButton = document.getElementById("convert-button");
const bitmapContainer = document.getElementById("bitmap-container");

// Add event listener to convert button
convertButton.addEventListener("click", convertImageToBitmap);

// Convert image to bitmap
function convertImageToBitmap() {
	// Get selected image
	const image = imageInput.files[0];

	// Create canvas element
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// Draw image on canvas
	const img = new Image();
	img.onload = () => {
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		convertCanvasToBitmap(ctx);
	};
	img.src = URL.createObjectURL(image);
}

// Convert canvas to bitmap
function convertCanvasToBitmap(ctx) {
	// Get pixel data from canvas
	const pixelData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

	// Create bitmap string
	let bitmapString = "";
	for (let i = 0; i < pixelData.data.length; i += 4) {
		const red = pixelData.data[i];
		const green = pixelData.data[i + 1];
		const blue = pixelData.data[i + 2];
		const alpha = pixelData.data[i + 3];
		const color = (red << 16) | (green << 8) | blue;
		bitmapString += color.toString(16).padStart(6, "0") + " ";
	}

	// Display bitmap string
	bitmapContainer.innerText = bitmapString;
}
