import type { Metadata } from 'next';

import julio from '@/assets/julio-bonifacio.webp';
import { JsonLd } from '@/components/ui/JsonLd';
import { routes, sections } from '@/config/routes';
import { site } from '@/content/site';
import { About } from '@/features/home/about/About';
import { Bento } from '@/features/home/bento/Bento';
import { Contact } from '@/features/home/contact/Contact';
import { Hero } from '@/features/home/hero/Hero';
import { Marquee } from '@/features/home/marquee/Marquee';
import { ProjectsReel } from '@/features/home/reel/ProjectsReel';
import { Showcase } from '@/features/home/showcase/Showcase';
import { pageMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ description: site.description, path: routes.home });

export default function HomePage() {
  return (
    <>
      <main>
        {/* La portada se queda fija y la vitrina oscura sube encima como un panel. El ancla de "inicio"
            va aquí y no en la portada: al ser sticky, el navegador no subiría hasta arriba del todo */}
        <div id={sections.top}>
          <Hero />
          <Showcase />
        </div>
        <Bento />
        <ProjectsReel />
        <About />
        <Marquee />
        <Contact />
      </main>
      <JsonLd data={personJsonLd(julio.src)} />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
