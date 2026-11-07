import type { Metadata } from 'next';

import julio from '@/assets/julio-bonifacio.webp';
import { About } from '@/components/home/About';
import { Bento } from '@/components/home/Bento';
import { Contact } from '@/components/home/Contact';
import { Hero } from '@/components/home/Hero';
import { HomeScenes } from '@/components/home/HomeScenes';
import { Marquee } from '@/components/home/Marquee';
import { Showcase } from '@/components/home/Showcase';
import { JsonLd } from '@/components/ui/JsonLd';
import { site } from '@/content/site';
import { pageMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ description: site.description, path: '/' });

export default function HomePage() {
  return (
    <>
      <main>
        {/* La portada se queda fija y la vitrina oscura sube encima como un panel */}
        <div className="intro">
          <Hero />
          <Showcase />
        </div>
        <Bento />
        <About />
        <Marquee />
        <Contact />
      </main>
      <HomeScenes />
      <JsonLd data={personJsonLd(julio.src)} />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
