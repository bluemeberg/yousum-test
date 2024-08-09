import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import axios from "axios";
import ServiceIntroduce from "./Components/ServiceIntroduce";
import LogoHeader from "./Components/LogoHeader";
import YoutubeToday from "./Components/YoutubeToday";
import Footer from "./Components/Footer";
import GoogleLoginBtn from "./Components/GoogleLoginBtn";
import { dataState } from "@/store/data";
import { userState } from "@/store/user";

const index = () => {
	const setApiData = useSetRecoilState(dataState);
	const apiData = useRecoilValue(dataState);
	const user = useRecoilValue(userState);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get("https://uncrapi.link/briefing/top_videos/");
				setApiData(response.data);
				console.log(response.data[0]);
			} catch (error) {
				console.error("Error fetching top videos:", error);
			}
		};

		getData();
	}, [setApiData]);
	const [data, setData] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchVideoData = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("https://claying.shop/video?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ");

			if (!response.ok) {
				throw new Error("Failed to fetch video data");
			}

			const result = await response.json();
			setData(JSON.stringify(result, null, 2));
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container $isLogin={user.name !== ""}>
			<LogoHeader />
			{user.name === "" && (
				<>
					<ServiceIntroduce />
					<GoogleLoginBtn />
				</>
			)}
			<div>
				<button onClick={fetchVideoData} disabled={loading}>
					{loading ? "Loading..." : "Fetch Video Data"}
				</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{data && <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{data}</pre>}
			</div>
			<YoutubeToday data={apiData} />
			<Footer />
		</Container>
	);
};

export default index;

const Container = styled.div<{ $isLogin: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Pretendard Variable";
	padding-top: ${(props) => (props.$isLogin ? "16px" : "76px")};

	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;
	scrollbar-width: none;
	overflow-y: scroll;
`;
