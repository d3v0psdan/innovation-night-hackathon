import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    CreditCard,
    FileText,
    Timer,
} from '@phosphor-icons/react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { dashboard, login, register } from '@/routes';

// Wireframe pass: structure, copy and spacing only. Colour, fonts and motion land in the theme pass.
const PROOF = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: FileText, text: 'Only a deck or company doc needed' },
    { icon: Timer, text: 'First score in under 2 minutes' },
    { icon: Bank, text: 'Model built inside a VC fund' },
];

const STEPS = [
    {
        number: '01',
        title: 'Answer three questions',
        text: 'Where you are, what you need this month, and how big the team is.',
    },
    {
        number: '02',
        title: 'Get your score and your gaps',
        text: 'The read a VC analyst would give you, with the three gaps that cost you the meeting.',
    },
    {
        number: '03',
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

const CTA_CLASS =
    'mt-10 inline-flex h-12 items-center gap-2 rounded-md border border-foreground px-6 text-base font-medium';

export default function Welcome() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();

    return (
        <>
            <Head title="See your startup the way investors do" />
            <div className="min-h-screen bg-background text-foreground">
                <div className="mx-auto max-w-7xl border-x border-border">
                    <header className="flex h-16 items-center justify-between border-b border-border px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-medium"
                        >
                            <img
                                src="/scaleupmap-icon.png"
                                alt=""
                                className="size-7"
                            />
                            ScaleupMap
                        </Link>
                        <nav
                            aria-label="Main"
                            className="flex items-center gap-6 text-sm"
                        >
                            <a
                                href="#how-it-works"
                                className="hidden sm:inline"
                            >
                                How it works
                            </a>
                            <a href="#investors" className="hidden sm:inline">
                                For investors
                            </a>
                            <AppearanceToggleTab compact />
                            {auth.user ? (
                                <Link href={dashboard()}>Dashboard</Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="hidden sm:inline"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-md border border-foreground px-4 py-2"
                                    >
                                        Score my startup free
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main>
                        <section className="grid gap-12 px-6 pt-20 pb-16 lg:grid-cols-2 lg:items-center lg:pt-32 lg:pb-24">
                            <div className="max-w-xl">
                                <h1 className="text-4xl font-medium tracking-tight text-balance lg:text-6xl">
                                    See your startup the way investors do. In 2
                                    minutes.
                                </h1>
                                <p className="mt-6 text-lg text-muted-foreground">
                                    Built for first-time founders. Get the score
                                    a VC analyst would give you, see the gaps
                                    they would flag, and fix them before you
                                    pitch.
                                </p>
                                <Link href={cta} className={CTA_CLASS}>
                                    Score my startup free
                                    <ArrowRight weight="bold" />
                                </Link>
                            </div>

                            <div
                                aria-label="Example score card"
                                className="rounded-lg border border-border p-6"
                            >
                                <div className="flex items-baseline justify-between text-sm text-muted-foreground">
                                    <span>Northwind Robotics</span>
                                    <span>Re-scored 2 days ago</span>
                                </div>
                                <p className="mt-6 flex items-baseline gap-2">
                                    <span className="font-mono text-7xl font-medium tabular-nums">
                                        72
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
                                            className="rounded-md border border-border px-3 py-1 text-sm"
                                        >
                                            {gap}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <ul className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
                            {PROOF.map(({ icon: Icon, text }) => (
                                <li
                                    key={text}
                                    className="flex items-center gap-3 border-b border-border p-6 text-base last:border-b-0 sm:border-r sm:nth-[2n]:border-r-0 lg:border-b-0 lg:last:border-r-0 lg:nth-[2n]:border-r"
                                >
                                    <Icon
                                        weight="bold"
                                        className="size-5 shrink-0"
                                    />
                                    {text}
                                </li>
                            ))}
                        </ul>

                        <section className="px-6 py-24">
                            <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-balance lg:text-4xl">
                                90% of startups fail. Most find out why in the
                                pitch meeting.
                            </h2>
                            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                                Investors spot the gaps in team, traction,
                                market and fundability in the first ten minutes.
                                ScaleupMap shows you the same gaps first.
                            </p>
                        </section>

                        <section
                            id="how-it-works"
                            className="border-t border-border px-6 py-24"
                        >
                            <h2 className="text-3xl font-medium tracking-tight lg:text-4xl">
                                How it works
                            </h2>
                            <ol className="mt-12 grid gap-10 lg:grid-cols-3">
                                {STEPS.map((step) => (
                                    <li
                                        key={step.number}
                                        className="border-t border-border pt-6"
                                    >
                                        <span className="font-mono text-sm text-muted-foreground">
                                            {step.number}
                                        </span>
                                        <h3 className="mt-3 text-xl font-medium">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-muted-foreground">
                                            {step.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="border-t border-border px-6 py-24">
                            <h2 className="text-3xl font-medium tracking-tight lg:text-4xl">
                                What you get
                            </h2>
                            <dl className="mt-12 max-w-3xl divide-y divide-border">
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

                        <section className="border-t border-border px-6 py-24">
                            <figure className="max-w-3xl">
                                <blockquote className="text-2xl font-medium tracking-tight text-balance">
                                    ScaleupMap introduced us to investors who
                                    had passed on us before. The platform
                                    understands our business better than some of
                                    our own investors do.
                                </blockquote>
                                <figcaption className="mt-6 text-muted-foreground">
                                    Nathan Nasseri, founder, ResVR
                                </figcaption>
                            </figure>
                        </section>

                        <section
                            id="investors"
                            className="border-t border-border px-6 py-24"
                        >
                            <h2 className="text-3xl font-medium tracking-tight text-balance lg:text-4xl">
                                Know where you stand before you walk in.
                            </h2>
                            <Link href={cta} className={CTA_CLASS}>
                                Score my startup free
                                <ArrowRight weight="bold" />
                            </Link>
                            <p className="mt-6 text-sm text-muted-foreground">
                                Investor or running a program?{' '}
                                <a
                                    href="https://scaleupmap.com/#venture-diligence"
                                    className="underline underline-offset-4"
                                >
                                    See the investor side
                                </a>
                            </p>
                        </section>
                    </main>

                    <footer className="flex flex-col gap-4 border-t border-border px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            ScaleupMap Score is a trademark of ScaleupMap.
                            Copyright 2026 ScaleupMap.
                        </p>
                        <nav
                            aria-label="Footer"
                            className="flex items-center gap-6"
                        >
                            <AppearanceToggleTab />
                            <a href="https://scaleupmap.com/tos">Terms</a>
                            <a href="https://scaleupmap.com/privacy">Privacy</a>
                            <a href="https://scaleupmap.com/about">About</a>
                        </nav>
                    </footer>
                </div>
            </div>
        </>
    );
}
