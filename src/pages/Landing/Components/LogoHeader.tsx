import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import BackIcon from "@/assets/back.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
// import { auth, signOut } from "@/firebase";

interface LogoHeaderProps {
	title?: string;
}

const LogoHeader = ({ title }: LogoHeaderProps) => {
	const user = useRecoilValue(userState);
	const setUser = useSetRecoilState(userState);
	const navigate = useNavigate();
	const location = useLocation();
	const isDetailPage = location.pathname.includes("/detail");

	const goBack = () => {
		navigate(-1);
	};

	const goHome = () => {
		navigate("/");
	};

	const logOut = async () => {
		try {
			await signOut(auth);
			setUser({
				name: "",
				email: "",
				picture: "",
			});
		} catch (e) {
			console.error("Error loggin out: ", e);
		}
	};

	return (
		<Container $isDetailPage={isDetailPage}>
			{isDetailPage && <BackIcon onClick={goBack} />}
			<span onClick={goHome} className="logo">
				CLAYING
			</span>
			{title && <Title>{title}</Title>}
			{user.picture !== "" && (
				<ProfileImage onClick={logOut}>
					{user.picture !== "" && <img src={user.picture} alt="User profile" />}
				</ProfileImage>
			)}
		</Container>
	);
};
export default LogoHeader;

const Container = styled.header<{ $isDetailPage: boolean }>`
	width: 100%;
	height: 52px;
	padding: 0 20px;
	position: fixed;
	top: 0;
	max-width: 360px;
	background-color: ${(props) => (props.$isDetailPage ? "rgba(244, 244, 244, 1)" : "rgba(0, 123, 255, 1)")};
	font-family: "Pretendard Variable";

	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1000;

	.logo {
		color: ${(props) => (props.$isDetailPage ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)")};
	}
`;

const Title = styled.span`
	font-size: 16px;
	font-weight: 400;
	line-height: 19.09px;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 60%;
`;

const ProfileImage = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
	}
`;
