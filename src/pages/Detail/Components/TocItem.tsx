import styled from "styled-components";
import PlayIcon from "@/assets/play.svg?react";
import { formatTimeRange } from "@/utils/formatter";
import DimmedArea from "./DimmedArea";
import { forwardRef } from "react";
import captureImage from "/src/assets/captured_frame_cO0KnvxUnvM_1.png";

interface TocItemProps {
	title: string;
	start: number;
	summary: string;
	dimmed?: boolean;
	onClick: () => void;
}

const TocItem = forwardRef<HTMLDivElement, TocItemProps>(({ title, start, summary, dimmed, onClick }, ref) => {
	const formatSummary = (summary: string) => {
		// 소수점을 포함한 숫자를 예외 처리하는 정규 표현식
		const regex = /(?<!\d\.\d)\. /g;
		return summary
			.split(regex)
			.filter((sentence) => sentence.trim() !== "")
			.map((sentence, index, array) => (
				<span key={index} className="line-break">
					{sentence.trim()}
					{index !== array.length - 1 ? "." : ""}
				</span>
			));
	};

	return (
		<Container ref={ref}>
			<ContentWrapper dimmed={dimmed}>
				<Title>{title}</Title>
				<Thumbnail>
					<FloatingPlayIcon onClick={onClick} />
					<ThumbnailImg src={captureImage} />
				</Thumbnail>
				<Timeline>
					<PlayIcon width={16} height={16} />
					<span>{formatTimeRange(start)}</span>
				</Timeline>
				<Summary>{formatSummary(summary)}</Summary>
			</ContentWrapper>
			{dimmed && <DimmedArea />}
		</Container>
	);
});

export default TocItem;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-top: 60px;
`;

const ContentWrapper = styled.div<{ dimmed?: boolean }>`
	opacity: ${(props) => (props.dimmed ? 0.8 : 1)};
`;

const Title = styled.span`
	font-size: 24px;
	font-weight: 600;
	line-height: 140%;
`;

const Thumbnail = styled.div`
	height: 196px;
	/* padding: 42px 0px 41px 0px; */
	background: rgba(217, 217, 217, 1);
	margin-top: 12px;
	margin-bottom: 8px;
	display: flex;
	position: relative;
	/* justify-content: center; */
`;

const FloatingPlayIcon = styled(PlayIcon)`
	position: absolute;
	top: 40%;
	left: 38%;
	width: 48px;
	height: 48px;
`;

const ThumbnailImg = styled.img`
	height: 196px;
`;

const Timeline = styled.div`
	display: flex;
	align-items: center;
	height: 18px;
	gap: 12px;
	margin-bottom: 24px;

	span {
		font-size: 14px;
		font-weight: 500;
		line-height: 16.71px;
	}
`;

const Summary = styled.div`
	font-size: 18px;
	font-weight: 400;
	line-height: 168%;
	margin-left: 8px;
	span {
		display: block;
	}
	span.line-break {
		font-weight: 400;
		line-height: 168%;
		margin-bottom: 12px; /* 각 문장 간의 간격을 조절 */
	}
`;
