import type { Metadata } from 'next';

import { sections } from '@/config/routes';
import { notFoundPage } from '@/content/pages';

export const metadata: Metadata = {
  // Next agrega solo el noindex a esta página
  title: notFoundPage.title,
};

export default function NotFound() {
  return (
    <main className="story">
      <header className="story-hero" id={sections.top}>
        <p className="eyebrow">{notFoundPage.eyebrow}</p>
        <h1 className="story-title">
          <span className="light">{notFoundPage.heading.light}</span>
          <br />
          {notFoundPage.heading.bold}
        </h1>
        <p className="story-lead">{notFoundPage.lead}</p>
        <div className="contact-actions">
          <a className="mail" href={notFoundPage.cta.href}>
            {notFoundPage.cta.label} <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>
    </main>
  );
}
