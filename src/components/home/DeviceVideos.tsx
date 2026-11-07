'use client';

import { useEffect, useRef } from 'react';

const CAMILA_URL = 'https://camilai.com';

/**
 * PC y celular con los videos de Camila AI (hechos con Remotion en C:\dev\video-camila).
 * - Cada video (~1,5 MB) se descarga recién cuando la vitrina entra en pantalla; antes se ve su
 *   portada (el primer cuadro), así la página carga rápido aunque nadie llegue a la vitrina.
 * - Solo se reproducen mientras se ven (ahorra batería) y van sincronizados: duran lo mismo,
 *   el del PC manda y el del celular lo sigue.
 * - Con "reducir movimiento" no se descargan: queda la portada quieta.
 */
export function DeviceVideos() {
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
    <div className="devices" ref={groupRef}>
      <div className="laptop">
        <div className="laptop-screen">
          <video
            ref={pcRef}
            className="screen-video"
            data-src="/videos/camila-pc.mp4"
            poster="/videos/camila-pc-poster.webp"
            muted
            loop
            playsInline
            preload="none"
            aria-label="Demo de Camila AI: inicio de sesión, panel, chat y reportes"
          />
          {/* Clic en la pantalla abre Camila AI (el botón de abajo es el enlace accesible) */}
          <a
            className="screen-link"
            href={CAMILA_URL}
            target="_blank"
            rel="noopener"
            tabIndex={-1}
            aria-hidden="true"
            title="Abrir Camila AI"
          />
        </div>
        <div className="laptop-base" />
      </div>

      <div className="phone">
        <span className="island" />
        <video
          ref={phoneRef}
          className="screen-video"
          data-src="/videos/camila-movil.mp4"
          poster="/videos/camila-movil-poster.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-label="Demo de Camila AI en celular: chat, llamada y contenido"
        />
        <a
          className="screen-link"
          href={CAMILA_URL}
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
