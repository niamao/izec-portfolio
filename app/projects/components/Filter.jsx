import { useRef, useState } from "react";
import {
	LazyMotion,
	domAnimation,
	useInView,
	m,
	AnimatePresence
} from "framer-motion";
import {
	animate,
	animateMobile,
	exit,
	exitMobile,
	initial,
	initialMobile,
	transition,
	useMediaQuery
} from "utils";
import { useStoreContext } from 'store/provider'
import { FilterDropDown } from "./FilterDropDown";
import { SegmentedControl } from '@mantine/core';
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

export function Filter() {
	const { profile, setFilterType, filterType } = useStoreContext();
	const animRef = useRef(null);
	const isInView = useInView(animRef, { once: true });
	const isMobile = useMediaQuery();
	let [isOpen, setIsOpen] = useState(false);

	const onClose = () => setIsOpen(false);
	const onOpen = () => setIsOpen(true);

	const dropDownData = profile && profile.technologies.map(tech => {
		return {
			group: tech.category,
			items: tech.items.map(item => ({ 
				value: item.item_name, label: item.item_name, icon: item.icon
			}))
		}
	}) || []

	const FilterType = () => (
		<div className="flex flex-row items-center space-x-3">
		   <h3 aria-label="Filter projects" tabIndex="0" className="font-bold text-xl">
			   Filter: 
		   </h3>
		   <SegmentedControl
			   value={filterType}
			   onChange={setFilterType}
			   data={[
				   { label: 'Strict', value: 'all' },
				   { label: 'Any', value: 'some' }
			   ]}
		   />
		</div>
	)

	return (
		<LazyMotion features={domAnimation}>
			<div
				ref={animRef}
				className="flex items-start flex-col sm:flex-row sm:items-center gap-2 my-10"
				style={{
					opacity: isInView ? 1 : 0,
					transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
				}}
			>
				<div className="flex flex-row items-center space-x-3">
					<FilterType />
					{isMobile && (
						<LazyMotion features={domAnimation}>
							<m.button
								className="p-2"
								onClick={onOpen}
								title="Open menu"
								initial={initial}
								animate={animate}
								exit={exit}
								transition={transition}
							>
								<CiSearch size={25} />
							</m.button>

							<AnimatePresence>
								{isOpen && (
									<m.div
										className={`backdrop-blur-md fixed left-0 right-0 top-0 min-h-screen ml-0 z-50`}
										initial={initialMobile}
										animate={animateMobile}
										exit={exitMobile}
										style={{ marginLeft: 0 }}
									>
										<header className="p-6 flex items-center justify-between border-b border-b-brand-light z-10">
											<FilterType />
											<button
												onClick={onClose}
												className="w-10 h-10 inline-flex items-center justify-center"
											>
												<IoMdClose size="24" />
											</button>
										</header>
										<div className="px-1 py-1">
											<FilterDropDown
												data={dropDownData}
												comboboxProps={{ shadow: 'lg', transitionProps: { transition: 'scale-y', duration: 200 } }}
												nothingFoundMessage="Technology or tool not found"
												placeholder="Search tech or tools"
												keepOpen
											/>
										</div>
									</m.div>
								)}
							</AnimatePresence>
						</LazyMotion>
					)}
				</div>
				
				<div className="flex items-center gap-2">
					{!isMobile && (
						<FilterDropDown
							data={dropDownData}
							comboboxProps={{ shadow: 'lg', transitionProps: { transition: 'scale-y', duration: 200 } }}
							nothingFoundMessage="Technology or tool not found"
							placeholder="Search tech or tools"
						/>
					)}
				</div>
			</div>
		</LazyMotion>
	);
}

