"use client";

import { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, useInView } from 'framer-motion';
import { ConnectMedia, ScrollTop } from 'components';
import { useTheme } from 'next-themes';
import { cn } from 'utils';

export function AppFooter() {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true });
    const year = new Date().getFullYear();
    const author = 'Neo Isaac Amao';
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const footerLineColor = currentTheme === 'dark' ? '#fbf8f3' : '#64748b';
    const [scrollable, setScrollable] = useState(false);
	const [showScrollToTop, setScrollToTop] = useState(false)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const isScrollable = scrollHeight > clientHeight;
			const isShowScrollToTop = scrollHeight > (clientHeight * 2)

            setScrollable(isScrollable);
			setScrollToTop(isShowScrollToTop)
        };

        const observer = new ResizeObserver(entries => {
            // Callback function triggered when size changes are observed
            for (let entry of entries) {
                handleScroll();
            }
        });

        if (!loaded) {
            setLoaded(true);
        } else {
            observer.observe(document.body); // Observe changes in body height
            window.addEventListener('scroll', handleScroll);

            return () => {
                observer.disconnect();
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [loaded, setLoaded]);

    const footerClasses = cn(`
        container-md
        py-6
        mt-5 
        relative 
        before:absolute 
        before:top-0 
        before:left-4 
        before:right-4 
        before:h-[1px]
    `);

    const stickyFootertyle = !scrollable ? { position: 'absolute', bottom: 0, left: 0, right: 0 } : {};

    return (
        <>
            {showScrollToTop && (
                <div className="flex justify-center mb-6 pb-3">
                    <ScrollTop />
                </div>
            )}
            <LazyMotion features={domAnimation}>
                <footer
                    ref={footerRef}
                    className={footerClasses}
                    style={{
                        transform: isInView ? 'none' : 'translateX(-200px)',
                        opacity: isInView ? 1 : 0,
                        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s',
						...stickyFootertyle,
                    }}
                >
                    <style jsx>{`
                        footer:before {
                            content: '';
                            position: absolute;
                            top: 0;
                            height: 1px;
                            background-color: ${footerLineColor};
                        }
                    `}</style>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5">
                        <p className="font-light">Copyright &copy; {year} {author}</p>
                        <ConnectMedia />
                    </div>
                </footer>
            </LazyMotion>
        </>
    );
}

