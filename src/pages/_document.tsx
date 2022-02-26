import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { dom } from '@fortawesome/fontawesome-svg-core';

class MyDocument extends Document {
	public render() {
		return (
			<Html lang="en" prefix="og: https://ogp.me/ns#">
				<Head>
					{/* This fixes big icons with next-seo since CSS is somehow overwritten*/}
					<style>{dom.css()}</style>

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
				</Head>
				<body className="dark">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}

	public static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
}

export default MyDocument;
