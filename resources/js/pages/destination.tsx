import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowCounterClockwise,
    ArrowSquareOut,
    ChartBar,
    CheckCircle,
    Circle,
    CircleNotch,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    SignOut,
    UsersThree,
} from '@phosphor-icons/react';
import { FormEvent } from 'react';
import {
    FunnelLayout,
    FunnelPanel,
    quietLinkClass,
} from '@/layouts/funnel-layout';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';
import { show } from '@/routes/onboarding';
import { done as markDone } from '@/routes/tutorial';

const icons = {
    ChartBar,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    UsersThree,
};
type IconName = keyof typeof icons;

type Item = {
    title: string;
    icon: IconName;
    url: string;
    done: boolean;
    opened: boolean;
    current: boolean;
};
type Props = {
    route: string;
    title: string;
    because: string;
    blurb: string;
    first_action: string;
    icon: IconName;
    href: string;
    done: boolean;
    allDone: boolean;
    checklist: Item[];
};

export default function Destination(props: Props) {
    return <DestinationPage key={props.route} {...props} />;
}

function DestinationPage({
    route,
    title,
    because,
    blurb,
    first_action,
    icon,
    href,
    done,
    allDone,
    checklist,
}: Props) {
    const Icon = icons[icon] ?? Compass;
    const form = useForm({});
    const position = checklist.findIndex((item) => item.current) + 1;
    const next = checklist.find((item) => !item.done && !item.current);
    const eyebrow = allDone
        ? 'All set'
        : position > 0
          ? 'Your tool ' + position + ' of ' + checklist.length
          : 'Your first tool';
    const canMarkDone = route !== 'dashboard' && !done;
    const submitDone = (e: FormEvent) => {
        e.preventDefault();
        form.post(markDone.url(route));
    };
    const status = (item: Item) =>
        item.done
            ? 'done'
            : item.current
              ? 'current tool'
              : item.opened
                ? 'opened'
                : 'next';
    const stateLabel = (item: Item) =>
        item.done
            ? 'Done'
            : item.current
              ? 'Now'
              : item.opened
                ? 'Opened'
                : 'Next';

    return (
        <FunnelLayout
            headerAction={
                <Link href={logout()} as="button" className={quietLinkClass}>
                    <SignOut weight="bold" aria-hidden="true" /> Sign out
                </Link>
            }
            aside={
                <>
                    <Head title={title} />
                    <p className="strip-label">{eyebrow}</p>
                    <h1 className="mt-8 flex max-w-xl items-center gap-3 text-4xl leading-none font-medium tracking-[-0.05em] text-balance sm:text-5xl">
                        <Icon
                            weight="bold"
                            aria-hidden="true"
                            className="size-9 shrink-0 text-brand"
                        />
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[34rem] text-lg">{because}</p>
                    <p className="mt-2 max-w-[34rem] text-lg text-muted-foreground">
                        {blurb}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener"
                            className="btn-ink h-10"
                        >
                            Open {title}
                            <ArrowSquareOut
                                weight="bold"
                                aria-hidden="true"
                                className="size-4"
                            />
                            <span className="sr-only">
                                (opens in a new tab)
                            </span>
                        </a>
                        {canMarkDone && (
                            <form
                                onSubmit={submitDone}
                                aria-label="Tutorial progress"
                            >
                                <span className="sr-only">
                                    Mark this tool as done.
                                </span>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="btn-outline h-10"
                                >
                                    {form.processing ? (
                                        <CircleNotch
                                            weight="bold"
                                            aria-hidden="true"
                                            className="size-4 animate-spin"
                                        />
                                    ) : (
                                        <CheckCircle
                                            weight="bold"
                                            aria-hidden="true"
                                            className="size-4"
                                        />
                                    )}
                                    {next
                                        ? 'Done, show next tool'
                                        : 'Done, finish'}
                                </button>
                            </form>
                        )}
                    </div>
                    {next && canMarkDone && (
                        <p className="mt-4 text-sm text-muted-foreground">
                            Next: {next.title}
                        </p>
                    )}
                </>
            }
        >
            <FunnelPanel>
                <section aria-labelledby="first-action">
                    <h2 id="first-action" className="strip-label">
                        Your first action
                    </h2>
                    <p className="mt-3 text-base">{first_action}</p>
                </section>
                {checklist.length > 0 && (
                    <section
                        aria-labelledby="your-tools"
                        className="mt-8 border-t border-rule pt-6"
                    >
                        <h2 id="your-tools" className="strip-label">
                            Your tools, in order
                        </h2>
                        <ol className="-mx-6 mt-3 divide-y divide-rule border-y border-rule sm:-mx-8">
                            {checklist.map((item) => {
                                const ItemIcon = icons[item.icon] ?? Compass;
                                const State = item.done ? CheckCircle : Circle;
                                return (
                                    <li key={item.url}>
                                        <Link
                                            href={item.url}
                                            aria-current={
                                                item.current
                                                    ? 'page'
                                                    : undefined
                                            }
                                            aria-label={
                                                item.title + ', ' + status(item)
                                            }
                                            className={cn(
                                                'flex min-h-12 items-center gap-3 px-6 py-3 text-base transition-colors duration-100 hover:bg-subtle sm:px-8',
                                                item.current && 'bg-subtle',
                                            )}
                                        >
                                            <State
                                                weight="bold"
                                                aria-hidden="true"
                                                className={cn(
                                                    'size-4',
                                                    item.done
                                                        ? 'text-brand'
                                                        : 'text-muted-foreground',
                                                )}
                                            />
                                            <ItemIcon
                                                weight="bold"
                                                aria-hidden="true"
                                                className="size-4 text-brand"
                                            />
                                            <span aria-hidden="true">
                                                {item.title}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="ml-auto font-mono text-xs text-muted-foreground"
                                            >
                                                {stateLabel(item)}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                    </section>
                )}
                <p className="mt-6">
                    <Link
                        href={show(1)}
                        className="inline-flex items-center gap-2 text-sm text-brand transition-colors duration-100 hover:text-brand-hover"
                    >
                        <ArrowCounterClockwise
                            weight="bold"
                            aria-hidden="true"
                            className="size-4"
                        />
                        Change my answers
                    </Link>
                </p>
            </FunnelPanel>
        </FunnelLayout>
    );
}
