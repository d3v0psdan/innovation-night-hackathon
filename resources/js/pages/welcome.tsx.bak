import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    CreditCard,
    FileText,
    Timer,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { BrandLogo } from '@/components/brand-logo';
import { dashboard, login, register } from '@/routes';

const PROOF = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: FileText, text: 'Only a deck or company doc needed' },
    { icon: Timer, text: 'First score in under 2 minutes' },
    { icon: Bank, text: 'Model built inside a VC fund' },
];

const STEPS = [
    {
        number: '1',
        label: 'Answer',
        title: 'Answer three questions',
        text: 'Where you are, what you need this month, and how big the team is.',
    },
    {
        number: '2',
        label: 'Score',
        title: 'Get your score and your gaps',
        text: 'The read a VC analyst would give you, with the three gaps that cost you the meeting.',
    },
    {
        number: '3',
        label: 'Close the gaps',
        title: 'Work the gaps, tool by tool',
        text: 'We send you to the one tool that closes the first gap: the memo, the investor directory, the journey map or a North Star Sprint. Then the next.',
    },
];

const OUTCOMES = [
    {
        title: 'A score',
        text: 'One number out of 100 that moves as your venture does. Six months from raising or walking into a meeting tomorrow, it reflects your current state, not a stale snapshot.',
    },
    {
        title: 'Gaps, named',
        text: 'The 11 red flags VCs look for, in team, traction, market and fundability. You see them before you walk into the room.',
    },
    {
        title: 'An investment memo',
        text: 'The memo and tearsheet investors ask for, written the way a fund analyst writes them, ready in 10 to 15 minutes. Includes the follow-up questions they will ask.',
    },
];

// Real customers and backers from scaleupmap.com. Files in public/brand/logos.
// scale lifts PNGs that ship with transparent padding so every mark reads at the same optical size.
const CUSTOMERS: { name: string; file: string; scale?: number }[] = [
    { name: 'Nanostics Precision Health', file: 'nanostics.png', scale: 1.8 },
    { name: 'University of Alberta', file: 'university-of-alberta.png' },
    { name: 'niaHealth', file: 'niahealth.png', scale: 1.3 },
    { name: 'UA Innovation Fund', file: 'ua-innovation-fund.png' },
    { name: 'FireSafe', file: 'firesafe.png', scale: 1.4 },
    { name: '2S Water', file: '2s-water.png', scale: 1.6 },
    { name: 'HonestDoor', file: 'honestdoor.png', scale: 1.6 },
    { name: 'ScaleGood Fund', file: 'scalegood-fund.png', scale: 1.4 },
    { name: 'Alberta Innovates', file: 'alberta-innovates.svg' },
    { name: 'NAIT', file: 'nait.png', scale: 1.1 },
    { name: 'Platform Calgary', file: 'platform-calgary.png' },
];

const BACKERS: { name: string; file: string; scale?: number }[] = [
    { name: 'Alberta Innovates', file: 'alberta-innovates.svg' },
    { name: 'Edmonton Unlimited', file: 'edmonton-unlimited.png' },
    {
        name: 'Microsoft for Startups',
        file: 'microsoft-for-startups.svg',
    },
    { name: 'Google for Startups', file: 'google-for-startups.png' },
];

const LOGO_IMAGE_CLASS =
    'w-auto opacity-80 grayscale transition-opacity duration-100 hover:opacity-100 dark:invert';

// Sample venture for the rendered product frame. Pure markup, so it never goes stale.
const GAP_SCORES = [
    { label: 'Team', points: 9, max: 15 },
    { label: 'Traction', points: 7, max: 20 },
    { label: 'Market', points: 11, max: 20 },
    { label: 'Fundability', points: 14, max: 20 },
];
const SAMPLE_SCORE = 72;

export default function Welcome() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();
    const score = useCountUp(SAMPLE_SCORE);

    return (
        <>
            <Head title="See your startup the way investors do" />
            <div className="min-h-screen bg-background text-foreground">
                <div className="mx-auto max-w-7xl border-x border-rule">
                    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-rule bg-background/80 px-6 backdrop-blur-sm">
                        <Link href="/" className="flex items-center rounded-md">
                            <BrandLogo mark className="size-8 sm:hidden" />
                            <BrandLogo className="hidden h-8 sm:block" />
                        </Link>
                        <nav
                            aria-label="Main"
                            className="flex items-center gap-5 text-[15px] font-medium"
                        >
                            <a
                                href="#how-it-works"
                                className="hidden transition-colors duration-100 hover:text-muted-foreground sm:inline"
                            >
                                How it works
                            </a>
                            <a
                                href="#investors"
                                className="hidden transition-colors duration-100 hover:text-muted-foreground sm:inline"
                            >
                                For investors
                            </a>
                            <AppearanceToggleTab compact />
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="btn-ink h-8"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="hidden transition-colors duration-100 hover:text-muted-foreground sm:inline"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="btn-ink h-8"
                                    >
                                        Score my startup free
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main>
                        <section className="grid lg:grid-cols-2 lg:divide-x lg:divide-rule">
                            <div className="flex flex-col justify-center px-6 py-16 lg:py-24 lg:pr-12">
                                <h1 className="enter text-4xl leading-none font-medium tracking-[-0.05em] text-balance enter-1 sm:text-5xl lg:text-6xl">
                                    See your startup the way investors do.
                                </h1>
                                <p className="mt-6 max-w-[34rem] enter text-lg text-muted-foreground enter-2">
                                    Built for first-time founders. Get the score
                                    a VC analyst would give you, see the gaps
                                    they would flag, and fix them before you
                                    pitch. First score in under 2 minutes.
                                </p>
                                <div className="mt-8 flex enter flex-wrap gap-4 enter-3">
                                    <Link href={cta} className="btn-ink h-10">
                                        Score my startup free
                                        <ArrowRight
                                            weight="bold"
                                            className="size-4"
                                        />
                                    </Link>
                                    <a
                                        href="#sample-score"
                                        className="btn-outline h-10"
                                    >
                                        See a sample score
                                    </a>
                                </div>
                                <p className="mt-6 enter text-sm text-muted-foreground enter-3">
                                    No credit card. Only a deck or company doc
                                    needed.
                                </p>
                            </div>

                            <div className="flex flex-col justify-end overflow-hidden bg-dot-grid px-6 pt-10 lg:px-12 lg:pt-16">
                                <ScoreFrame score={score} />
                            </div>
                        </section>

                        <ul className="grid border-y border-rule sm:grid-cols-2 lg:grid-cols-4">
                            {PROOF.map(({ icon: Icon, text }) => (
                                <li
                                    key={text}
                                    className="flex items-center gap-3 border-b border-rule p-6 text-base font-medium last:border-b-0 sm:border-r sm:nth-[2n]:border-r-0 lg:border-b-0 lg:last:border-r-0 lg:nth-[2n]:border-r"
                                >
                                    <Icon
                                        weight="bold"
                                        className="size-5 shrink-0 text-brand"
                                    />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col border-b border-rule sm:flex-row">
                            <p className="flex shrink-0 items-center border-b border-rule px-6 py-4 text-sm font-medium sm:w-56 sm:border-r sm:border-b-0 sm:py-0">
                                Founders at these companies scored first
                            </p>
                            <div className="min-w-0 flex-1 overflow-hidden marquee-mask py-7">
                                <ul
                                    aria-label="Customer logos"
                                    className="marquee items-center gap-16 pr-16"
                                >
                                    {[...CUSTOMERS, ...CUSTOMERS].map(
                                        (logo, index) => (
                                            <li
                                                key={`${logo.name}-${index}`}
                                                aria-hidden={
                                                    index >= CUSTOMERS.length
                                                }
                                                className="flex h-10 shrink-0 items-center"
                                            >
                                                <img
                                                    src={`/brand/logos/${logo.file}`}
                                                    alt={logo.name}
                                                    className={LOGO_IMAGE_CLASS}
                                                    style={{
                                                        height: `${2.5 * (logo.scale ?? 1)}rem`,
                                                    }}
                                                />
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>

                        <section className="px-6 py-20">
                            <h2 className="max-w-3xl text-3xl leading-tight font-medium tracking-[-0.02em] text-balance lg:text-[2.5rem]">
                                90% of startups fail. Most find out why in the
                                pitch meeting.
                            </h2>
                            <p className="mt-5 max-w-[42rem] text-lg text-muted-foreground">
                                Investors spot the gaps in team, traction,
                                market and fundability in the first ten minutes.
                                ScaleupMap shows you the same gaps first.
                            </p>
                            <p className="mt-4 max-w-[42rem] text-lg text-muted-foreground">
                                It was built inside ScaleGood Fund as their real
                                due diligence tool, not a startup checklist. You
                                get the lens investors use, before you pitch.
                            </p>
                        </section>

                        <section
                            id="how-it-works"
                            className="border-t border-rule px-6 py-20"
                        >
                            <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                How it works
                            </h2>
                            <ol className="mt-12 grid gap-10 lg:grid-cols-3">
                                {STEPS.map((step) => (
                                    <li
                                        key={step.number}
                                        className="border-t border-rule pt-5"
                                    >
                                        <p className="flex h-5 items-center gap-3">
                                            <span className="strip-number">
                                                {step.number}
                                            </span>
                                            <span className="strip-label">
                                                {step.label}
                                            </span>
                                        </p>
                                        <h3 className="mt-4 text-xl font-medium">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-muted-foreground">
                                            {step.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="border-t border-rule px-6 py-20">
                            <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                What you get
                            </h2>
                            <dl className="mt-12 max-w-3xl divide-y divide-rule">
                                {OUTCOMES.map((outcome) => (
                                    <div
                                        key={outcome.title}
                                        className="grid gap-2 py-8 sm:grid-cols-[12rem_1fr]"
                                    >
                                        <dt className="text-xl font-medium">
                                            {outcome.title}
                                        </dt>
                                        <dd className="text-lg text-muted-foreground">
                                            {outcome.text}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </section>

                        <section className="border-t border-rule px-6 py-20">
                            <figure className="max-w-3xl border-l border-rule pl-6">
                                <blockquote className="text-2xl leading-snug font-medium tracking-[-0.02em] text-balance">
                                    ScaleupMap introduced us to investors who
                                    had passed on us before. The platform
                                    understands our business better than some of
                                    our own investors do.
                                </blockquote>
                                <figcaption className="mt-6 text-sm text-muted-foreground">
                                    Nathan Nasseri, founder, ResVR
                                </figcaption>
                            </figure>
                        </section>

                        <section
                            id="investors"
                            className="border-t border-rule px-6 py-20"
                        >
                            <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] text-balance lg:text-[2.5rem]">
                                Know where you stand before you walk in.
                            </h2>
                            <Link href={cta} className="btn-ink mt-8 h-10">
                                Score my startup free
                                <ArrowRight weight="bold" className="size-4" />
                            </Link>
                            <p className="mt-6 text-sm text-muted-foreground">
                                Investor or running a program?{' '}
                                <a
                                    href="https://scaleupmap.com/#venture-diligence"
                                    className="font-medium text-brand underline-offset-4 transition-colors duration-100 hover:text-brand-hover hover:underline"
                                >
                                    See the investor side
                                </a>
                                {' or '}
                                <a
                                    href="https://scaleupmap.com/#innovation-programs"
                                    className="font-medium text-brand underline-offset-4 transition-colors duration-100 hover:text-brand-hover hover:underline"
                                >
                                    the program side
                                </a>
                                .
                            </p>
                        </section>
                    </main>

                    <div className="flex flex-col gap-4 border-t border-rule px-6 py-6 sm:flex-row sm:items-center sm:gap-8">
                        <p className="text-sm text-muted-foreground">
                            Supported by
                        </p>
                        <ul className="flex flex-wrap items-center gap-8">
                            {BACKERS.map((logo) => (
                                <li key={logo.name}>
                                    <img
                                        src={`/brand/logos/${logo.file}`}
                                        alt={logo.name}
                                        className={LOGO_IMAGE_CLASS}
                                        style={{
                                            height: `${2.5 * (logo.scale ?? 1)}rem`,
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <footer className="flex flex-col gap-6 border-t border-rule px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-3">
                            <BrandLogo
                                mark
                                className="size-6 text-muted-foreground"
                            />
                            <p>
                                ScaleupMap Score is a trademark of ScaleupMap.
                                Copyright 2026 ScaleupMap.
                            </p>
                        </div>
                        <nav
                            aria-label="Footer"
                            className="flex flex-wrap items-center gap-6"
                        >
                            <a
                                href="https://scaleupmap.com/billing"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                Pricing
                            </a>
                            <a
                                href="https://join.slack.com/t/scaleupmapcom-xau9343/shared_invite/zt-4akgv5h2b-l9K51CXAsoye1WigWMG7MA"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                Community
                            </a>
                            <a
                                href="https://scaleupmap.com/one-pager"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                One-pager
                            </a>
                            <a
                                href="https://scaleupmap.com/contact"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                Contact
                            </a>
                            <a
                                href="https://scaleupmap.com/tos"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                Terms
                            </a>
                            <a
                                href="https://scaleupmap.com/privacy"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                Privacy
                            </a>
                            <a
                                href="https://scaleupmap.com/about"
                                className="transition-colors duration-100 hover:text-foreground"
                            >
                                About
                            </a>
                            <AppearanceToggleTab />
                        </nav>
                    </footer>
                </div>
            </div>
        </>
    );
}

function ScoreFrame({ score }: { score: number }) {
    return (
        <div
            id="sample-score"
            aria-label="Sample ScaleupMap Score for Northwind Robotics"
            className="enter rounded-t-xl border border-b-0 border-border bg-background shadow-card enter-4"
        >
            <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-2 text-foreground">
                    <BrandLogo mark className="size-4" />
                    Northwind Robotics
                </span>
                <span>Re-scored 2 days ago</span>
            </div>
            <div className="grid gap-8 p-5 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        ScaleupMap Score
                    </p>
                    <p className="mt-2 flex items-baseline gap-2">
                        <span className="score text-7xl sm:text-8xl">
                            {score}
                        </span>
                        <span className="text-muted-foreground">of 100</span>
                    </p>
                    <p className="mt-3 text-sm font-medium text-brand">
                        Up 6 since last month
                    </p>
                </div>
                <ul className="flex flex-col justify-center gap-4">
                    {GAP_SCORES.map((gap) => (
                        <li key={gap.label} className="text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">{gap.label}</span>
                                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                                    {gap.points} / {gap.max}
                                </span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full rounded-sm bg-subtle">
                                <div
                                    className="h-full rounded-sm bg-brand transition-[width] duration-700 ease-out"
                                    style={{
                                        width: `${Math.round((gap.points / gap.max) * 100)}%`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-between border-t border-rule px-5 py-4 text-sm sm:px-6">
                <span className="text-muted-foreground">Next up</span>
                <span className="flex items-center gap-2 font-medium">
                    Investment memo
                    <ArrowRight weight="bold" className="size-4 text-brand" />
                </span>
            </div>
        </div>
    );
}

/** Counts from 0 to the target once on mount, ease-out, about 900ms. Jumps straight to the target when the OS asks for reduced motion. */
function useCountUp(target: number, durationMs = 900): number {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
            return;
        }
        const start = performance.now();
        let frame = requestAnimationFrame(function tick(now) {
            const progress = Math.min(1, (now - start) / durationMs);
            setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [target, durationMs]);

    return value;
}
