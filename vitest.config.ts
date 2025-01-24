/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
test: {
    globals: true,
    include: ["tests/**/*.test.ts"],
    coverage: {
    provider: "v8",
    reporter: ["text", "json", "html"],
    include: ["src/**/*.ts"],
    exclude: ["**/*.d.ts", "**/*.test.ts"],
    },
    environment: "jsdom",
},
});
