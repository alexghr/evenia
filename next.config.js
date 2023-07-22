const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ucarecdn.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
};

module.exports = nextConfig;
