'use client';

import { useEffect, useState } from 'react';

interface HeaderBackgroundProps {
    images: string[];
    intervalMs?: number;
    onImageChange?: () => void;
}

export const HEADER_BG_INTERVAL_MS = 5000;

const HeaderBackground = ({
    images,
    intervalMs = HEADER_BG_INTERVAL_MS,
    onImageChange,
}: HeaderBackgroundProps): JSX.Element => {
    const fadeDurationMs = 1200;
    const [isReady, setIsReady] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const preloadImage = (src: string): Promise<void> =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = src;

                const done = (): void => {
                    resolve();
                };

                img.onload = done;
                img.onerror = done;

                if (img.complete) {
                    done();
                    return;
                }

                if (typeof img.decode === 'function') {
                    img.decode().then(done).catch(done);
                }
            });

        Promise.all(images.map((src) => preloadImage(src))).finally(
            () => {
                if (!cancelled) {
                    setIsReady(true);
                }
            },
        );

        return () => {
            cancelled = true;
        };
    }, [images]);

    useEffect(() => {
        if (!isReady || images.length <= 1 || isFading) {
            return;
        }

        const delayMs = Math.max(intervalMs - fadeDurationMs, 0);
        const timer = window.setTimeout(() => {
            setNextImageIndex((currentImageIndex + 1) % images.length);

            // Split into the next frame so the browser can commit the new
            // background image before opacity starts transitioning.
            window.requestAnimationFrame(() => {
                setIsFading(true);
            });
        }, delayMs);

        return () => {
            window.clearTimeout(timer);
        };
    }, [currentImageIndex, images.length, intervalMs, isFading, isReady]);

    useEffect(() => {
        if (!isFading || images.length <= 1) {
            return;
        }

        const finalizeFade = window.setTimeout(() => {
            setCurrentImageIndex(nextImageIndex);
            onImageChange?.();
            setIsFading(false);
        }, fadeDurationMs);

        return () => {
            window.clearTimeout(finalizeFade);
        };
    }, [fadeDurationMs, images.length, isFading, nextImageIndex, onImageChange]);

    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-black/70" />
                {images.length > 0 && (
                <img
                    src={images[currentImageIndex]}
                    alt=""
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 h-auto w-full min-h-full max-h-none -translate-x-1/2 -translate-y-1/2"
                />
                )}
                {images.length > 0 && (
                <img
                    src={images[nextImageIndex]}
                    alt=""
                    aria-hidden="true"
                    className={`absolute top-1/2 left-1/2 h-auto w-full min-h-full max-h-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[1200ms] ${
                        isFading ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                )}
            </div>
        </>
    );
};

export default HeaderBackground;
