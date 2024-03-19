"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useScrollTo } from "hooks";
import { BsArrowReturnLeft } from "react-icons/bs";
import { initial, animate, exit, transition, useMediaQuery } from "utils";
import { MENU_OPTIONS, SITE_ROUTES, SITE_STRINGS } from "../constants";
import { useStoreContext } from 'store/provider'
import { ThemeSwitcher } from "components";

export function Menu({ onClick = () => {} }) {
	let content, mainMenu, backMenu;
	const pathname = usePathname();
	const { setValue } = useStoreContext([]);
	const { scrollToEl } = useScrollTo();
	const isMobile = useMediaQuery();

	const sortAscending = (a, b) => a.id - b.id;

	const handleOnClick = (e) => {
		scrollToEl(e);
		window.setTimeout(() => onClick(), 350);
	};

	mainMenu = (
		<m.nav initial={initial} animate={animate} exit={exit} transition={transition} role="menu">
			<ul className="flex justify-center gap-5 flex-col md:flex-row items-start md:items-center">
				{MENU_OPTIONS.sort(sortAscending).map((menuItem) => (
					<li key={menuItem.id}>
						<a
							href={menuItem.url}
							title={menuItem.name}
							onClick={handleOnClick}
							className="relative text-xl hover:no-underline after:absolute after:left-0 after:-bottom-[3px] after:h-[2px] after:w-0 after:bg-current after:transition-width after:duration-300 after:ease-in-out hover:after:w-full"
						>
							{menuItem.name}
						</a>
					</li>
				))}
			</ul>
		</m.nav>
	);

	backMenu = (
		<m.div initial={initial} animate={animate} exit={exit} transition={transition}>
			<Link
				href={SITE_ROUTES.home}
				title={SITE_STRINGS.backToMainPageTitle}
				className="icon-link-btn"
				onClick={() => setValue([])}
			>
				<span>
					<BsArrowReturnLeft />
				</span>
				{SITE_STRINGS.backToMainText}
			</Link>
		</m.div>
	);

	content = pathname === SITE_ROUTES.projects ? backMenu : mainMenu;

	if (MENU_OPTIONS.length === 0) {
		return null;
	}

	return <LazyMotion features={domAnimation}>{content}</LazyMotion>;
}
