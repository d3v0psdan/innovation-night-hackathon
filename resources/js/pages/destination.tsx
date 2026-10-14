import { logout } from '@/routes';
import { show } from '@/routes/onboarding';
import { done as markDone } from '@/routes/tutorial';
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

const icons = {
    ChartBar,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    UsersThree,
};
type IconName = keyof typeof icons;

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
    checklist: {
        title: string;
        icon: IconName;
        url: string;
        done: boolean;
        current: boolean;
    }[];
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
    const submitDone = (e: FormEvent) => {
        e.preventDefault();
        form.post(markDone.url(route));
    };

    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-10 font-sm-body">
            <Head title={title} />
            <div className="mx-auto max-w-xl rounded-2xl border border-sm-meta bg-sm-card p-8 shadow-sm">
                <p className="text-xs tracking-widest text-sm-primary uppercase">
                    {allDone
                        ? 'All set'
                        : position > 0
                          ? `Your tool ${position} of ${checklist.length}`
                          : 'Your first tool'}
                </p>
                <h1 className="mt-2 flex items-center gap-2 font-sm-display text-3xl text-sm-title">
                    <Icon weight="bold" aria-hidden="true" /> {title}
                </h1>
                <p className="mt-4 text-sm-body">{because}</p>
                <p className="mt-2 text-sm-meta">{blurb}</p>
                <section
                    aria-labelledby="first-action"
                    className="mt-6 rounded-2xl bg-sm-primary/5 p-4"
                >
                    <h2
                        id="first-action"
                        className="text-xs tracking-widest text-sm-primary uppercase"
                    >
                        Your first action
                    </h2>
                    <p className="mt-1 text-sm-body">{first_action}</p>
                </section>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 rounded-full bg-sm-primary px-6 py-3 text-white hover:bg-sm-primary-hover focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        Open {title}{' '}
                        <ArrowSquareOut weight="bold" aria-hidden="true" />
                    </a>
                    {route !== 'dashboard' && !done && (
                        <form onSubmit={submitDone}>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex items-center gap-2 rounded-full border border-sm-primary px-5 py-3 text-sm-primary hover:bg-sm-primary/5 focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                            >
                                {form.processing ? (
                                    <CircleNotch
                                        weight="bold"
                                        aria-hidden="true"
                                        className="animate-spin"
                                    />
                                ) : (
                                    <CheckCircle
                                        weight="bold"
                                        aria-hidden="true"
                                    />
                                )}
                                Mark done
                            </button>
                        </form>
                    )}
                    <Link
                        href={logout()}
                        as="button"
                        className="ml-auto inline-flex items-center gap-1 py-3 text-sm-meta focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                    >
                        <SignOut weight="bold" aria-hidden="true" /> Sign out
                    </Link>
                </div>
                {checklist.length > 0 && (
                    <section
                        aria-labelledby="your-tools"
                        className="mt-8 border-t border-sm-meta/40 pt-6"
                    >
                        <h2
                            id="your-tools"
                            className="text-xs tracking-widest text-sm-primary uppercase"
                        >
                            Your tools, in order
                        </h2>
                        <ol className="mt-3 grid gap-2">
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
                                            className={
                                                'flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm-body hover:border-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none ' +
                                                (item.current
                                                    ? 'border-sm-primary bg-sm-primary/5'
                                                    : 'border-sm-meta')
                                            }
                                        >
                                            <State
                                                weight="bold"
                                                aria-hidden="true"
                                                className={
                                                    item.done
                                                        ? 'text-sm-primary'
                                                        : 'text-sm-meta'
                                                }
                                            />
                                            <ItemIcon
                                                weight="bold"
                                                aria-hidden="true"
                                                className="text-sm-primary"
                                            />
                                            {item.title}
                                            <span className="ml-auto text-sm text-sm-body">
                                                {item.done
                                                    ? 'Done'
                                                    : item.current
                                                      ? 'Now'
                                                      : 'Next'}
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
                        className="inline-flex items-center gap-2 py-2 text-sm text-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                    >
                        <ArrowCounterClockwise
                            weight="bold"
                            aria-hidden="true"
                        />{' '}
                        Change my answers
                    </Link>
                </p>
            </div>
        </main>
    );
}
