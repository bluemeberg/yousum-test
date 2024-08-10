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
				const response = await axios.get("https://claying.shop/briefing/top_videos/");
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
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [imageSrc1, setImageSrc1] = useState<string | null>(null);
	const [imageSrc2, setImageSrc2] = useState<string | null>(null);
	const [imageSrc3, setImageSrc3] = useState<string | null>(null);
	const [imageSrc4, setImageSrc4] = useState<string | null>(null);
	const fetchVideoData = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("https://claying.shop/briefing/capture_frames/CQgfERR-454", {
				method: "GET", // 명시적으로 GET 메서드를 지정 (기본값이므로 생략 가능)
				headers: {
					Accept: "application/json", // 'accept' 헤더를 설정
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch video data");
			}

			const result = await response.json();
			// Assuming the response contains a base64 encoded image
			const base64Image = result[0].content; // replace 'image' with the correct key
			const imageSrc = `data:image/png;base64,${base64Image}`;
			const base64Image1 = result[1].content; // replace 'image' with the correct key
			const imageSrc1 = `data:image/png;base64,${base64Image1}`;
			const base64Image2 = result[2].content; // replace 'image' with the correct key
			const imageSrc2 = `data:image/png;base64,${base64Image2}`;
			const base64Image3 = result[3].content; // replace 'image' with the correct key
			const imageSrc3 = `data:image/png;base64,${base64Image3}`;
			const base64Image4 = result[4].content; // replace 'image' with the correct key
			const imageSrc4 = `data:image/png;base64,${base64Image4}`;
			setData(JSON.stringify(result, null, 2));
			setImageSrc(imageSrc); // Set the image source
			setImageSrc1(imageSrc1); // Set the image source			setImageSrc(imageSrc); // Set the image source
			setImageSrc2(imageSrc2); // Set the image source
			setImageSrc3(imageSrc3); // Set the image source
			setImageSrc4(imageSrc4); // Set the image source
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
				{imageSrc && <img src={imageSrc} alt="Fetched" />}
				{imageSrc1 && <img src={imageSrc1} alt="Fetched" />} {imageSrc2 && <img src={imageSrc2} alt="Fetched" />}
				{imageSrc3 && <img src={imageSrc3} alt="Fetched" />} {imageSrc4 && <img src={imageSrc4} alt="Fetched" />}
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
