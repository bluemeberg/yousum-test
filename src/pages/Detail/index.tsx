import React from "react";
import Helmet from "react-helmet";

interface DetailData {
	title: string;
	short_summary: string;
	thumbnail: string;
}

const DetailPage = ({ detailData }: { detailData: DetailData }) => {
	return (
		<div>
			{detailData && (
				<Helmet>
					<title>{detailData.title}</title>
					<meta property="og:title" content={detailData.title} />
					<meta property="og:description" content={detailData.short_summary} />
					<meta property="og:image" content={detailData.thumbnail} />
				</Helmet>
			)}
			<h1>{detailData.title}</h1>
			<p>{detailData.short_summary}</p>
			<img src={detailData.thumbnail} alt={detailData.title} />
		</div>
	);
};

export default DetailPage;
