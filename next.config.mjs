import createJiti from "jiti";
import { fileURLToPath } from "node:url";

createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
