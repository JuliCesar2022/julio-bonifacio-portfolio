import type { Metadata } from 'next';
import Image from 'next/image';

import { StoryChapter } from '@/components/story/StoryChapter';
import { StoryEnd } from '@/components/story/StoryEnd';
import { StoryHero } from '@/components/story/StoryHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { routes } from '@/config/routes';
import { storyChapters, storyCover, storyEnd, storyHero, storySeo } from '@/content/story';
import { pageMetadata, profilePageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ ...storySeo, path: routes.story });

// Mi historia: el contenido está en src/content/story.ts
export default function HistoriaPage() {
  return (
    <main className="story">
      <StoryHero hero={storyHero} />

      <figure className="story-cover reveal">
        <Image src={storyCover.image} alt={storyCover.alt} sizes="(max-width: 1120px) 92vw, 1030px" preload />
        <figcaption>{storyCover.caption}</figcaption>
      </figure>

      {storyChapters.map((chapter) => (
        <StoryChapter key={chapter.step} chapter={chapter} />
      ))}

      <StoryEnd end={storyEnd} />

      <JsonLd data={profilePageJsonLd(routes.story)} />
    </main>
  );
}
