import { marquee } from '@/content/home';

/** Letras gigantes que se deslizan con el scroll (HomeScenes) */
export function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track" data-marquee>
        <span>{marquee.word}</span>
        <span className="star">✳</span>
        <span className="grad">{marquee.word}</span>
        <span className="star">✳</span>
        <span>{marquee.word}</span>
      </div>
    </section>
  );
}
