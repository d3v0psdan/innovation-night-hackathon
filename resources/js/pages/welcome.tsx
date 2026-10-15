import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    ChartBar,
    CreditCard,
    Eye,
    FileText,
    Flag,
    Lightning,
    MapTrifold,
    Plus,
    Timer,
    UserCircle,
    UsersThree,
    type Icon,
} from '@phosphor-icons/react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { BrandLogo } from '@/components/brand-logo';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';

type ToolKey = 'score' | 'memo' | 'investors' | 'map' | 'sprint';

type Tool = {
    key: ToolKey;
    title: string;
    blurb: string;
    firstAction: string;
    icon: Icon;
};

type JourneyStage = {
    label: string;
    toolKeys: ToolKey[];
};

// Board order is the journey order: the recommended path runs left to right.
const TOOLS: Tool[] = [
    {
        key: 'score',
        title: 'ScaleupMap Score',
        blurb: 'See your venture the way investors do and fix the blind spots first.',
        firstAction:
            'Answer the 12 score questions about your venture. About 10 minutes.',
        icon: ChartBar,
    },
    {
        key: 'memo',
        title: 'Investment memo',
        blurb: 'Turn your venture into the one page investors ask for.',
        firstAction:
            'Fill in the problem, solution and traction sections. About 20 minutes.',
        icon: FileText,
    },
    {
        key: 'investors',
        title: 'Investor directory',
        blurb: 'Browse investors and grants that match your stage.',
        firstAction:
            'Filter by your stage and save three investors to your shortlist.',
        icon: UsersThree,
    },
    {
        key: 'map',
        title: 'Journey map',
        blurb: 'Map where you are and the next three moves before you build more.',
        firstAction:
            'Place your venture on the map and pick your next milestone.',
        icon: MapTrifold,
    },
    {
        key: 'sprint',
        title: 'North Star Sprint',
        blurb: 'One metric, one week, a daily plan to move it.',
        firstAction:
            'Pick the one metric that matters this week and set a target.',
        icon: Lightning,
    },
];

// Stage labels match onboarding question "journey_stage" in app/Onboarding/questions.php.
const JOURNEY_STAGES: JourneyStage[] = [
    { label: 'Looking for an idea', toolKeys: ['map', 'score'] },
    { label: 'Building an MVP', toolKeys: ['score', 'sprint'] },
    { label: 'Early traction', toolKeys: ['memo', 'sprint'] },
    {
        label: 'Raising a first round',
        toolKeys: ['score', 'memo', 'investors'],
    },
    { label: 'Scaling after seed', toolKeys: ['investors', 'map', 'sprint'] },
    { label: 'Pivoting', toolKeys: ['map', 'score', 'sprint'] },
];

const STAGE_KEY_DIRECTIONS: Record<string, number | undefined> = {
    ArrowDown: 1,
    ArrowRight: 1,
    ArrowUp: -1,
    ArrowLeft: -1,
};

type FlagKey = 'team' | 'traction' | 'market' | 'fundability';

type ProfileRow = {
    key: FlagKey;
    label: string;
    value: string;
    gap: string;
    question: string;
};

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

const SAMPLE_SCORE = 72;
const FLIP_DURATION_MS = 600;
const COUNT_DURATION_MS = 900;
// Starts the count when the card is edge-on, so the number is visible while it climbs.
const COUNT_DELAY_MS = FLIP_DURATION_MS / 2;
const GAP_DETAIL_ID = 'investor-gap-detail';
const TOGGLE_BUTTON_CLASS =
    'inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors duration-100 ease-fast';

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

type DemoKey = 'score' | 'gaps' | 'memo';

const OUTCOMES: { demo: DemoKey; title: string; text: string }[] = [
    {
        demo: 'score',
        title: 'A score',
        text: 'One number out of 100 that moves as your venture does. Six months from raising or walking into a meeting tomorrow, it reflects your current state, not a stale snapshot.',
    },
    {
        demo: 'gaps',
        title: 'Gaps, named',
        text: 'The 11 red flags VCs look for, in team, traction, market and fundability. You see them before you walk into the room.',
    },
    {
        demo: 'memo',
        title: 'An investment memo',
        text: 'The memo and tearsheet investors ask for, written the way a fund analyst writes them, ready in 10 to 15 minutes. Includes the follow-up questions they will ask.',
    },
];

// Sample dimension scores for the score demo, same venture as the hero card.
const DIMENSIONS = [
    { label: 'Team', value: 58 },
    { label: 'Traction', value: 64 },
    { label: 'Market', value: 81 },
    { label: 'Fundability', value: 42 },
];

// Memo demo shows section names with placeholder lines, so the document never goes stale.
const MEMO_SECTIONS = [
    { label: 'Problem', lines: ['w-full', 'w-11/12', 'w-2/3'] },
    { label: 'Solution', lines: ['w-full', 'w-3/4'] },
    { label: 'Traction', lines: ['w-10/12', 'w-1/2'] },
];

// The four questions a founder asks before signing up, per the landing page teardown.
const FAQ = [
    {
        question: 'What do I need to upload?',
        answer: 'A pitch deck or any company document. No deck yet? Answer the questions instead and the score still runs.',
    },
    {
        question: 'How long does it take?',
        answer: 'First score in under 2 minutes. The memo and tearsheet take 10 to 15 minutes more.',
    },
    {
        question: 'Who sees my data?',
        answer: 'You do. Your venture profile is private by default. You choose when to share a memo or send an application.',
    },
    {
        question: 'Is my score shared with investors?',
        answer: 'Not unless you apply. An investor on ScaleupMap sees your score only when you send them an application.',
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

const FOOTER_LINKS = [
    { label: 'Pricing', href: 'https://scaleupmap.com/billing' },
    {
        label: 'Community',
        href: 'https://join.slack.com/t/scaleupmapcom-xau9343/shared_invite/zt-4akgv5h2b-l9K51CXAsoye1WigWMG7MA',
    },
    { label: 'One-pager', href: 'https://scaleupmap.com/one-pager' },
    { label: 'Contact', href: 'https://scaleupmap.com/contact' },
    { label: 'Terms', href: 'https://scaleupmap.com/tos' },
    { label: 'Privacy', href: 'https://scaleupmap.com/privacy' },
    { label: 'About', href: 'https://scaleupmap.com/about' },
];

const LOGO_IMAGE_CLASS =
    'w-auto opacity-70 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0 dark:invert dark:hover:invert-0';

const BOARD_PERSPECTIVE_CLASS = 'lg:perspective-[2000px]';
const BOARD_PLANE_CLASS = 'lg:origin-top lg:transform-3d lg:rotate-x-[16deg]';
// Feature demos sit on the same tilted plane as the tools board and settle flat on hover.
const DEMO_PERSPECTIVE_CLASS = 'perspective-[1600px]';
const DEMO_PLANE_CLASS =
    'origin-top transform-3d rotate-x-[14deg] transition-transform duration-300 ease-entrance group-hover:rotate-x-0 motion-reduce:transition-none';

/** Horizontal centre of a tool tile on the board, as a percentage of the board width. */
function toolCentrePercent(toolIndex: number): number {
    return ((toolIndex + 0.5) / TOOLS.length) * 100;
}

export default function Welcome() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();
    const [activeStageIndex, setActiveStageIndex] = useState(0);
    const [isInvestorView, setIsInvestorView] = useState(false);
    const [openFlag, setOpenFlag] = useState<FlagKey | null>(null);
    const score = useCountUp(SAMPLE_SCORE, isInvestorView);
    const stageButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const activeStage = JOURNEY_STAGES[activeStageIndex];
    const stops = TOOLS.flatMap((tool, toolIndex) =>
        activeStage.toolKeys.includes(tool.key) ? [{ toolIndex }] : [],
    );
    const pathPoints = stops
        .map(({ toolIndex }) => `${toolCentrePercent(toolIndex)},5`)
        .join(' ');

    function handleStageKeyDown(
        event: KeyboardEvent<HTMLButtonElement>,
        stageIndex: number,
    ) {
        const direction = STAGE_KEY_DIRECTIONS[event.key];
        if (direction === undefined) {
            return;
        }
        event.preventDefault();
        const nextIndex =
            (stageIndex + direction + JOURNEY_STAGES.length) %
            JOURNEY_STAGES.length;
        setActiveStageIndex(nextIndex);
        stageButtonRefs.current[nextIndex]?.focus();
    }

    return (
        <>
            <Head title="See your startup the way investors do" />
            <div className="min-h-screen bg-background text-foreground">
                <div className="mx-auto max-w-7xl border-x border-rule">
                    <header className="flex h-16 items-center justify-between border-b border-rule px-6">
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
                                <h1 className="max-w-4xl enter text-4xl leading-none font-medium tracking-[-0.05em] text-balance enter-1 sm:text-5xl lg:text-6xl">
                                    See your startup the way investors do.
                                </h1>
                                <p className="mt-6 max-w-[34rem] enter text-lg text-muted-foreground enter-2">
                                    Built for first-time founders. Get the score
                                    a VC analyst would give you, see the gaps
                                    they would flag, and fix them before you
                                    pitch.
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
                                        What investors see
                                    </a>
                                </div>
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

                        <section className="border-t border-rule px-6 py-12">
                            <p
                                id="stage-question"
                                className="text-sm font-medium"
                            >
                                Where is your venture right now?
                            </p>
                            <div
                                role="group"
                                aria-labelledby="stage-question"
                                className="mt-6"
                            >
                                <ol className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
                                    {JOURNEY_STAGES.map((stage, stageIndex) => {
                                        const isActive =
                                            stageIndex === activeStageIndex;
                                        return (
                                            <li key={stage.label}>
                                                <button
                                                    type="button"
                                                    ref={(element) => {
                                                        stageButtonRefs.current[
                                                            stageIndex
                                                        ] = element;
                                                    }}
                                                    aria-pressed={isActive}
                                                    onClick={() =>
                                                        setActiveStageIndex(
                                                            stageIndex,
                                                        )
                                                    }
                                                    onMouseEnter={() =>
                                                        setActiveStageIndex(
                                                            stageIndex,
                                                        )
                                                    }
                                                    onKeyDown={(event) =>
                                                        handleStageKeyDown(
                                                            event,
                                                            stageIndex,
                                                        )
                                                    }
                                                    className={cn(
                                                        'flex w-full flex-col items-start gap-2 border-t-2 pt-3 text-left text-sm font-medium transition-colors duration-100',
                                                        isActive
                                                            ? 'border-brand text-foreground'
                                                            : 'border-rule text-muted-foreground hover:text-foreground',
                                                    )}
                                                >
                                                    <span className="strip-number">
                                                        {String(
                                                            stageIndex + 1,
                                                        ).padStart(2, '0')}
                                                    </span>
                                                    {stage.label}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </section>

                        <section className="px-6 pb-20">
                            <h2 aria-live="polite" className="strip-label">
                                Tools for {activeStage.label}
                            </h2>
                            <div
                                className={cn(
                                    'mt-6 rounded-2xl border border-rule bg-dot-grid p-4 sm:p-6 lg:p-12',
                                    BOARD_PERSPECTIVE_CLASS,
                                )}
                            >
                                <div className={BOARD_PLANE_CLASS}>
                                    <ul className="grid gap-3 lg:grid-cols-5 lg:gap-5 lg:transform-3d">
                                        {TOOLS.map((tool, toolIndex) => {
                                            const isRecommended =
                                                activeStage.toolKeys.includes(
                                                    tool.key,
                                                );
                                            const ToolIcon = tool.icon;
                                            return (
                                                <li
                                                    key={tool.key}
                                                    className={cn(
                                                        'group rounded-xl border bg-background p-5 transition-[translate,box-shadow,border-color,opacity] duration-200 motion-reduce:transition-none',
                                                        isRecommended
                                                            ? 'border-brand/40 shadow-card ring-1 ring-brand/10 lg:translate-z-10'
                                                            : 'border-border lg:translate-z-0 lg:hover:translate-z-6 lg:hover:shadow-card',
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                                                            {String(
                                                                toolIndex + 1,
                                                            ).padStart(2, '0')}
                                                        </span>
                                                        {isRecommended ? (
                                                            <span className="rounded-md bg-navy-3 px-2 py-0.5 font-mono text-xs font-semibold text-brand">
                                                                Next
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                    <span className="mt-6 flex size-9 items-center justify-center rounded-lg bg-navy-3 text-brand">
                                                        <ToolIcon
                                                            weight="bold"
                                                            aria-hidden="true"
                                                            className="size-5"
                                                        />
                                                    </span>
                                                    <h3 className="mt-3 text-lg font-medium">
                                                        {tool.title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        {tool.blurb}
                                                    </p>
                                                    <p
                                                        className={cn(
                                                            'mt-4 border-t border-rule pt-3 text-sm',
                                                            !isRecommended &&
                                                                'lg:hidden lg:group-hover:block',
                                                        )}
                                                    >
                                                        <span className="font-medium">
                                                            First step.
                                                        </span>{' '}
                                                        {tool.firstAction}
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div
                                        aria-hidden="true"
                                        className="relative mt-6 hidden h-10 lg:block"
                                    >
                                        <svg
                                            viewBox="0 0 100 10"
                                            preserveAspectRatio="none"
                                            className="absolute inset-0 size-full overflow-visible"
                                        >
                                            <polyline
                                                points={pathPoints}
                                                vectorEffect="non-scaling-stroke"
                                                className="fill-none stroke-brand stroke-2"
                                            />
                                        </svg>
                                        {stops.map(({ toolIndex }) => (
                                            <span
                                                key={toolIndex}
                                                className="absolute top-1/2 size-2.5 -translate-1/2 rounded-full bg-brand"
                                                style={{
                                                    left: `${toolCentrePercent(toolIndex)}%`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <ul className="grid border-y border-rule sm:grid-cols-2 lg:grid-cols-4">
                            {PROOF.map(({ icon: ProofIcon, text }) => (
                                <li
                                    key={text}
                                    className="flex items-center gap-3 border-b border-rule p-6 text-base font-medium last:border-b-0 sm:border-r sm:nth-[2n]:border-r-0 lg:border-b-0 lg:last:border-r-0 lg:nth-[2n]:border-r"
                                >
                                    <ProofIcon
                                        weight="bold"
                                        aria-hidden="true"
                                        className="size-5 shrink-0 text-brand"
                                    />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <div className="border-b border-rule">
                            <p className="px-6 pt-10 text-center text-sm font-medium text-muted-foreground">
                                Founders at these companies scored first
                            </p>
                            <div className="overflow-hidden marquee-mask py-10">
                                <ul
                                    aria-label="Customer logos"
                                    className="marquee items-center gap-20 pr-20"
                                >
                                    {[...CUSTOMERS, ...CUSTOMERS].map(
                                        (logo, index) => (
                                            <li
                                                key={`${logo.name}-${index}`}
                                                aria-hidden={
                                                    index >= CUSTOMERS.length
                                                }
                                                className="flex h-16 shrink-0 items-center"
                                            >
                                                <img
                                                    src={`/brand/logos/${logo.file}`}
                                                    alt={logo.name}
                                                    className={LOGO_IMAGE_CLASS}
                                                    style={{
                                                        height: `${3.5 * (logo.scale ?? 1)}rem`,
                                                    }}
                                                />
                                            </li>
                                        ),
                                    )}
                                </ul>
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

                        <section className="border-t border-rule">
                            <div className="px-6 pt-20 pb-12">
                                <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                    What you get
                                </h2>
                                <p className="mt-5 max-w-[42rem] text-lg text-muted-foreground">
                                    Three things you walk out with, all built
                                    from the same answers. Every one is live
                                    product UI, not a screenshot.
                                </p>
                            </div>
                            <ul className="grid border-t border-rule lg:grid-cols-3 lg:divide-x lg:divide-rule">
                                {OUTCOMES.map((outcome) => (
                                    <li
                                        key={outcome.title}
                                        className="group flex flex-col gap-8 border-b border-rule p-6 last:border-b-0 lg:border-b-0 lg:p-8"
                                    >
                                        <div>
                                            <h3 className="text-xl font-medium">
                                                {outcome.title}
                                            </h3>
                                            <p className="mt-2 text-muted-foreground">
                                                {outcome.text}
                                            </p>
                                        </div>
                                        <DemoFrame>
                                            {outcome.demo === 'score' && (
                                                <ScoreDemo />
                                            )}
                                            {outcome.demo === 'gaps' && (
                                                <GapsDemo />
                                            )}
                                            {outcome.demo === 'memo' && (
                                                <MemoDemo />
                                            )}
                                        </DemoFrame>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="border-t border-rule px-6 py-20">
                            <h2 className="text-3xl leading-tight font-medium tracking-[-0.02em] lg:text-[2.5rem]">
                                Before you sign up
                            </h2>
                            <div className="mt-12 max-w-3xl divide-y divide-rule border-y border-rule">
                                {FAQ.map((item) => (
                                    <details
                                        key={item.question}
                                        className="group/faq"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium transition-colors duration-100 hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
                                            {item.question}
                                            <Plus
                                                weight="bold"
                                                aria-hidden="true"
                                                className="size-4 shrink-0 text-brand transition-transform duration-200 group-open/faq:rotate-45"
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

                    <div className="flex flex-col gap-4 border-t border-rule px-6 py-6 sm:flex-row sm:items-center sm:gap-10">
                        <p className="shrink-0 text-sm text-muted-foreground">
                            Supported by
                        </p>
                        <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
                            {BACKERS.map((logo) => (
                                <li
                                    key={logo.name}
                                    className="flex h-7 items-center"
                                >
                                    <img
                                        src={`/brand/logos/${logo.file}`}
                                        alt={logo.name}
                                        className="h-6 w-auto opacity-60 grayscale transition-opacity duration-100 hover:opacity-100 dark:invert"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <footer className="grid gap-8 border-t border-rule px-6 py-10 text-sm text-muted-foreground lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-12">
                        <div className="flex flex-col items-start gap-4">
                            <BrandLogo className="h-6 w-auto" />
                            <p className="max-w-sm text-xs leading-relaxed">
                                ScaleupMap Score is a trademark of ScaleupMap.
                                Copyright 2026 ScaleupMap. All rights reserved.
                            </p>
                        </div>
                        <nav
                            aria-label="Footer"
                            className="flex flex-wrap gap-x-6 gap-y-3"
                        >
                            {FOOTER_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="transition-colors duration-100 hover:text-foreground"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <AppearanceToggleTab className="w-fit" />
                    </footer>
                </div>
            </div>
        </>
    );
}

/** Tilted stage for a feature demo. The demo itself is live markup, so it never goes stale. */
function DemoFrame({ children }: { children: ReactNode }) {
    return (
        <div
            className={cn(
                'mt-auto rounded-xl bg-dot-grid p-4 pb-0 sm:p-6 sm:pb-0',
                DEMO_PERSPECTIVE_CLASS,
            )}
        >
            <div
                className={cn(
                    'overflow-hidden rounded-t-lg border border-b-0 border-border bg-background shadow-card',
                    DEMO_PLANE_CLASS,
                )}
            >
                {children}
            </div>
        </div>
    );
}

function DemoHeader({ title, meta }: { title: string; meta: string }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2 text-foreground">
                <BrandLogo mark className="size-3.5" />
                {title}
            </span>
            <span>{meta}</span>
        </div>
    );
}

function ScoreDemo() {
    return (
        <div aria-label="Score dashboard preview">
            <DemoHeader title="ScaleupMap Score" meta="re-scored 2 min ago" />
            <div className="flex items-end justify-between gap-4 p-4">
                <p>
                    <span className="score text-5xl">{SAMPLE_SCORE}</span>
                    <span className="block font-mono text-xs text-muted-foreground">
                        of 100
                    </span>
                </p>
                <p className="rounded-md bg-navy-3 px-2 py-0.5 font-mono text-xs font-semibold text-brand">
                    +6 this week
                </p>
            </div>
            <dl className="flex flex-col gap-3 px-4 pb-4">
                {DIMENSIONS.map((dimension) => (
                    <div key={dimension.label}>
                        <div className="flex justify-between text-xs">
                            <dt className="text-muted-foreground">
                                {dimension.label}
                            </dt>
                            <dd className="font-mono tabular-nums">
                                {dimension.value}
                            </dd>
                        </div>
                        <div
                            aria-hidden="true"
                            className="mt-1 h-1.5 rounded-full bg-subtle"
                        >
                            <div
                                className="h-full rounded-full bg-brand"
                                style={{ width: `${dimension.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </dl>
        </div>
    );
}

function GapsDemo() {
    return (
        <div aria-label="Red flags preview">
            <DemoHeader
                title="Red flags"
                meta={`${PROFILE_ROWS.length} of 11 raised`}
            />
            <ul className="divide-y divide-rule">
                {PROFILE_ROWS.map((row) => (
                    <li
                        key={row.key}
                        className="flex items-start gap-3 px-4 py-3"
                    >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground">
                            <Flag
                                weight="bold"
                                aria-hidden="true"
                                className="size-3"
                            />
                        </span>
                        <span className="min-w-0 text-sm">
                            <span className="block font-medium">{row.gap}</span>
                            <span className="block truncate text-xs text-muted-foreground">
                                {row.label}: {row.value}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function MemoDemo() {
    return (
        <div aria-label="Investment memo preview">
            <DemoHeader title="Investment memo" meta="draft, 12 min" />
            <div className="p-4">
                <p className="text-sm font-medium">{VENTURE.name}</p>
                <p className="text-xs text-muted-foreground">{VENTURE.stage}</p>
                <dl className="mt-4 flex flex-col gap-4">
                    {MEMO_SECTIONS.map((section) => (
                        <div key={section.label}>
                            <dt className="font-mono text-xs text-brand uppercase">
                                {section.label}
                            </dt>
                            <dd
                                aria-hidden="true"
                                className="mt-1.5 flex flex-col gap-1.5"
                            >
                                {section.lines.map((width) => (
                                    <span
                                        key={width}
                                        className={cn(
                                            'block h-2 rounded-full bg-subtle',
                                            width,
                                        )}
                                    />
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
                <div className="mt-4 border-t border-rule pt-3 text-xs">
                    <p className="font-medium">Follow-up questions</p>
                    <p className="mt-1 text-muted-foreground">
                        {PROFILE_ROWS[0].question}
                    </p>
                </div>
            </div>
        </div>
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
                'col-start-1 row-start-1 flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-card backface-hidden',
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
            className="absolute top-3 right-0 flex size-7 items-center justify-center rounded-lg bg-brand text-brand-foreground transition-colors duration-100 hover:bg-brand-hover"
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
