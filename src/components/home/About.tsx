import Image from 'next/image';

import julio from '@/assets/julio-bonifacio.webp';
import { gallery } from '@/content/gallery';
import { site } from '@/content/site';

import { Gallery } from './Gallery';

/** Sobre mí (sección oscura) con la galería de fotos */
export function About() {
  return (
    <section className="about" id="sobre-mi">
      <div className="about-inner">
        <h2 className="about-title">
          <span className="light">
            <span className="w">Un</span> <span className="w">poco</span>
          </span>
          <br />
          <span className="w">sobre</span> <span className="w">mí</span>
        </h2>
        <div className="about-card">
          <Image className="avatar" src={julio} alt={site.name} width={64} height={64} unoptimized />
          <p>
            Soy estudiante de Ingeniería de Sistemas en Cartagena y llevo más de dos años construyendo aplicaciones web
            de principio a fin. Me gusta crear cosas que la gente use de verdad: desde un juego que enseña blockchain
            hasta un asistente de bienestar emocional con inteligencia artificial, que presenté en el Encuentro Nacional
            de Semilleros de Investigación.
          </p>
          <dl className="facts">
            <div>
              <dt>Ubicación</dt>
              <dd>{site.city}</dd>
            </div>
            <div>
              <dt>Estudios</dt>
              <dd>{site.studies}</dd>
            </div>
            <div>
              <dt>Idiomas</dt>
              <dd>{site.languages}</dd>
            </div>
          </dl>
          <a className="btn btn-light about-more" href="/historia">
            Ver mi historia completa <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="gallery-head">
          <p className="eyebrow">En acción</p>
          <p className="gallery-note">Presentando proyectos, eventos y trabajo en equipo.</p>
        </div>
        <Gallery photos={gallery} />
      </div>
    </section>
  );
}
