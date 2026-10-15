import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    Check,
    CreditCard,
    FileText,
    Globe,
    Timer,
    TrendUp,
    Users,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { BrandLogo } from '@/components/brand-logo';
import { dashboard, login, register } from '@/routes';

type GapKey = 'team' | 'traction' | 'market' | 'fundability';

type Gap = {
    key: GapKey;
    label: string;
    icon: typeof Users;
    max: number;
    nextTool: string;
};

const GAP_MAX_POINTS = 25;

const GAPS: Gap[] = [
    {
        key: 'team',
        label: 'Team',
        icon: Users,
        max: GAP_MAX_POINTS,
        nextTool: 'North Star Sprint',
    },
    {
        key: 'traction',
        label: 'Traction',
        icon: TrendUp,
        max: GAP_MAX_POINTS,
        nextTool: 'Journey map',
    },
    {
        key: 'market',
        label: 'Market',
        icon: Globe,
        max: GAP_MAX_POINTS,
        nextTool: 'Investor directory',
    },
    {
        key: 'fundability',
        label: 'Fundability',
        icon: Bank,
        max: GAP_MAX_POINTS,
        nextTool: 'Investment memo',
    },
];

// Sample venture shown on first load. Pure data, so it never goes stale.
const SAMPLE_VENTURE = 'Northwind Robotics';
const BASELINE_POINTS: Record<GapKey, number> = {
    team: 12,
    traction: 9,
    market: 15,
    fundability: 18,
};

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

const SCORE_COUNT_MS = 500;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function Landing2() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();

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
                        <section className="px-6 pt-16 pb-12 text-center sm:pt-28">
                            <h1 className="mx-auto max-w-3xl enter text-4xl leading-none font-medium tracking-[-0.05em] text-balance enter-1 sm:text-5xl lg:text-6xl">
                                See your startup the way investors do.
                            </h1>
                            <p className="mx-auto mt-6 max-w-[34rem] enter text-lg text-muted-foreground enter-2">
                                Built for first-time founders. Get the score a
                                VC analyst would give you, see the gaps they
                                would flag, and fix them before you pitch. First
                                score in under 2 minutes.
                            </p>
                            <div className="mt-8 flex enter flex-col items-center gap-3 enter-3">
                                <Link href={cta} className="btn-ink h-10">
                                    Score my startup free
                                    <ArrowRight
                                        weight="bold"
                                        className="size-4"
                                    />
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    No credit card. Only a deck or company doc
                                    needed.
                                </p>
                            </div>
                        </section>

                        <section
                            id="sample-score"
                            className="enter border-y border-rule bg-dot-grid px-4 py-12 enter-4 sm:px-10 sm:py-16"
                        >
                            <ScoreWidget />
                        </section>

                        <ul className="grid border-b border-rule sm:grid-cols-2 lg:grid-cols-4">
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

                        <ul
                            aria-label="Founders at these companies scored first"
                            className="grid grid-cols-2 border-b border-rule sm:grid-cols-3 lg:grid-cols-6"
                        >
                            <li className="flex items-center border-r border-b border-rule p-6 text-sm font-medium">
                                Founders at these companies scored first
                            </li>
                            {CUSTOMERS.map((logo) => (
                                <li
                                    key={logo.name}
                                    className="flex h-24 items-center justify-center border-r border-b border-rule p-6"
                                >
                                    <img
                                        src={`/brand/logos/${logo.file}`}
                                        alt={logo.name}
                                        className={LOGO_IMAGE_CLASS}
                                    />
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
                            <dl className="mt-12 max-w-3xl divide-y divide-rule border-y border-rule">
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

/** The live Score. Gap points drive the total, the bars and the "Next up" tool. A chip and a slider edit the same points. */
function ScoreWidget() {
    const [points, setPoints] =
        useState<Record<GapKey, number>>(BASELINE_POINTS);

    const total = GAPS.reduce((sum, gap) => sum + points[gap.key], 0);
    const shownScore = useCountTo(total);
    const biggestGap = findBiggestGap(points);

    function setGapPoints(key: GapKey, value: number) {
        setPoints((previous) => ({ ...previous, [key]: value }));
    }

    function toggleGap(gap: Gap) {
        const isClosed = points[gap.key] === gap.max;
        setGapPoints(gap.key, isClosed ? BASELINE_POINTS[gap.key] : gap.max);
    }

    return (
        <div className="mx-auto max-w-3xl [perspective:1200px]">
            <div className="rounded-lg border border-border bg-background shadow-card transition-[transform,box-shadow] duration-200 ease-out [transform-style:preserve-3d] hover:-translate-y-1 hover:[transform:translateZ(24px)] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:[transform:none]">
                <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-2 text-foreground">
                        <BrandLogo mark className="size-4" />
                        {SAMPLE_VENTURE}
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
                                {shownScore}
                            </span>
                            <span className="text-muted-foreground">
                                of 100
                            </span>
                        </p>
                    </div>

                    <ul className="flex flex-col justify-center gap-5">
                        {GAPS.map((gap) => (
                            <GapRow
                                key={gap.key}
                                gap={gap}
                                points={points[gap.key]}
                                isClosed={points[gap.key] === gap.max}
                                onPointsChange={(value) =>
                                    setGapPoints(gap.key, value)
                                }
                                onToggle={() => toggleGap(gap)}
                            />
                        ))}
                    </ul>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-rule px-5 py-4 text-sm sm:px-6">
                    <span className="text-muted-foreground">Next up</span>
                    <span
                        aria-live="polite"
                        className="flex items-center gap-2 font-medium"
                    >
                        {biggestGap
                            ? biggestGap.nextTool
                            : 'All four gaps closed'}
                        {biggestGap && (
                            <ArrowRight
                                weight="bold"
                                className="size-4 text-brand"
                            />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

type GapRowProps = {
    gap: Gap;
    points: number;
    isClosed: boolean;
    onPointsChange: (value: number) => void;
    onToggle: () => void;
};

function GapRow({
    gap,
    points,
    isClosed,
    onPointsChange,
    onToggle,
}: GapRowProps) {
    const inputId = `gap-${gap.key}`;
    const fillPercent = Math.round((points / gap.max) * 100);
    const GapIcon = gap.icon;

    return (
        <li className="grid gap-2 text-sm sm:grid-cols-[7.5rem_1fr_auto] sm:items-center sm:gap-4">
            <label
                htmlFor={inputId}
                className="flex items-center gap-2 font-medium"
            >
                <GapIcon
                    weight="bold"
                    aria-hidden="true"
                    className="size-5 text-brand"
                />
                {gap.label}
            </label>
            <input
                id={inputId}
                type="range"
                min={0}
                max={gap.max}
                step={1}
                value={points}
                onChange={(event) => onPointsChange(Number(event.target.value))}
                className="w-full accent-brand"
            />
            <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {points} / {gap.max}
                </span>
                <button
                    type="button"
                    aria-pressed={isClosed}
                    aria-label={`${gap.label} gap closed`}
                    onClick={onToggle}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors duration-100 hover:bg-subtle aria-pressed:border-brand aria-pressed:bg-navy-3 aria-pressed:text-brand"
                >
                    {isClosed && (
                        <Check
                            weight="bold"
                            aria-hidden="true"
                            className="size-4"
                        />
                    )}
                    {isClosed ? 'Closed' : 'Close'}
                </button>
            </div>
            <div
                aria-hidden="true"
                className="h-1.5 w-full rounded-sm bg-subtle sm:col-span-3"
            >
                <div
                    className="h-full rounded-sm bg-brand transition-[width] duration-500 ease-out motion-reduce:transition-none"
                    style={{ width: `${fillPercent}%` }}
                />
            </div>
        </li>
    );
}

/** The gap furthest below its maximum, so "Next up" names the tool for the largest remaining deficit. Null when every gap is closed. */
function findBiggestGap(points: Record<GapKey, number>): Gap | null {
    const openGaps = GAPS.filter((gap) => points[gap.key] < gap.max);
    if (openGaps.length === 0) {
        return null;
    }
    return openGaps.reduce((worst, gap) =>
        gap.max - points[gap.key] > worst.max - points[worst.key] ? gap : worst,
    );
}

/** Counts from the previous value to the target, ease-out, about SCORE_COUNT_MS. Starts at 0 on mount. Jumps when the OS asks for reduced motion. */
function useCountTo(target: number): number {
    const [shown, setShown] = useState(0);
    const shownRef = useRef(0);

    useEffect(() => {
        const from = shownRef.current;
        if (from === target) {
            return;
        }
        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
            shownRef.current = target;
            setShown(target);
            return;
        }
        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / SCORE_COUNT_MS);
            const value = Math.round(
                from + (target - from) * (1 - Math.pow(1 - progress, 3)),
            );
            shownRef.current = value;
            setShown(value);
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target]);

    return shown;
}
