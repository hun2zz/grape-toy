'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP 기본 애니메이션 훅
 */
export function useGsapFadeIn(
    options: {
        y?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
) {
    const ref = useRef<HTMLDivElement>(null);
    const { y = 50, duration = 1, delay = 0, ease = 'power3.out' } = options;

    useEffect(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            { opacity: 0, y },
            { opacity: 1, y: 0, duration, delay, ease }
        );
    }, [y, duration, delay, ease]);

    return ref;
}

/**
 * ScrollTrigger 기반 애니메이션 훅
 */
export function useGsapScrollFadeIn(
    options: {
        y?: number;
        duration?: number;
        start?: string;
        ease?: string;
    } = {}
) {
    const ref = useRef<HTMLDivElement>(null);
    const { y = 60, duration = 1, start = 'top 80%', ease = 'power3.out' } = options;

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ref.current,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    ease,
                    scrollTrigger: {
                        trigger: ref.current,
                        start,
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [y, duration, start, ease]);

    return ref;
}

/**
 * Stagger 애니메이션 훅 (자식 요소들에 순차 적용)
 */
export function useGsapStagger(
    options: {
        y?: number;
        duration?: number;
        stagger?: number;
        start?: string;
    } = {}
) {
    const ref = useRef<HTMLDivElement>(null);
    const { y = 40, duration = 0.8, stagger = 0.15, start = 'top 85%' } = options;

    useEffect(() => {
        if (!ref.current) return;

        const children = ref.current.children;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                children,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start,
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [y, duration, stagger, start]);

    return ref;
}

/**
 * 패럴랙스 효과 훅
 */
export function useGsapParallax(speed: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                yPercent: -30 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return ref;
}
