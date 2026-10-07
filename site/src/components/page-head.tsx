import { Lines } from './motion';

export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string[];
  lede?: string;
}) {
  return (
    <header className="wrap phead">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h1">
        <Lines lines={title} />
      </h1>
      {lede && <p className="lede phead__lede">{lede}</p>}
    </header>
  );
}
