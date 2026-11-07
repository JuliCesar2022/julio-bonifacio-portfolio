/** Letras gigantes que se deslizan con el scroll (HomeScenes) */
export function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track" data-marquee>
        <span>Hablemos</span>
        <span className="star">✳</span>
        <span className="grad">Hablemos</span>
        <span className="star">✳</span>
        <span>Hablemos</span>
      </div>
    </section>
  );
}
