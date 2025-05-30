/**
 * This file contains utility functions for handling image URLs in a CMS-based project.
 *
 * - `getOptimizedImageUrl`: Returns an optimized image URL with specified width and WebP format for better performance.
 * - `getAssetUrl`: Retrieves the direct URL of an asset, ensuring it is correctly formatted with `https://`.
 * - `generateImagePreloadTags`: Generates HTML preload tags for a list of assets to optimize image loading.
 *
 * These functions are needed for bypassing the nested data returned by Contentful CMS, so the images can be accessed quickly
 */

export function getOptimizedImageUrl(asset, width = 1920) {
  if (!asset.fields?.file?.url) {
    return "";
  }

  let url = asset.fields.file.url;

  // Check if `url` is a string
  let urlString;

  if (typeof url === "string") {
    urlString = url;
  } else {
    // If `url` is an AssetFile, extract the URL string from it
    urlString = url.url;
  }

  // Remove any leading '//' from the URL
  urlString = urlString.replace(/^\/\//, "");

  // Ensure the URL starts with 'https://'
  if (!urlString.startsWith("http")) {
    urlString = `https://${urlString}`;
  }

  // Construct the optimized image URL
  return `${urlString}?w=${width}&q=80&fm=webp`;
}

export function getAssetUrl(asset) {
  if (!asset || !asset.fields || !asset.fields.file || !asset.fields.file.url) {
    return "";
  }

  let url = asset.fields.file.url;

  // Check if `url` is a string
  let urlString;

  if (typeof url === "string") {
    urlString = url;
  } else {
    // If `url` is an AssetFile, extract the URL string from it
    urlString = url.url;
  }

  // Remove any leading '//' from the URL
  urlString = urlString.replace(/^\/\//, "");

  // Ensure the URL starts with 'https://'
  if (!urlString.startsWith("http")) {
    urlString = `https://${urlString}`;
  }

  return urlString;
}

export function generateImagePreloadTags(assets) {
  return assets
    .map((asset) => {
      const optimizedUrl = getOptimizedImageUrl(asset);
      return `<link rel="preload" as="image" href="${optimizedUrl}">`;
    })
    .join("\n");
}
