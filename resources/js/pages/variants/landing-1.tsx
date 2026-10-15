import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    CreditCard,
    FileText,
    Timer,
} from '@phosphor-icons/react';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { BrandLogo } from '@/components/brand-logo';
import { dashboard, login, register } from '@/routes';

type ProductTab = 'score' | 'gaps' | 'memo';
type Tilt = { rotateX: number; rotateY: number };

const PROOF = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: FileText, text: 'Only a deck or company doc needed' },
    { icon: Timer, text: 'First score in under 2 minutes' },
    { icon: Bank, text: 'Model built inside a VC fund' },
];

const PRODUCT_TABS: ReadonlyArray<{ id: ProductTab; label: string }> = [
    { id: 'score', label: 'Score' },
    { id: 'gaps', label: 'Gaps' },
    { id: 'memo', label: 'Memo' },
];

const NEXT_PRODUCT_TAB: Record<ProductTab, ProductTab> = {
    score: 'gaps',
    gaps: 'memo',
    memo: 'score',
};

const TAB_DURATION_MS = 5000;
const TILT_DEGREES = 8;
const TILT_QUERY =
    '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)';
const NO_TILT: Tilt = { rotateX: 0, rotateY: 0 };

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
        chip: '0 to 100',
    },
    {
        title: 'Gaps, named',
        text: 'The 11 red flags VCs look for, in team, traction, market and fundability. You see them before you walk into the room.',
        chip: '11 red flags',
    },
    {
        title: 'An investment memo',
        text: 'The memo and tearsheet investors ask for, written the way a fund analyst writes them, ready in 10 to 15 minutes. Includes the follow-up questions they will ask.',
        chip: '10 to 15 min',
    },
];

// Real customers and backers from scaleupmap.com. Files in public/brand/logos.
const CUSTOMERS = [
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

const BACKERS = [
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

// Sample venture for the rendered product frames. Pure markup, so it never goes stale.
const GAP_SCORES = [
    { label: 'Team', points: 9, max: 15 },
    { label: 'Traction', points: 7, max: 20 },
    { label: 'Market', points: 11, max: 20 },
    { label: 'Fundability', points: 14, max: 20 },
];
const GAP_FLAGS = [
    { area: 'Team', flag: 'No technical co-founder yet' },
    { area: 'Traction', flag: 'Revenue flat for two quarters' },
    { area: 'Market', flag: 'Market size stated without a bottom-up count' },
];
const SAMPLE_SCORE = 72;

const FRAME_CLASS =
    'w-full max-w-xl rounded-lg border border-border bg-background';

export default function Landing1() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();
    const score = useCountUp(SAMPLE_SCORE);

    const [tilt, setTilt] = useState<Tilt>(NO_TILT);
    const [isTilting, setIsTilting] = useState(false);
    const [activeTab, setActiveTab] = useState<ProductTab>('score');
    const progressBarRef = useRef<HTMLDivElement>(null);
    const isTabRotationPausedRef = useRef(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        let frame = 0;
        let elapsedMs = 0;
        let previousTime: number | null = null;

        function tick(now: number) {
            if (previousTime !== null && !isTabRotationPausedRef.current) {
                elapsedMs += now - previousTime;
            }
            previousTime = now;
            const progress = Math.min(1, elapsedMs / TAB_DURATION_MS);
            if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
            if (progress >= 1) {
                setActiveTab(NEXT_PRODUCT_TAB[activeTab]);
                return;
            }
            frame = requestAnimationFrame(tick);
        }

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [activeTab]);

    function handleTiltMove(event: MouseEvent<HTMLDivElement>) {
        if (!window.matchMedia(TILT_QUERY).matches) {
            return;
        }
        const bounds = event.currentTarget.getBoundingClientRect();
        // Offsets run from -0.5 (left or top edge) to 0.5 (right or bottom edge).
        const horizontalOffset =
            (event.clientX - bounds.left) / bounds.width - 0.5;
        const verticalOffset =
            (event.clientY - bounds.top) / bounds.height - 0.5;
        setTilt({
            rotateX: -verticalOffset * 2 * TILT_DEGREES,
            rotateY: horizontalOffset * 2 * TILT_DEGREES,
        });
        setIsTilting(true);
    }

    function handleTiltLeave() {
        setTilt(NO_TILT);
        setIsTilting(false);
    }

    function pauseTabRotation() {
        isTabRotationPausedRef.current = true;
    }

    function resumeTabRotation() {
        isTabRotationPausedRef.current = false;
    }

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
                        <section className="grid border-b border-rule lg:grid-cols-2 lg:divide-x lg:divide-rule">
                            <div className="flex flex-col justify-center px-6 py-16 lg:py-24 lg:pr-12">
                                <h1 className="enter text-4xl leading-none font-medium tracking-[-0.05em] text-balance text-pretty enter-1 sm:text-5xl lg:text-6xl">
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

                            <div className="flex flex-col justify-center bg-dot-grid px-6 py-12 lg:px-12 lg:py-16">
                                <div
                                    id="sample-score"
                                    className="enter enter-4 perspective-[1200px]"
                                    onMouseMove={handleTiltMove}
                                    onMouseLeave={handleTiltLeave}
                                >
                                    <div
                                        className={
                                            isTilting
                                                ? ''
                                                : 'transition-transform duration-500 ease-out'
                                        }
                                        style={{
                                            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                                        }}
                                    >
                                        <ScoreFrame score={score} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="product"
                            className="border-b border-rule"
                            onMouseEnter={pauseTabRotation}
                            onMouseLeave={resumeTabRotation}
                            onFocus={pauseTabRotation}
                            onBlur={resumeTabRotation}
                        >
                            <SectionStrip number="01" label="Product" />
                            <div
                                role="tablist"
                                aria-label="Product views"
                                className="flex border-b border-rule"
                            >
                                {PRODUCT_TABS.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            id={`product-tab-${tab.id}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-controls="product-panel"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`h-12 flex-1 px-4 text-[15px] font-medium transition-colors duration-100 sm:flex-none sm:px-8 ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                        >
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <div aria-hidden className="h-0.5 bg-rule">
                                <div
                                    ref={progressBarRef}
                                    className="h-full origin-left bg-brand"
                                    style={{ transform: 'scaleX(0)' }}
                                />
                            </div>
                            <div
                                id="product-panel"
                                role="tabpanel"
                                aria-labelledby={`product-tab-${activeTab}`}
                                className="flex justify-center bg-dot-grid px-6 py-12 lg:py-16"
                            >
                                {activeTab === 'score' && (
                                    <ScoreFrame score={score} />
                                )}
                                {activeTab === 'gaps' && <GapsFrame />}
                                {activeTab === 'memo' && <MemoFrame />}
                            </div>
                        </section>

                        <ul className="-mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {PROOF.map(({ icon: Icon, text }) => (
                                <li
                                    key={text}
                                    className="flex items-center gap-3 border-r border-b border-rule p-6 text-base font-medium transition-colors duration-100 hover:bg-subtle"
                                >
                                    <Icon
                                        weight="bold"
                                        className="size-5 shrink-0 text-brand"
                                    />
                                    {text}
                                </li>
                            ))}
                        </ul>

                        <section>
                            <p className="border-b border-rule px-6 py-4 text-sm font-medium">
                                Founders at these companies scored first
                            </p>
                            <ul className="-mr-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                                {CUSTOMERS.map((logo) => (
                                    <li
                                        key={logo.name}
                                        className="flex h-24 items-center justify-center border-r border-b border-rule p-6 transition-colors duration-100 hover:bg-subtle"
                                    >
                                        <img
                                            src={`/brand/logos/${logo.file}`}
                                            alt={logo.name}
                                            className={LOGO_IMAGE_CLASS}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="px-6 py-20">
                            <h2 className="max-w-3xl text-3xl leading-tight font-medium tracking-[-0.02em] text-balance text-pretty lg:text-[2.5rem]">
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
                            className="border-t border-rule"
                        >
                            <SectionStrip number="02" label="Steps" />
                            <div className="px-6 py-20">
                                <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                    How it works
                                </h2>
                                <ol className="mt-12 grid gap-10 lg:grid-cols-3">
                                    {STEPS.map((step) => (
                                        <li
                                            key={step.number}
                                            className="border-t border-rule pt-5"
                                        >
                                            <p className="flex h-5 items-center">
                                                <span className="strip-label">
                                                    {step.label}
                                                </span>
                                            </p>
                                            <h3 className="mt-4 text-xl font-medium text-pretty">
                                                {step.title}
                                            </h3>
                                            <p className="mt-2 text-muted-foreground">
                                                {step.text}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </section>

                        <section className="border-t border-rule">
                            <SectionStrip number="03" label="Deliverables" />
                            <div className="px-6 py-20">
                                <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                    What you get
                                </h2>
                            </div>
                            <ul className="-mr-px grid border-t border-rule sm:grid-cols-3">
                                {OUTCOMES.map((outcome) => (
                                    <li
                                        key={outcome.title}
                                        className="group relative flex flex-col gap-4 border-r border-b border-rule p-6 transition-colors duration-100 hover:bg-subtle lg:p-8"
                                    >
                                        <span
                                            aria-hidden
                                            className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover:scale-x-100"
                                        />
                                        <h3 className="text-xl font-medium">
                                            {outcome.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {outcome.text}
                                        </p>
                                        <span className="w-fit rounded-md border border-border px-2 py-1 font-mono text-xs tabular-nums transition-transform duration-100 ease-out group-hover:-translate-y-0.5">
                                            {outcome.chip}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="border-t border-rule px-6 py-20">
                            <figure className="max-w-3xl border-l border-rule pl-6">
                                <blockquote className="text-2xl leading-snug font-medium tracking-[-0.02em] text-pretty">
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
                            <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] text-balance text-pretty lg:text-[2.5rem]">
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

function SectionStrip({ number, label }: { number: string; label: string }) {
    return (
        <div className="flex h-12 items-center gap-3 border-b border-rule px-6">
            <span className="strip-number">{number}</span>
            <span className="strip-label">{label}</span>
        </div>
    );
}

function FrameHeader({ title, meta }: { title: string; meta: string }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2 text-foreground">
                <BrandLogo mark className="size-4" />
                {title}
            </span>
            <span>{meta}</span>
        </div>
    );
}

function ScoreFrame({ score }: { score: number }) {
    return (
        <div
            aria-label="Sample ScaleupMap Score for Northwind Robotics"
            className={FRAME_CLASS}
        >
            <FrameHeader
                title="Northwind Robotics"
                meta="Re-scored 2 days ago"
            />
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

function GapsFrame() {
    return (
        <div
            aria-label="Sample gaps for Northwind Robotics"
            className={FRAME_CLASS}
        >
            <FrameHeader title="Northwind Robotics" meta="3 gaps open" />
            <ul>
                {GAP_FLAGS.map((gap) => (
                    <li
                        key={gap.area}
                        className="flex flex-col gap-1 border-b border-rule px-5 py-4 transition-colors duration-100 last:border-b-0 hover:bg-subtle sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
                    >
                        <span className="font-mono text-xs text-muted-foreground">
                            {gap.area}
                        </span>
                        <span className="text-sm font-medium">{gap.flag}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function MemoFrame() {
    return (
        <article
            aria-label="Sample investment memo for Northwind Robotics"
            className={FRAME_CLASS}
        >
            <FrameHeader title="Investment memo" meta="Northwind Robotics" />
            <div className="flex flex-col gap-5 p-5 text-sm sm:p-6">
                <div>
                    <h3 className="font-medium">Summary</h3>
                    <p className="mt-2 text-muted-foreground">
                        Seed-stage robotics for warehouse picking. Score 72, up
                        6 since last month. Traction is the weakest area at 7 of
                        20.
                    </p>
                </div>
                <div>
                    <h3 className="font-medium">
                        Questions investors will ask
                    </h3>
                    <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5 text-muted-foreground">
                        <li>What share of pilots convert to paid contracts?</li>
                        <li>
                            Who writes the firmware if the lead engineer leaves?
                        </li>
                    </ol>
                </div>
            </div>
        </article>
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
