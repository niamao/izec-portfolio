"use client"

import { useTheme } from 'next-themes';

const withTheme = (WrappedComponent) => {
	return (props) => {
	  const { theme } = useTheme();
	  const themedProps = { ...props, theme };
  
	  return <WrappedComponent {...themedProps} />;
	};
};

export const SVGComponent = withTheme(({ svgString, width, theme }) => {
	if (typeof DOMParser !== 'undefined') {
	  const parser = new DOMParser();
	  const doc = parser.parseFromString(svgString, 'image/svg+xml');
	  const svgElement = doc.documentElement;
  
	  // Apply theme styles to the SVG
	  svgElement.style.fill = theme === 'dark' ? '#fff' : '#000';
  
	  return (
		<div style={{ width }}>
		  <div dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }} />
		</div>
	  );
	}
  
	return null;
});