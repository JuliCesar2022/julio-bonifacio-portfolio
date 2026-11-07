import { site } from '@/content/site';

export function Logo({ href }: { href: string }) {
  return (
    <a className="logo" href={href}>
      <span className="logo-star" aria-hidden="true">
        ✳
      </span>{' '}
      {site.name}
    </a>
  );
}
