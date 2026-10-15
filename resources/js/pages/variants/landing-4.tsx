import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    CreditCard,
    FileText,
    Plus,
    Timer,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { BrandLogo } from '@/components/brand-logo';
import { dashboard, login, register } from '@/routes';

type Logo = { name: string; file: string };

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

const FAQ = [
    {
        question: 'Do I need a pitch deck to start?',
        answer: 'No. A deck or a company doc is enough. The score works from what you already have, and the gaps tell you what to add next.',
    },
    {
        question: 'How long does the first score take?',
        answer: 'Under 2 minutes for the score and your gaps. The investment memo and tearsheet are ready in 10 to 15 minutes after that.',
    },
    {
        question: 'Who built the scoring model?',
        answer: 'ScaleGood Fund built it as their real due diligence tool, not a startup checklist. You get the lens they use before you pitch.',
    },
    {
        question: 'What happens if my score is low?',
        answer: 'You get the three gaps that cost you the meeting and the one tool that closes the first gap. Work it, rescore, then move to the next.',
    },
];

// Real customers and backers from scaleupmap.com. Files in public/brand/logos.
const CUSTOMERS: Logo[] = [
    { name: 'Nanostics Precision Health', file: 'nanostics.png' },
    { name: 'University of Alberta', file: 'university-of-alberta.png' },
    { name: 'niaHealth', file: 'niahealth.png' },
    { name: 'UA Innovation Fund', file: 'ua-innovation-fund.png' },
    { name: 'FireSafe', file: 'firesafe.png' },
    { name: '2S Water', file: '2s-water.png' },
    { name: 'HonestDoor', file: 'honestdoor.png' },
    { name: 'ScaleGood Fund', file: 'scalegood-fund.png' },
    { name: 'Alberta Innovates', file: 'alberta-innovates.svg' },
    { name: 'NAIT', file: 'nait.png' },
    { name: 'Platform Calgary', file: 'platform-calgary.png' },
];

const BACKERS: Logo[] = [
    { name: 'Alberta Innovates', file: 'alberta-innovates.svg' },
    { name: 'Edmonton Unlimited', file: 'edmonton-unlimited.png' },
    {
        name: 'Microsoft for Startups',
        file: 'microsoft-for-startups.svg',
    },
    { name: 'Google for Startups', file: 'google-for-startups.png' },
];

const LOGO_IMAGE_CLASS =
    'max-h-10 w-auto max-w-[8rem] opacity-80 grayscale transition-opacity duration-100 hover:opacity-100 dark:invert';

// Sample venture for the rendered documents. Pure markup, so it never goes stale.
const GAP_SCORES = [
    { label: 'Team', points: 9, max: 15 },
    { label: 'Traction', points: 7, max: 20 },
    { label: 'Market', points: 11, max: 20 },
    { label: 'Fundability', points: 14, max: 20 },
];
const SAMPLE_SCORE = 72;

const MEMO_SECTIONS = [
    {
        heading: 'Problem',
        lines: [
            'Placeholder: who hurts and how often.',
            'Placeholder: what they do about it today.',
            'Placeholder: why the pain is getting worse.',
        ],
    },
    {
        heading: 'Solution',
        lines: [
            'Placeholder: the product in one sentence.',
            'Placeholder: the step it removes for buyers.',
            'Placeholder: why it works now.',
        ],
    },
    {
        heading: 'Traction',
        lines: [
            'Placeholder: pilots or paying customers.',
            'Placeholder: the metric that moved most.',
            'Placeholder: the next milestone.',
        ],
    },
    {
        heading: 'Risks',
        lines: [
            'Placeholder: the market risk to watch.',
            'Placeholder: the team gap to close.',
            'Placeholder: the mitigation you have.',
        ],
    },
];

const MARQUEE_KEYFRAMES =
    '@keyframes landing4-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}';

// Full class strings, not built at runtime, so Tailwind picks them up.
const CARD_BASE =
    'flex h-96 flex-col overflow-hidden rounded-lg border border-border bg-background p-5 text-sm transition-[transform,translate] duration-500 ease-out hover:-translate-y-2 motion-reduce:transition-none';
const CARD_POSITION = 'absolute inset-x-0 top-6 mx-auto w-[13.5rem] sm:w-72';
const SCORE_CARD_STACKED =
    '[transform:translate3d(0,0,-80px)] group-hover/stack:[transform:translate3d(calc(var(--spread)*-1),0,-60px)_rotateY(24deg)] group-focus-within/stack:[transform:translate3d(calc(var(--spread)*-1),0,-60px)_rotateY(24deg)] group-data-[spread=true]/stack:[transform:translate3d(calc(var(--spread)*-1),0,-60px)_rotateY(24deg)]';
const MEMO_CARD_STACKED =
    '[transform:translate3d(0,0,0)] group-hover/stack:[transform:translate3d(0,0,40px)] group-focus-within/stack:[transform:translate3d(0,0,40px)] group-data-[spread=true]/stack:[transform:translate3d(0,0,40px)]';
const TEARSHEET_CARD_STACKED =
    '[transform:translate3d(0,0,-40px)] group-hover/stack:[transform:translate3d(var(--spread),0,-60px)_rotateY(-24deg)] group-focus-within/stack:[transform:translate3d(var(--spread),0,-60px)_rotateY(-24deg)] group-data-[spread=true]/stack:[transform:translate3d(var(--spread),0,-60px)_rotateY(-24deg)]';
const STAMP_CLASS = 'font-mono text-xs text-muted-foreground tabular-nums';

export default function Landing4() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();

    return (
        <>
            <Head title="See your startup the way investors do" />
            <style>{MARQUEE_KEYFRAMES}</style>
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
                                href="#faq"
                                className="hidden transition-colors duration-100 hover:text-muted-foreground sm:inline"
                            >
                                FAQ
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
                        <section className="grid lg:grid-cols-2 lg:items-center lg:divide-x lg:divide-rule">
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
                                        href="#sample-documents"
                                        className="btn-outline h-10"
                                    >
                                        See a sample report
                                    </a>
                                </div>
                                <p className="mt-6 enter text-sm text-muted-foreground enter-3">
                                    No credit card. Only a deck or company doc
                                    needed.
                                </p>
                            </div>

                            <div
                                id="sample-documents"
                                className="overflow-hidden bg-dot-grid px-6 py-12 lg:px-12 lg:py-20"
                            >
                                <DocumentStack />
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

                        <div className="border-b border-rule px-6 py-4 text-sm font-medium text-muted-foreground">
                            Founders at these companies scored first
                        </div>
                        <div className="group/marquee overflow-hidden py-8">
                            <div className="flex w-max [animation:landing4-marquee_60s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation:none]">
                                <LogoList logos={CUSTOMERS} />
                                <LogoList logos={CUSTOMERS} isDecorative />
                            </div>
                        </div>

                        <section className="border-t border-rule px-6 py-20">
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

                        <section
                            id="faq"
                            className="border-t border-rule px-6 py-20"
                        >
                            <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                Questions founders ask
                            </h2>
                            <div className="mt-12 max-w-3xl divide-y divide-rule border-y border-rule">
                                {FAQ.map((item) => (
                                    <details
                                        key={item.question}
                                        className="group"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium transition-colors duration-100 hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
                                            {item.question}
                                            <Plus
                                                weight="bold"
                                                className="size-5 shrink-0 text-brand transition-transform duration-100 group-open:rotate-45"
                                            />
                                        </summary>
                                        <p className="max-w-[42rem] pb-6 text-muted-foreground">
                                            {item.answer}
                                        </p>
                                    </details>
                                ))}
                            </div>
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

/** Three rendered documents on a preserve-3d stack. Hover, focus or tap fans them out. */
function DocumentStack() {
    const [isSpread, setIsSpread] = useState(false);

    return (
        <div
            role="group"
            tabIndex={0}
            aria-label="Sample documents: score card, investment memo and tearsheet. Hover or focus to spread them out."
            onClick={() => setIsSpread((wasSpread) => !wasSpread)}
            data-spread={isSpread}
            className="group/stack mx-auto h-[28rem] w-full max-w-md [--spread:3.5rem] [perspective:1200px] sm:[--spread:7rem]"
        >
            <div className="relative h-full [transform-style:preserve-3d]">
                <ScoreCard />
                <TearsheetCard />
                <MemoCard />
            </div>
        </div>
    );
}

function ScoreCard() {
    const score = useCountUp(SAMPLE_SCORE);

    return (
        <article
            aria-label="ScaleupMap Score for Northwind Robotics"
            className={`${CARD_BASE} ${CARD_POSITION} ${SCORE_CARD_STACKED}`}
        >
            <header className="flex items-center justify-between gap-3 border-b border-rule pb-3">
                <span className="flex items-center gap-2 font-medium">
                    <BrandLogo mark className="size-4" />
                    Northwind Robotics
                </span>
                <span className={STAMP_CLASS}>Ready in 10 to 15 min</span>
            </header>
            <p className="mt-4 text-muted-foreground">ScaleupMap Score</p>
            <p className="mt-1 flex items-baseline gap-2">
                <span className="score text-6xl">{score}</span>
                <span className="text-muted-foreground">of 100</span>
            </p>
            <ul className="mt-auto flex flex-col gap-3">
                {GAP_SCORES.map((gap) => (
                    <li key={gap.label}>
                        <div className="flex justify-between">
                            <span className="font-medium">{gap.label}</span>
                            <span className={STAMP_CLASS}>
                                {gap.points} / {gap.max}
                            </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full rounded-sm bg-subtle">
                            <div
                                className="h-full rounded-sm bg-brand"
                                style={{
                                    width: `${Math.round((gap.points / gap.max) * 100)}%`,
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function MemoCard() {
    return (
        <article
            aria-label="Investment memo sample"
            className={`${CARD_BASE} ${CARD_POSITION} ${MEMO_CARD_STACKED} z-10`}
        >
            <header className="flex items-center justify-between gap-3 border-b border-rule pb-3">
                <span className="font-medium">Investment memo</span>
                <span className={STAMP_CLASS}>Ready in 10 to 15 min</span>
            </header>
            <div className="mt-4 flex flex-col gap-3 overflow-hidden">
                {MEMO_SECTIONS.map((section) => (
                    <section key={section.heading}>
                        <h3 className="text-sm font-medium">
                            {section.heading}
                        </h3>
                        {section.lines.map((line) => (
                            <p
                                key={line}
                                className="text-xs leading-4 text-muted-foreground"
                            >
                                {line}
                            </p>
                        ))}
                    </section>
                ))}
            </div>
        </article>
    );
}

function TearsheetCard() {
    const tearsheetRows = [
        { label: 'Stage', value: 'Pre-seed' },
        { label: 'Team', value: '4 founders' },
        { label: 'Ask', value: '$750k' },
        { label: 'Score', value: `${SAMPLE_SCORE} / 100` },
    ];

    return (
        <article
            aria-label="Tearsheet sample"
            className={`${CARD_BASE} ${CARD_POSITION} ${TEARSHEET_CARD_STACKED}`}
        >
            <header className="flex items-center justify-between gap-3 border-b border-rule pb-3">
                <span className="font-medium">Tearsheet</span>
                <span className={STAMP_CLASS}>Ready in 10 to 15 min</span>
            </header>
            <dl className="mt-4 divide-y divide-rule">
                {tearsheetRows.map((row) => (
                    <div key={row.label} className="flex justify-between py-2">
                        <dt className="text-muted-foreground">{row.label}</dt>
                        <dd className="font-mono tabular-nums">{row.value}</dd>
                    </div>
                ))}
            </dl>
        </article>
    );
}

function LogoList({
    logos,
    isDecorative = false,
}: {
    logos: readonly Logo[];
    isDecorative?: boolean;
}) {
    return (
        <ul
            aria-label={isDecorative ? undefined : 'Customer logos'}
            aria-hidden={isDecorative || undefined}
            className="flex shrink-0 items-center gap-14 pr-14"
        >
            {logos.map((logo) => (
                <li key={logo.name} className="flex h-10 items-center">
                    <img
                        src={`/brand/logos/${logo.file}`}
                        alt={logo.name}
                        className={LOGO_IMAGE_CLASS}
                    />
                </li>
            ))}
        </ul>
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
