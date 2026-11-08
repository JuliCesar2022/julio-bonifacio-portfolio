import type { Metadata } from 'next';
import Image from 'next/image';

import { JsonLd } from '@/components/ui/JsonLd';
import { routes } from '@/config/routes';
import { storyChapters, storyCover, storyEnd, storyHero, storySeo } from '@/content/story';
import { PageEnd } from '@/features/page/PageEnd';
import { PageHero } from '@/features/page/PageHero';
import page from '@/features/page/page.module.css';
import { StoryChapter } from '@/features/story/StoryChapter';
import story from '@/features/story/story.module.css';
import { cx } from '@/lib/cx';
import { pageMetadata, profilePageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ ...storySeo, path: routes.story });

// Mi historia: el contenido está en src/content/story.ts
export default function HistoriaPage() {
  return (
    <main className={page.main}>
      <PageHero hero={storyHero} />

      <figure className={cx(story.cover, 'reveal')}>
        <Image src={storyCover.image} alt={storyCover.alt} sizes="(max-width: 1120px) 92vw, 1030px" preload />
        <figcaption>{storyCover.caption}</figcaption>
      </figure>

      {storyChapters.map((chapter) => (
        <StoryChapter key={chapter.step} chapter={chapter} />
      ))}

      <PageEnd end={storyEnd} />

      <JsonLd data={profilePageJsonLd(routes.story)} />
    </main>
  );
}
