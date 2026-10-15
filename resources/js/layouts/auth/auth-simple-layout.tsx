import { Link } from '@inertiajs/react';
import { BrandLogo } from '@/components/brand-logo';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

// Real customers and backers from scaleupmap.com, files in public/brand/logos.
// scale lifts PNGs that ship with transparent padding so every mark reads at the same optical size.
const TRUSTED_BY: { name: string; file: string; scale?: number }[] = [
    { name: 'Nanostics Precision Health', file: 'nanostics.png', scale: 1.8 },
    { name: 'University of Alberta', file: 'university-of-alberta.png' },
    { name: 'niaHealth', file: 'niahealth.png', scale: 1.3 },
    { name: 'UA Innovation Fund', file: 'ua-innovation-fund.png' },
    { name: 'FireSafe', file: 'firesafe.png', scale: 1.4 },
    { name: '2S Water', file: '2s-water.png', scale: 1.6 },
    { name: 'HonestDoor', file: 'honestdoor.png', scale: 1.6 },
    { name: 'ScaleGood Fund', file: 'scalegood-fund.png', scale: 1.4 },
    { name: 'Platform Calgary', file: 'platform-calgary.png' },
];

const LOGO_HEIGHT_PX = 56;

/** Sign-up and sign-in frame: form column on the left, trusted-by wall on a navy tint on the right. */
export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
            <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-20 lg:py-12">
                <Link href={home()} className="w-fit rounded-md">
                    <BrandLogo className="h-8" />
                </Link>
                <div className="mt-14 w-full max-w-md lg:mt-20">
                    <h1 className="text-3xl leading-tight font-medium tracking-[-0.02em] text-balance">
                        {title}
                    </h1>
                    <p className="mt-3 text-muted-foreground">{description}</p>
                    <div className="mt-10">{children}</div>
                </div>
            </div>
            <aside
                aria-label="Founders and funds on ScaleupMap"
                className="hidden flex-col items-center justify-center bg-dot-grid bg-navy-3 px-12 lg:flex"
            >
                <p className="text-sm font-medium">
                    Founders and funds already on ScaleupMap
                </p>
                <ul className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-px border border-navy-6 bg-navy-6">
                    {TRUSTED_BY.map((logo) => (
                        <li
                            key={logo.file}
                            className="flex h-32 items-center justify-center bg-background px-6"
                        >
                            <img
                                src={'/brand/logos/' + logo.file}
                                alt={logo.name}
                                loading="lazy"
                                style={{
                                    height: LOGO_HEIGHT_PX * (logo.scale ?? 1),
                                }}
                                className="w-auto max-w-full opacity-80 grayscale dark:invert"
                            />
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
