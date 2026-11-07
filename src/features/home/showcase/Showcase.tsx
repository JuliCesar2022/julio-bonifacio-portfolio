import { Fragment } from 'react';

import { CurvedArrow } from '@/components/ui/icons';
import { showcase } from '@/content/home';

import { DeviceVideos } from './DeviceVideos';

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
    <section className="showcase" aria-labelledby="showcase-title">
      <div className="showcase-inner">
        <div className="showcase-side showcase-left">
          <h2 className="showcase-text" id="showcase-title">
            <span className="light">
              <Lines lines={left.lines} />
            </span>
            <br />
            {left.bold}
          </h2>
          <CurvedArrow />
        </div>

        <DeviceVideos videos={showcase.videos} href={cta.href} />

        <div className="showcase-side showcase-right">
          <h2 className="showcase-text">
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
          <CurvedArrow />
        </div>

        <div className="showcase-cta">
          <a className="btn btn-light" href={cta.href} target="_blank" rel="noopener">
            {cta.label} <span aria-hidden="true">↗</span>
          </a>
          <p>{note}</p>
        </div>
      </div>
    </section>
  );
}
