import { CurvedArrow } from '@/components/ui/icons';

import { DeviceVideos } from './DeviceVideos';

/** Vitrina oscura: Camila AI en PC y celular, con enlace para probarla */
export function Showcase() {
  return (
    <section className="showcase" aria-labelledby="showcase-title">
      <div className="showcase-inner">
        <div className="showcase-side showcase-left">
          <h2 className="showcase-text" id="showcase-title">
            <span className="light">
              Mira
              <br />
              mi
            </span>
            <br />
            trabajo
          </h2>
          <CurvedArrow />
        </div>

        <DeviceVideos />

        <div className="showcase-side showcase-right">
          <h2 className="showcase-text">
            <span className="star" aria-hidden="true">
              ✳
            </span>
            <br />
            <span className="light">hecho para</span>
            <br />
            web y móvil
          </h2>
          <CurvedArrow />
        </div>

        <div className="showcase-cta">
          <a className="btn btn-light" href="https://camilai.com" target="_blank" rel="noopener">
            Probar Camila AI <span aria-hidden="true">↗</span>
          </a>
          <p>Puedes probarla sin registrarte.</p>
        </div>
      </div>
    </section>
  );
}
