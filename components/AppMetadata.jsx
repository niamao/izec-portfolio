const author = "Neo";
const description =
	"I'm a Web Developer based in the Philippines. Working towards creating web applications that make life easier.";
const url = "https://izec.vercel.app/";
export const AppMetadata = {
	metadataBase: new URL("https://izec.vercel.app/"),
	title: {
		default: `${author} | Portfolio`,
		template: `%s | ${author}`
	},
	description: description,
	icons: {
		icon: "/closing_tag.png"
	},
	keywords: [
		"Neo Isaac Amao",
		"Neo Isaac Amao - software developer",
		"Frontend developer",
		"ReactJS/NextJS/VueJS developer",
		"Portfolio website",
		"Frontend Developer Portfolio"
	],
	creator: author,
	authors: [{ name: author, url: url }],
	openGraph: {
		title: `${author} | Portfolio`,
		description: description,
		url: url,
		siteName: `${author} | Portfolio`,
		images: [
			{
				url: "https://izec.vercel.app/screenshot.webp",
				width: 800,
				height: 600,
				alt: "My personal portfolio website"
			},
			{
				url: "https://izec.vercel.app/screenshot.webp",
				width: 1800,
				height: 1600,
				alt: "My personal portfolio website"
			}
		],
		locale: "en-US",
		type: "website"
	}
};
