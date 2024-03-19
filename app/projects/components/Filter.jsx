import { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { useStoreContext } from 'store/provider'
import { FilterDropDown } from "./FilterDropDown";
import { SegmentedControl } from '@mantine/core';

export function Filter() {
	const { profile, setFilterType, filterType } = useStoreContext();
	const animRef = useRef(null);
	const isInView = useInView(animRef, { once: true });

	const dropDownData = profile && profile.technologies.map(tech => {
		return {
			group: tech.category,
			items: tech.items.map(item => ({ 
				value: item.item_name, label: item.item_name, icon: item.icon
			}))
		}
	}) || []

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
				
				<div className="flex items-center gap-2">
					<FilterDropDown
						data={dropDownData}
						comboboxProps={{ shadow: 'lg', transitionProps: { transition: 'scale-y', duration: 200 } }}
						nothingFoundMessage="Technology or tool not found"
						placeholder="Search tech or tools"
					/>
				</div>
			</div>
		</LazyMotion>
	);
}
