import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import ReactGA from "react-ga4";

// Google Analytics 초기화
// ReactGA.initialize("G-0TXELKHBQT"); // 측정 ID를 여기에 입력하세요
const isLocalhost = window.location.hostname === "localhost";

// Google Analytics 초기화
ReactGA.initialize("G-0TXELKHBQT", {
	testMode: isLocalhost, // 테스트 모드 활성화
	debug_mode: isLocalhost, // 디버그 모드 활성화
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RecoilRoot>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</RecoilRoot>
);
