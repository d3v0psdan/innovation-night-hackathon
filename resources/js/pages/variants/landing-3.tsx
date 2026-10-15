import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bank,
    ChartBar,
    CreditCard,
    FileText,
    Lightning,
    MapTrifold,
    Timer,
    UsersThree,
    type Icon,
} from '@phosphor-icons/react';
import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
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

const BOARD_PERSPECTIVE_CLASS = 'lg:perspective-[1400px]';
const BOARD_PLANE_CLASS =
    'lg:transform-3d lg:rotate-x-[50deg] lg:-rotate-y-[14deg]';

/** Horizontal centre of a tool tile on the board, as a percentage of the board width. */
function toolCentrePercent(toolIndex: number): number {
    return ((toolIndex + 0.5) / TOOLS.length) * 100;
}

export default function Landing3() {
    const { auth } = usePage().props;
    const cta = auth.user ? dashboard() : register();
    const [activeStageIndex, setActiveStageIndex] = useState(0);
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
                            <AppearanceToggleTab compact />
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="btn-outline h-8"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="transition-colors duration-100 hover:text-muted-foreground"
                                >
                                    Sign in
                                </Link>
                            )}
                        </nav>
                    </header>

                    <main>
                        <section className="px-6 pt-16 pb-12 sm:pt-24 lg:pt-30">
                            <h1 className="max-w-4xl enter text-4xl leading-none font-medium tracking-[-0.05em] text-balance enter-1 sm:text-5xl lg:text-6xl">
                                See your startup the way investors do.
                            </h1>
                            <p className="mt-6 max-w-[34rem] enter text-lg text-muted-foreground enter-2">
                                Founder, pick where you are. Get the score a VC
                                analyst would give you, see the gaps they would
                                flag, and fix them before you pitch. First score
                                in under 2 minutes.
                            </p>
                            <div className="mt-8 enter enter-3">
                                <Link href={cta} className="btn-ink h-10">
                                    Score my startup free
                                    <ArrowRight
                                        weight="bold"
                                        className="size-4"
                                    />
                                </Link>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">
                                No credit card. Only a deck or company doc
                                needed.
                            </p>
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
                            <p aria-live="polite" className="strip-label">
                                Tools for {activeStage.label}
                            </p>
                            <div
                                className={cn(
                                    'mt-6 border border-rule bg-dot-grid p-4 sm:p-6 lg:p-12',
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
                                                        'group border border-border bg-background p-5 transition-[translate,box-shadow,border-color,opacity] duration-200 motion-reduce:transition-none',
                                                        isRecommended
                                                            ? 'border-brand shadow-card lg:translate-z-10'
                                                            : 'lg:translate-z-0 lg:opacity-60 lg:hover:translate-z-6 lg:hover:opacity-100',
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                                                            {String(
                                                                toolIndex + 1,
                                                            ).padStart(2, '0')}
                                                        </span>
                                                        {isRecommended ? (
                                                            <span className="rounded-sm bg-navy-3 px-2 py-0.5 font-mono text-xs font-semibold text-brand">
                                                                Next
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                    <ToolIcon
                                                        weight="bold"
                                                        aria-hidden="true"
                                                        className="mt-6 size-5 text-brand"
                                                    />
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

                        <section aria-labelledby="customers-heading">
                            <h2
                                id="customers-heading"
                                className="px-6 pt-6 text-sm font-medium"
                            >
                                Founders at these companies scored first
                            </h2>
                            <ul
                                aria-labelledby="customers-heading"
                                className="grid grid-cols-2 border-t border-l border-rule sm:grid-cols-3 lg:grid-cols-6"
                            >
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
                        </section>

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
