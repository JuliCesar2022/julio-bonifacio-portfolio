'use client';

import { useEffect, useRef } from 'react';

import styles from './showcase.module.css';

type Video = { src: string; poster: string; label: string };
type Props = { videos: { desktop: Video; phone: Video }; href: string };

/**
 * PC y celular con los videos de Camila AI (hechos con Remotion en C:\dev\video-camila).
 * - Cada video (~1,5 MB) se descarga recién cuando la vitrina entra en pantalla; antes se ve su
 *   portada (el primer cuadro), así la página carga rápido aunque nadie llegue a la vitrina.
 * - Solo se reproducen mientras se ven (ahorra batería) y van sincronizados: duran lo mismo,
 *   el del PC manda y el del celular lo sigue.
 * - Con "reducir movimiento" no se descargan: queda la portada quieta.
 */
export function DeviceVideos({ videos: { desktop, phone }, href }: Props) {
  const groupRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    const lead = pcRef.current;
    const follower = phoneRef.current;
    if (!group || !lead || !follower || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const videos = [lead, follower];

    const sync = () => {
      if (Math.abs(follower.currentTime - lead.currentTime) > 0.2) follower.currentTime = lead.currentTime;
    };
    lead.addEventListener('timeupdate', sync);

    const observer = new IntersectionObserver(([entry]) => {
      videos.forEach((video) => {
        if (!entry.isIntersecting) return video.pause();
        if (!video.getAttribute('src') && video.dataset.src) {
          video.muted = true; // requisito del navegador para reproducir solo
          video.src = video.dataset.src;
        }
        video.play().catch(() => {});
      });
    });
    observer.observe(group);

    return () => {
      lead.removeEventListener('timeupdate', sync);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.devices} ref={groupRef} data-anim="devices">
      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <video
            ref={pcRef}
            className={styles.screenVideo}
            data-src={desktop.src}
            poster={desktop.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={desktop.label}
          />
          {/* Clic en la pantalla abre Camila AI (el botón de abajo es el enlace accesible) */}
          <a
            className={styles.screenLink}
            href={href}
            target="_blank"
            rel="noopener"
            tabIndex={-1}
            aria-hidden="true"
            title="Abrir Camila AI"
          />
        </div>
        <div className={styles.laptopBase} />
      </div>

      <div className={styles.phone} data-anim="phone">
        <span className={styles.island} />
        <video
          ref={phoneRef}
          className={styles.screenVideo}
          data-src={phone.src}
          poster={phone.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={phone.label}
        />
        <a
          className={styles.screenLink}
          href={href}
          target="_blank"
          rel="noopener"
          tabIndex={-1}
          aria-hidden="true"
          title="Abrir Camila AI"
        />
      </div>
    </div>
  );
}
