import { Head, Link } from "@inertiajs/react";
import {
    ArrowCounterClockwise,
    ChartBar,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    SignOut,
    UsersThree,
} from "@phosphor-icons/react";

const icons = {
    ChartBar,
    Compass,
    FileText,
    Lightning,
    MapTrifold,
    UsersThree,
};

type Props = {
    title: string;
    because: string;
    blurb: string;
    icon: keyof typeof icons;
};

export default function Destination({ title, because, blurb, icon }: Props) {
    const Icon = icons[icon] ?? Compass;

    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-10 font-sm-body">
            <Head title={title} />
            <div className="mx-auto max-w-xl rounded-2xl border border-sm-primary/40 bg-sm-card p-8 shadow-sm">
                <p className="text-xs tracking-widest text-sm-primary uppercase">
                    Your first tool
                </p>
                <h1 className="mt-2 flex items-center gap-2 font-sm-display text-3xl text-sm-title">
                    <Icon weight="bold" aria-hidden="true" /> {title}
                </h1>
                <p className="mt-4 text-sm-body">{because}</p>
                <p className="mt-2 text-sm-meta">{blurb}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                        href="/onboarding/1"
                        className="inline-flex items-center gap-2 rounded-full border border-sm-primary/40 px-5 py-3 text-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        <ArrowCounterClockwise
                            weight="bold"
                            aria-hidden="true"
                        />{" "}
                        Change my answers
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="ml-auto inline-flex items-center gap-1 py-3 text-sm-meta focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                    >
                        <SignOut weight="bold" aria-hidden="true" /> Sign out
                    </Link>
                </div>
            </div>
        </main>
    );
}
