import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

interface DetailData {
	title: string;
	short_summary: string;
	thumbnail: string;
}

const DetailPage = () => {
	const { id } = useParams();
	const [detailData, setDetailData] = useState<DetailData | null>(null);

	useEffect(() => {
		// 서버에서 데이터를 가져오는 함수
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/${id}`); // 클라이언트에서 서버로 데이터 요청
				const data = await response.json();
				setDetailData(data);
			} catch (error) {
				console.error("Error fetching detail data:", error);
			}
		};

		fetchData();
	}, [id]);

	if (!detailData) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Helmet>
				<title>{detailData.title}</title>
				<meta property="og:title" content={detailData.title} />
				<meta property="og:description" content={detailData.short_summary} />
				<meta property="og:image" content={detailData.thumbnail} />
			</Helmet>
			{/* 나머지 페이지 렌더링 */}
		</div>
	);
};

export default DetailPage;
