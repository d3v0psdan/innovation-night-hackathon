import { Head, Link } from '@inertiajs/react';
import {
    ArrowCounterClockwise,
    ArrowRight,
    ChartBar,
    CheckCircle,
    Circle,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    SignOut,
    UsersThree,
} from '@phosphor-icons/react';
import { BrandLogo } from '@/components/brand-logo';
import { quietLinkClass } from '@/layouts/funnel-layout';
import { cn } from '@/lib/utils';
import { home, logout } from '@/routes';
import { show } from '@/routes/onboarding';

const icons = {
    ChartBar,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    UsersThree,
};
type IconName = keyof typeof icons;

type Tool = {
    title: string;
    icon: IconName;
    url: string;
    done: boolean;
    opened: boolean;
};
type Answer = { question: string; answer: string };
type Props = {
    name: string;
    reason: string;
    tools: Tool[];
    answers: Answer[];
};

export default function Dashboard({ name, reason, tools, answers }: Props) {
    const firstName = name.split(' ')[0];
    const doneCount = tools.filter((tool) => tool.done).length;
    const next = tools.find((tool) => !tool.done);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head title="Dashboard" />
            <div className="mx-auto min-h-screen max-w-7xl border-x border-rule">
                <header className="flex h-16 items-center justify-between border-b border-rule px-6">
                    <Link
                        href={home()}
                        className="flex items-center rounded-md"
                    >
                        <BrandLogo mark className="size-8 sm:hidden" />
                        <BrandLogo className="hidden h-8 sm:block" />
                    </Link>
                    <Link
                        href={logout()}
                        as="button"
                        className={quietLinkClass}
                    >
                        <SignOut weight="bold" aria-hidden="true" /> Sign out
                    </Link>
                </header>
                <main>
                    <section className="px-6 py-16 lg:py-20">
                        <p className="strip-label">Your dashboard</p>
                        <h1 className="mt-6 max-w-3xl text-4xl leading-none font-medium tracking-[-0.05em] text-balance sm:text-5xl">
                            Hi {firstName}. Every tool in one place.
                        </h1>
                        <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground">
                            {reason}
                        </p>
                        {next ? (
                            <Link href={next.url} className="btn-ink mt-8 h-10">
                                Open {next.title}
                                <ArrowRight
                                    weight="bold"
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            </Link>
                        ) : (
                            <p className="mt-8 text-sm text-muted-foreground">
                                All {tools.length} recommended tools done.
                            </p>
                        )}
                    </section>

                    <section
                        aria-labelledby="your-tools"
                        className="border-t border-rule px-6 py-12"
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <h2
                                id="your-tools"
                                className="text-2xl font-medium tracking-[-0.02em]"
                            >
                                Your tools, in order
                            </h2>
                            <p className="font-mono text-xs text-muted-foreground tabular-nums">
                                {doneCount} of {tools.length} done
                            </p>
                        </div>
                        <ol className="mt-6 divide-y divide-rule border-y border-rule">
                            {tools.map((tool, index) => {
                                const ToolIcon = icons[tool.icon] ?? Compass;
                                const State = tool.done ? CheckCircle : Circle;
                                return (
                                    <li key={tool.url}>
                                        <Link
                                            href={tool.url}
                                            className="flex min-h-14 items-center gap-4 px-2 py-3 transition-colors duration-100 hover:bg-subtle"
                                        >
                                            <span className="w-4 strip-number">
                                                {index + 1}
                                            </span>
                                            <State
                                                weight="bold"
                                                aria-hidden="true"
                                                className={cn(
                                                    'size-4',
                                                    tool.done
                                                        ? 'text-brand'
                                                        : 'text-muted-foreground',
                                                )}
                                            />
                                            <ToolIcon
                                                weight="bold"
                                                aria-hidden="true"
                                                className="size-4 text-brand"
                                            />
                                            <span className="text-base">
                                                {tool.title}
                                            </span>
                                            <span className="ml-auto font-mono text-xs text-muted-foreground">
                                                {tool.done
                                                    ? 'Done'
                                                    : tool.opened
                                                      ? 'Opened'
                                                      : tool === next
                                                        ? 'Next'
                                                        : 'Recommended'}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                        {tools.length === 0 && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                Answer the three questions and we line up the
                                tools for you.
                            </p>
                        )}
                    </section>

                    <section
                        aria-labelledby="your-answers"
                        className="border-t border-rule px-6 py-12"
                    >
                        <h2
                            id="your-answers"
                            className="text-2xl font-medium tracking-[-0.02em]"
                        >
                            Your answers
                        </h2>
                        <dl className="mt-6 max-w-3xl divide-y divide-rule border-y border-rule">
                            {answers.map((row) => (
                                <div
                                    key={row.question}
                                    className="grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6"
                                >
                                    <dt className="text-sm text-muted-foreground">
                                        {row.question}
                                    </dt>
                                    <dd className="text-base">{row.answer}</dd>
                                </div>
                            ))}
                        </dl>
                        <Link href={show(1)} className="mt-6 btn-outline h-10">
                            <ArrowCounterClockwise
                                weight="bold"
                                aria-hidden="true"
                                className="size-4"
                            />
                            Change my answers
                        </Link>
                    </section>
                </main>
            </div>
        </div>
    );
}
