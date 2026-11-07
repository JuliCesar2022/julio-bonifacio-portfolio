'use client';

import { Fragment, useEffect, useState } from 'react';

import { StarText } from '@/components/ui/StarText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Line = { text: string; className: string };

const STEP_MS = 220;

/**
 * Título que aparece palabra por palabra, con ✳ en el lugar de la palabra que viene.
 * El texto completo invisible (.ghost) reserva el espacio para que nada salte, y el aria-label
 * da la frase completa a lectores de pantalla y buscadores.
 */
export function TypedTitle({ label, lines }: { label: string; lines: Line[] }) {
  const words = lines.flatMap((line, li) => line.text.split(' ').map((text) => ({ text, li })));
  const reduceMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const shown = reduceMotion ? words.length : step;

  // Una palabra más cada STEP_MS hasta completar la frase
  useEffect(() => {
    if (reduceMotion || step >= words.length) return;
    const timer = setTimeout(() => setStep((current) => current + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [reduceMotion, step, words.length]);

  return (
    <h1 className="hero-title" aria-label={label}>
      {lines.map((line, li) => {
        const typed = words
          .map((word, i) => ({ ...word, i }))
          .filter((word) => word.li === li && word.i <= shown);
        return (
          <span key={li} className={`line ${line.className}`} aria-hidden="true">
            <span className="ghost">
              <StarText text={line.text} />
            </span>
            <span className="typed">
              {typed.map((word, k) => (
                <Fragment key={word.i}>
                  {k > 0 && ' '}
                  {word.i < shown ? (
                    <StarText text={word.text} />
                  ) : (
                    <span className="ph">{'✳'.repeat(Math.min(3, word.text.length))}</span>
                  )}
                </Fragment>
              ))}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
