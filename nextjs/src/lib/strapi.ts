import { strapi } from "@strapi/client";

const client = strapi({
  baseURL:
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api` ||
    "http://localhost:1337/api",
  auth: process.env.STRAPI_API_TOKEN,
});

export default client;
