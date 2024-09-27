#!/bin/bash

# Set desired WebP quality (0-100). Lower values result in smaller files.
QUALITY=80

# Check if a directory is provided as an argument
if [ -z "$1" ]; then
	echo "Usage: $0 /path/to/folder"
	exit 1
fi

# Set the directory
DIR="$1"

# Check if the directory exists
if [ ! -d "$DIR" ]; then
	echo "Directory does not exist: $DIR"
	exit 1
fi

# Convert JPEG and PNG files to WebP with the specified quality
for img in "$DIR"/*.{jpg,jpeg,png}; do
	# Check if the file exists (in case no files match the pattern)
	if [ -e "$img" ]; then
		# Get the file name without extension
		filename=$(basename "$img")
		filename_no_ext="${filename%.*}"

		# Convert to WebP with the specified quality for optimization
		cwebp -q "$QUALITY" "$img" -o "$DIR/$filename_no_ext.webp"

		# If the conversion is successful, delete the original file
		if [ $? -eq 0 ]; then
			rm "$img"
			echo "Converted and deleted: $img"
		else
			echo "Failed to convert: $img"
		fi
	fi
done

echo "WebP conversion with quality $QUALITY complete."
