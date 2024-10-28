import { createClient } from "contentful";

// Initialize the Contentful client with the space ID and access token from environment variables
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default client;
