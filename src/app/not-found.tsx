import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Next agrega solo el noindex a esta página
  title: 'Página no encontrada',
};

export default function NotFound() {
  return (
    <main className="story">
      <header className="story-hero" id="inicio">
        <p className="eyebrow">Error 404</p>
        <h1 className="story-title">
          <span className="light">Esta página</span>
          <br />
          no existe
        </h1>
        <p className="story-lead">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
        <div className="contact-actions">
          <a className="mail" href="/">
            Ir al inicio <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>
    </main>
  );
}
