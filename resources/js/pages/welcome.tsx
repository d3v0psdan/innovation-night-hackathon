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
        text: 'We send you to the one tool that closes the first gap. Then the next.',
    },
];

const OUTCOMES = [
    {
        title: 'A score',
        text: 'One number out of 100 that moves as your venture does. Re-score whenever you make progress.',
    },
    {
        title: 'Gaps, named',
        text: 'Team, traction, market, fundability. The red flags investors spot first, before you walk in.',
    },
    {
        title: 'An investment memo',
        text: 'The one page investors ask for, written the way an analyst writes it, in about 15 minutes.',
    },
];

const GAPS = ['Team', 'Traction', 'Market'];
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
                        <section className="flex flex-col items-center px-6 pt-16 pb-12 text-center sm:pt-30 sm:pb-20">
                            <h1 className="max-w-4xl enter text-4xl leading-none font-medium tracking-[-0.05em] text-balance enter-1 sm:text-5xl lg:text-6xl">
                                See your startup the way investors do. In 2
                                minutes.
                            </h1>
                            <p className="mt-6 max-w-[40rem] enter text-lg text-muted-foreground enter-2">
                                Built for first-time founders. Get the score a
                                VC analyst would give you, see the gaps they
                                would flag, and fix them before you pitch.
                            </p>
                            <Link
                                href={cta}
                                className="btn-ink mt-8 h-10 enter enter-3"
                            >
                                Score my startup free
                                <ArrowRight weight="bold" className="size-4" />
                            </Link>

                            <div className="mt-16 w-full max-w-lg enter rounded-lg border border-rule bg-background p-6 text-left enter-4">
                                <div className="flex items-baseline justify-between font-mono text-xs text-muted-foreground">
                                    <span>Northwind Robotics</span>
                                    <span>Re-scored 2 days ago</span>
                                </div>
                                <p className="mt-6 flex items-baseline gap-2">
                                    <span className="score text-7xl">
                                        {score}
                                    </span>
                                    <span className="text-muted-foreground">
                                        of 100
                                    </span>
                                </p>
                                <p className="mt-6 text-sm text-muted-foreground">
                                    Gaps to close first
                                </p>
                                <ul className="mt-2 flex flex-wrap gap-2">
                                    {GAPS.map((gap) => (
                                        <li
                                            key={gap}
                                            className="rounded-md bg-navy-3 px-3 py-1 text-sm font-medium text-brand"
                                        >
                                            {gap}
                                        </li>
                                    ))}
                                </ul>
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
                            </p>
                        </section>
                    </main>

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
