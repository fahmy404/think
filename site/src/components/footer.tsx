import Link from 'next/link';
import Image from 'next/image';
import { footerNav, site } from '@/content/site';
import { services } from '@/content/services';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Image
              src="/brand/think-agency.png"
              alt="THINK Agency"
              width={1432}
              height={363}
              sizes="(min-width: 900px) 520px, 90vw"
              loading="lazy"
            />
            <p>{site.positioning}</p>
          </div>

          <div className="footer__cols">
            <div>
              <h4>Navigate</h4>
              <ul>
                {footerNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="ulink">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="ulink">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <Link href="/contact" className="ulink">Tell us about your event</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <span>
            &copy; {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
