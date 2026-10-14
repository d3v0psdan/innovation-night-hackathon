import { logout } from '@/routes';
import { show } from '@/routes/onboarding';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowCounterClockwise,
    ArrowRight,
    ArrowSquareOut,
    ChartBar,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    SignOut,
    UsersThree,
} from '@phosphor-icons/react';

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
    title: string;
    because: string;
    blurb: string;
    first_action: string;
    icon: IconName;
    href: string;
    position: number | null;
    count: number;
    nextUp: { title: string; icon: IconName; url: string }[];
};

export default function Destination({
    title,
    because,
    blurb,
    first_action,
    icon,
    href,
    position,
    count,
    nextUp,
}: Props) {
    const Icon = icons[icon] ?? Compass;

    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-10 font-sm-body">
            <Head title={title} />
            <div className="mx-auto max-w-xl rounded-2xl border border-sm-meta bg-sm-card p-8 shadow-sm">
                <p className="text-xs tracking-widest text-sm-primary uppercase">
                    {position
                        ? `Your tool ${position} of ${count}`
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
                    <Link
                        href={show(1)}
                        className="inline-flex items-center gap-2 py-3 text-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                    >
                        <ArrowCounterClockwise
                            weight="bold"
                            aria-hidden="true"
                        />{' '}
                        Change my answers
                    </Link>
                    <Link
                        href={logout()}
                        as="button"
                        className="ml-auto inline-flex items-center gap-1 py-3 text-sm-meta focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                    >
                        <SignOut weight="bold" aria-hidden="true" /> Sign out
                    </Link>
                </div>
                {nextUp.length > 0 && (
                    <section
                        aria-labelledby="next-up"
                        className="mt-8 border-t border-sm-meta/40 pt-6"
                    >
                        <h2
                            id="next-up"
                            className="text-xs tracking-widest text-sm-primary uppercase"
                        >
                            Next up
                        </h2>
                        <ul className="mt-3 grid gap-2">
                            {nextUp.map((item) => {
                                const NextIcon = icons[item.icon] ?? Compass;
                                return (
                                    <li key={item.url}>
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3 rounded-2xl border border-sm-meta px-4 py-3 text-sm-body hover:border-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                                        >
                                            <NextIcon
                                                weight="bold"
                                                aria-hidden="true"
                                                className="text-sm-primary"
                                            />
                                            {item.title}
                                            <ArrowRight
                                                weight="bold"
                                                aria-hidden="true"
                                                className="ml-auto text-sm-meta"
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </div>
        </main>
    );
}
