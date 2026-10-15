import { Link } from '@inertiajs/react';
import {
    FunnelLayout,
    FunnelPanel,
    quietLinkClass,
} from '@/layouts/funnel-layout';
import { login, register } from '@/routes';
import type { AuthLayoutProps } from '@/types';

// Mirrors the "How it works" strip on the landing so sign-up reads as step 1 of the same path.
const NEXT_STEPS = [
    { number: '2', label: 'Where you are' },
    { number: '3', label: 'What you need this month' },
    { number: '4', label: 'How big the team is' },
];

export default function AuthSimpleLayout({
    children,
    title,
    description,
    funnel = false,
}: AuthLayoutProps) {
    const headerAction = funnel ? (
        <Link href={login()} className={quietLinkClass}>
            Sign in
        </Link>
    ) : (
        <Link href={register()} className="btn-ink h-8">
            Score my startup free
        </Link>
    );

    return (
        <FunnelLayout
            formFirst
            headerAction={headerAction}
            aside={
                <>
                    <h1 className="max-w-xl text-4xl leading-none font-medium tracking-[-0.05em] text-balance sm:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground">
                        {description}
                    </p>
                    {funnel && (
                        <ol className="mt-10 max-w-sm divide-y divide-rule border-y border-rule">
                            {NEXT_STEPS.map((step) => (
                                <li
                                    key={step.number}
                                    className="flex h-12 items-center gap-4"
                                >
                                    <span className="strip-number">
                                        {step.number}
                                    </span>
                                    <span className="text-sm">
                                        {step.label}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    )}
                </>
            }
        >
            <FunnelPanel>{children}</FunnelPanel>
        </FunnelLayout>
    );
}
