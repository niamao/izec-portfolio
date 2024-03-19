"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { initial, animate, exit, transition } from "utils/motions";
import { BsFillEnvelopeOpenFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { useStoreContext } from 'store/provider'

export function ConnectMedia() {
	const { profile } = useStoreContext();

	const SOCIAL_MEDIA = [
		{
			id: "linkedin",
			icon: <BsLinkedin />,
			title: "Visit LinkedIn profile",
			url: profile?.linkedin || "https://linkedin.com/in/neo-isaac-amao" 
		},
		{
			id: "github",
			icon: <BsGithub />,
			title: "Visit Github profile",
			url: profile?.github || "https://github.com/niamao"
		},
		{
			id: "mail",
			icon: <BsFillEnvelopeOpenFill />,
			title: "Send me an email",
			url: profile?.email || "mailto://neoisaac.amao@gmail.com"
		}
	];

	return (
		<LazyMotion features={domAnimation}>
			<m.nav role="menu" initial={initial} animate={animate} exit={exit} transition={transition}>
				<ul className="flex items-center gap-5">
					{SOCIAL_MEDIA.map((item) => (
						<li key={item.id}>
							<a
								href={item.url}
								target="_blank"
								aria-label={item.title}
								title={item.title}
								className="text-2xl"
							>
								{item.icon}
							</a>
						</li>
					))}
				</ul>
			</m.nav>
		</LazyMotion>
	);
}
