import { Head, Link } from "@inertiajs/react";
import { ArrowCounterClockwise, Compass } from "@phosphor-icons/react";

export default function Destination({
    title,
    because,
}: {
    title: string;
    because: string;
}) {
    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-10 font-sm-body">
            <Head title={title} />
            <div className="mx-auto max-w-xl rounded-2xl border border-sm-primary/12 bg-sm-card p-8 shadow-sm">
                <p className="text-[11px] tracking-widest text-sm-accent uppercase">
                    Your first tool
                </p>
                <h1 className="mt-2 flex items-center gap-2 font-sm-display text-3xl text-sm-title">
                    <Compass weight="bold" aria-hidden="true" /> {title}
                </h1>
                <p className="mt-4 text-sm-body">{because}</p>
                <Link
                    href="/onboarding/1"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-sm-primary/25 px-5 py-2 text-sm-primary focus-visible:ring-2 focus-visible:ring-sm-accent focus-visible:outline-none"
                >
                    <ArrowCounterClockwise weight="bold" aria-hidden="true" />{" "}
                    Change my answers
                </Link>
            </div>
        </main>
    );
}
