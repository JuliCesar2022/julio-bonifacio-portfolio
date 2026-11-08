import { Fragment } from 'react';

import { CurvedArrow } from '@/components/ui/icons';
import { showcase } from '@/content/home';

import { DeviceVideos } from './DeviceVideos';
import styles from './showcase.module.css';
import { ShowcaseScene } from './ShowcaseScene';

/** Líneas delgadas una debajo de otra y la última en negrita */
function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** Vitrina oscura: Camila AI en PC y celular, con enlace para probarla */
export function Showcase() {
  const { left, right, cta, note } = showcase;
  return (
    <ShowcaseScene className={styles.showcase} aria-labelledby="showcase-title">
      <div className={styles.inner}>
        <div data-anim="left">
          <h2 className={styles.text} id="showcase-title">
            <span className="light">
              <Lines lines={left.lines} />
            </span>
            <br />
            {left.bold}
          </h2>
          <CurvedArrow className={styles.arrow} />
        </div>

        <DeviceVideos videos={showcase.videos} href={cta.href} />

        <div className={styles.right} data-anim="right">
          <h2 className={styles.text}>
            <span className="star" aria-hidden="true">
              ✳
            </span>
            <br />
            <span className="light">
              <Lines lines={right.lines} />
            </span>
            <br />
            {right.bold}
          </h2>
          <CurvedArrow className={styles.arrow} />
        </div>

        <div className={styles.cta}>
          <a className="btn btn-light" href={cta.href} target="_blank" rel="noopener">
            {cta.label} <span aria-hidden="true">↗</span>
          </a>
          <p>{note}</p>
        </div>
      </div>
    </ShowcaseScene>
  );
}
