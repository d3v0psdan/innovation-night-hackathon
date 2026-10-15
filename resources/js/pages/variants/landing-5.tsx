import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    CreditCard,
    Eye,
    FileText,
    Flag,
    Timer,
    UserCircle,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { BrandLogo } from '@/components/brand-logo';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';

type FlagKey = 'team' | 'traction' | 'market' | 'fundability';

type ProfileRow = {
    key: FlagKey;
    label: string;
    value: string;
    gap: string;
    question: string;
};

const PROOF = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: FileText, text: 'Only a deck or company doc needed' },
    { icon: Timer, text: 'First score in under 2 minutes' },
    { icon: Bank, text: 'Model built inside a VC fund' },
];

// Sample venture shown on both faces of the card. Pure markup, so it never goes stale.
const VENTURE = {
    name: 'Northwind Robotics',
    stage: 'Pre-seed, 4 people',
    pitch: 'Inspection robots for pipelines that today get walked by hand.',
};

const PROFILE_ROWS: ProfileRow[] = [
    {
        key: 'team',
        label: 'Team',
        value: '2 co-founders, both business side',
        gap: 'No technical co-founder.',
        question: 'Who builds the robots while the CEO is in a sales meeting?',
    },
    {
        key: 'traction',
        label: 'Traction',
        value: '$8.4K MRR from 2 pilots',
        gap: 'Only 3 months of revenue.',
        question: 'What keeps the first customers past month 12?',
    },
    {
        key: 'market',
        label: 'Market',
        value: '$4.2B total market',
        gap: 'TAM unsourced.',
        question: 'Where does $4.2B come from, and how many buyers pay first?',
    },
    {
        key: 'fundability',
        label: 'Fundability',
        value: 'Pitch deck not uploaded',
        gap: 'No deck.',
        question: 'Can you send the deck and memo today?',
    },
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

const SAMPLE_SCORE = 72;
const FLIP_DURATION_MS = 600;
const COUNT_DURATION_MS = 900;
// Starts the count when the card is edge-on, so the number is visible while it climbs.
const COUNT_DELAY_MS = FLIP_DURATION_MS / 2;
const GAP_DETAIL_ID = 'investor-gap-detail';
const TOGGLE_BUTTON_CLASS =
    'inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors duration-100 ease-fast';

export default function Landing5() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();
    const [isInvestorView, setIsInvestorView] = useState(false);
    const [openFlag, setOpenFlag] = useState<FlagKey | null>(null);
    const score = useCountUp(SAMPLE_SCORE, isInvestorView);

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

                            <div
                                id="sample-score"
                                className="flex flex-col gap-6 bg-dot-grid px-6 pt-10 pb-16 lg:px-12 lg:py-24"
                            >
                                <div
                                    role="group"
                                    aria-label="Choose a view"
                                    className="inline-flex w-fit gap-1 rounded-lg bg-subtle p-1"
                                >
                                    <button
                                        type="button"
                                        aria-pressed={!isInvestorView}
                                        onClick={() => setIsInvestorView(false)}
                                        className={cn(
                                            TOGGLE_BUTTON_CLASS,
                                            !isInvestorView
                                                ? 'bg-background text-foreground shadow-card'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        <UserCircle
                                            weight="bold"
                                            className="size-4"
                                        />
                                        What you see
                                    </button>
                                    <button
                                        type="button"
                                        aria-pressed={isInvestorView}
                                        onClick={() => setIsInvestorView(true)}
                                        className={cn(
                                            TOGGLE_BUTTON_CLASS,
                                            isInvestorView
                                                ? 'bg-background text-foreground shadow-card'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        <Eye weight="bold" className="size-4" />
                                        What investors see
                                    </button>
                                </div>

                                <div className="perspective-[1200px]">
                                    <div
                                        className={cn(
                                            'grid transition-transform duration-600 ease-entrance transform-3d motion-reduce:transition-none',
                                            isInvestorView && 'rotate-y-180',
                                        )}
                                    >
                                        <VentureFace
                                            isInvestorView={false}
                                            isHidden={isInvestorView}
                                            score={score}
                                            openFlag={openFlag}
                                            onOpenFlag={setOpenFlag}
                                        />
                                        <VentureFace
                                            isInvestorView
                                            isHidden={!isInvestorView}
                                            score={score}
                                            openFlag={openFlag}
                                            onOpenFlag={setOpenFlag}
                                        />
                                    </div>
                                </div>
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

                        <ul
                            aria-label="Founders at these companies scored first"
                            className="grid grid-cols-2 border-b border-rule sm:grid-cols-3 lg:grid-cols-6"
                        >
                            <li className="flex items-center border-r border-b border-rule p-6 text-sm font-medium lg:border-b-0">
                                Founders at these companies scored first
                            </li>
                            {CUSTOMERS.map((logo, index) => (
                                <li
                                    key={logo.name}
                                    className={`flex h-24 items-center justify-center border-rule p-6 ${index < 5 ? 'border-b' : 'lg:border-b-0'} ${index % 2 === 0 ? 'border-r' : 'sm:border-r'} ${index % 6 === 4 ? 'lg:border-r-0' : 'lg:border-r'}`}
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
                            <ol className="mt-12 border-b border-rule">
                                {STEPS.map((step) => (
                                    <li
                                        key={step.number}
                                        className="grid gap-4 border-t border-rule py-8 md:grid-cols-[12rem_1fr_1.2fr] md:gap-10"
                                    >
                                        <p className="flex h-5 items-center gap-3">
                                            <span className="strip-number">
                                                {step.number}
                                            </span>
                                            <span className="strip-label">
                                                {step.label}
                                            </span>
                                        </p>
                                        <h3 className="text-xl font-medium">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground">
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
                                    <div key={outcome.title} className="py-8">
                                        <dt className="text-xl font-medium">
                                            {outcome.title}
                                        </dt>
                                        <dd className="mt-2 text-lg text-muted-foreground">
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

type VentureFaceProps = {
    isInvestorView: boolean;
    isHidden: boolean;
    score: number;
    openFlag: FlagKey | null;
    onOpenFlag: (flag: FlagKey | null) => void;
};

/** One face of the flip card. Both faces share one grid cell; the hidden face is inert, so it leaves the tab order and the accessibility tree. */
function VentureFace({
    isInvestorView,
    isHidden,
    score,
    openFlag,
    onOpenFlag,
}: VentureFaceProps) {
    const faceLabel = isInvestorView ? 'What investors see' : 'What you see';

    return (
        <section
            aria-label={`${VENTURE.name}, ${faceLabel}`}
            inert={isHidden}
            className={cn(
                'col-start-1 row-start-1 flex flex-col rounded-lg border border-border bg-background backface-hidden',
                isInvestorView && 'rotate-y-180',
            )}
        >
            <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-2 text-foreground">
                    <BrandLogo mark className="size-4" />
                    {VENTURE.name}
                </span>
                <span>{faceLabel}</span>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {VENTURE.stage}
                        </p>
                        <p className="mt-2 text-lg font-medium text-balance">
                            {VENTURE.pitch}
                        </p>
                    </div>
                    {isInvestorView && (
                        <p className="shrink-0 text-right">
                            <span className="score text-6xl sm:text-7xl">
                                {score}
                            </span>
                            <span className="block font-mono text-xs text-muted-foreground">
                                of 100
                            </span>
                        </p>
                    )}
                </div>

                <dl className="divide-y divide-rule border-y border-rule">
                    {PROFILE_ROWS.map((row) => (
                        <div key={row.key} className="relative py-4 pr-10">
                            <dt className="text-sm text-muted-foreground">
                                {row.label}
                            </dt>
                            <dd className="mt-1 font-medium">{row.value}</dd>
                            {isInvestorView && (
                                <FlagMarker
                                    flag={row}
                                    isOpen={openFlag === row.key}
                                    onOpen={onOpenFlag}
                                />
                            )}
                        </div>
                    ))}
                </dl>

                {isInvestorView && (
                    <div
                        id={GAP_DETAIL_ID}
                        aria-live="polite"
                        className="mt-auto min-h-24 text-sm"
                    >
                        <GapDetail
                            row={PROFILE_ROWS.find(
                                (row) => row.key === openFlag,
                            )}
                        />
                    </div>
                )}
            </div>

            {!isInvestorView && (
                <div className="flex items-center justify-between border-t border-rule px-5 py-4 text-sm sm:px-6">
                    <span className="text-muted-foreground">Next up</span>
                    <span className="flex items-center gap-2 font-medium">
                        Investment memo
                        <ArrowRight
                            weight="bold"
                            className="size-4 text-brand"
                        />
                    </span>
                </div>
            )}
        </section>
    );
}

type FlagMarkerProps = {
    flag: ProfileRow;
    isOpen: boolean;
    onOpen: (flag: FlagKey | null) => void;
};

/** Hover or focus shows the gap, a click or tap pins it, Escape or leaving closes it. */
function FlagMarker({ flag, isOpen, onOpen }: FlagMarkerProps) {
    return (
        <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={GAP_DETAIL_ID}
            aria-label={`${flag.label} flag: ${flag.gap}`}
            onMouseEnter={() => onOpen(flag.key)}
            onMouseLeave={() => onOpen(null)}
            onFocus={() => onOpen(flag.key)}
            onBlur={() => onOpen(null)}
            onClick={() => onOpen(flag.key)}
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    onOpen(null);
                }
            }}
            className="absolute top-3 right-0 flex size-7 items-center justify-center rounded-md bg-brand text-brand-foreground transition-colors duration-100 hover:bg-brand-hover"
        >
            <Flag weight="bold" className="size-4" />
        </button>
    );
}

function GapDetail({ row }: { row: ProfileRow | undefined }) {
    if (!row) {
        return (
            <p className="text-muted-foreground">
                Hover or tap a flag to see the gap an investor will name and the
                question they will ask next.
            </p>
        );
    }

    return (
        <>
            <p className="font-medium text-brand">{row.gap}</p>
            <p className="mt-1 text-muted-foreground">
                An investor asks: {row.question}
            </p>
        </>
    );
}

/** Counts from 0 to the target once each time isActive turns on, ease-out. Jumps to the target under reduced motion. */
function useCountUp(target: number, isActive: boolean): number {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isActive) {
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
            return;
        }
        const start = performance.now() + COUNT_DELAY_MS;
        let frame = requestAnimationFrame(function tick(now) {
            const progress = Math.min(
                1,
                Math.max(0, (now - start) / COUNT_DURATION_MS),
            );
            setValue(Math.round(target * (1 - (1 - progress) ** 3)));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [target, isActive]);

    return value;
}
