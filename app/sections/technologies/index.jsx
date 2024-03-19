import { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { HeadingDivider, SVGComponent } from "components";
import { useStoreContext } from 'store/provider'
import { useMediaQuery } from "utils";

export function TechnologiesSection() {
  const { profile } = useStoreContext();
  const isMobile = useMediaQuery();
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true });

  let TECHNOLOGIES = [];

  if (profile && profile.technologies) {
    TECHNOLOGIES = profile.technologies.map((tech) => ({
      ...tech,
      items: tech.items.map((item) => ({
        name: item.item_name,
        icon: <SVGComponent svgString={item.icon} width={32} />,
      })),
    }));
  }

	const numColumns = Math.min(4, TECHNOLOGIES.length);

  return (
    <LazyMotion features={domAnimation}>
      <section id="tech" className="section">
        <HeadingDivider title="Technologies" />
        <p
          ref={textRef}
          tabIndex="0"
          className="my-5 text-2xl"
          style={{
            transform: isTextInView ? "none" : "translateX(-200px)",
            opacity: isTextInView ? 1 : 0,
            transition:
              "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          I work with the following technologies and tools:
        </p>

        {!!TECHNOLOGIES.length && (
          <div className="mt-10 grid gap-10" style={{ gridTemplateColumns: `repeat(${isMobile ? 1 : numColumns}, minmax(0, 1fr))` }}>
            {TECHNOLOGIES.map((tech, index) => (
              <TechStack key={tech.category} tech={tech} index={index} />
            ))}
          </div>
        )}
      </section>
    </LazyMotion>
  );
}
  
function TechStack({ tech, index }) {
	const stackRef = useRef(null);
	const isStackInView = useInView(stackRef, { once: true });
  
	return (
	  <div
		ref={stackRef}
		className="flex flex-col gap-4 flex-1 md:flex-auto"
		style={{
		  transform: isStackInView ? "none" : `${index === 0 ? "translateY(250px)" : `translateY(${200 / index}px)`}`,
		  opacity: isStackInView ? 1 : 0,
		  transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${index === 0 ? 0 : 0.5 * index}s`,
		}}
	  >
		<h3 tabIndex="0" className="text-2xl font-bold">
		  {tech.category}
		</h3>
		<div className="flex items-center flex-wrap gap-x-5 gap-y-8">
		  {tech.items.map((item) => (
			<div
				key={item.name}
				className="group relative flex flex-col items-center"
			>
				<span tabIndex="0" role="img">
					{item.icon}
				</span>
				<span
					className="pl-0 max-w-full group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity text-sm text-gray-800 dark:text-gray-100 rounded-md absolute left-1/2
					-translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max text-center"
				>
					{item.name}
				</span>
			</div>
		  ))}
		</div>
	  </div>
	);
}
  