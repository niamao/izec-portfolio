"use client";

import { Logo, Menu, MobileMenu, ThemeSwitcher } from "components";
import { useMediaQuery } from "utils";

export function AppHeader() {
	const isMobile = useMediaQuery();

	return (
		<header className="pt-5 pb-5 sticky top-0 z-10 bg-inherit shadow-sm">
			<div className="container-md">
				<div className="flex justify-between items-center gap-3">
					<Logo />
					<div className="flex items-center gap-5">
						{isMobile ? <MobileMenu /> : (
							<>
								<Menu />
								<span className="md:ml-4 md:mt-1">
									<ThemeSwitcher />
								</span>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
