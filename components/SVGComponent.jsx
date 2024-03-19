"use client"

import { useTheme } from 'next-themes';

export const SVGComponent = ({ svgString, width }) => {
	if (typeof DOMParser !== 'undefined') {
	  const { theme, systemTheme } = useTheme();
	  const currentTheme =  theme === "system" ? systemTheme : theme;
	  const parser = new DOMParser();
	  const doc = parser.parseFromString(svgString, 'image/svg+xml');
	  const svgElement = doc.documentElement;
  
	  // Apply theme styles to the SVG
	  svgElement.style.fill = currentTheme === 'dark' ? '#fff' : '#000';
  
	  return (
		<div style={{ width }}>
		  <div dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }} />
		</div>
	  );
	}
  
	return null;
};