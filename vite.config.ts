import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default () => {
	return defineConfig({
		plugins: [svgr(), react(), tsconfigPaths()],
		base: "./",
		resolve: {
			alias: [
				{ find: "@", replacement: resolve(__dirname, "src") },
				{ find: "src", replacement: resolve(__dirname, "src/") },
			],
		},
		server: {
			proxy: {
				// proxy 관련 설정
			},
		},
		build: {
			outDir: "build", // 빌드 출력 디렉토리를 build로 설정
		},
	});
};
