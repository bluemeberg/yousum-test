const React = require("react");
const { renderToString } = require("react-dom/server");
const { Helmet } = require("react-helmet");
const fs = require("fs");
const path = require("path");

// Import your Detail page component
const DetailPage = require("../src/pages/Detail/index.tsx").default;

module.exports = async (req, res) => {
	const context = {};

	// Simulate fetching data for the detail page
	const detailData = {
		title: "Sample Title",
		short_summary: "This is a sample summary for the page.",
		thumbnail: "https://example.com/sample-thumbnail.jpg",
	};

	// Render the DetailPage with the data
	const appHtml = renderToString(React.createElement(DetailPage, { detailData, context }));

	const helmet = Helmet.renderStatic();

	// Load the HTML template
	const indexFile = path.resolve("./index.html");

	fs.readFile(indexFile, "utf8", (err, data) => {
		if (err) {
			console.error("Something went wrong:", err);
			return res.status(500).send("Internal Server Error");
		}

		// Inject the rendered app and Helmet tags into the HTML
		return res.send(
			data
				.replace("<title></title>", helmet.title.toString())
				.replace('<meta name="description" content=""/>', helmet.meta.toString())
				.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
		);
	});
};
