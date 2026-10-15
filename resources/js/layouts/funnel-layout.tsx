import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { BrandLogo } from '@/components/brand-logo';
import { cn } from '@/lib/utils';
import { home } from '@/routes';

type Props = {
    /** Rendered in the header, right of the logo. Sign in or sign out. */
    headerAction?: ReactNode;
    /** Left cell: the promise, the question, or the reason. */
    aside: ReactNode;
    /** Right cell: the form or the panel, on the dot grid. */
    children: ReactNode;
    /** Put the form cell first on desktop, the way sign-up pages read: form, then proof. */
    formFirst?: boolean;
};

/**
 * The landing page frame for every screen between the landing and the first tool:
 * 1280 container with hairline rules, logo header, two cells divided by a rule.
 */
export function FunnelLayout({
    headerAction,
    aside,
    children,
    formFirst = false,
}: Props) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col border-x border-rule">
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-6">
                    <Link
                        href={home()}
                        className="flex items-center rounded-md"
                    >
                        <BrandLogo mark className="size-8 sm:hidden" />
                        <BrandLogo className="hidden h-8 sm:block" />
                    </Link>
                    {headerAction}
                </header>
                <main className="grid flex-1 lg:grid-cols-2 lg:divide-x lg:divide-rule">
                    <div className="flex flex-col justify-center px-6 py-12 lg:px-12 lg:py-24">
                        {aside}
                    </div>
                    <div
                        className={cn(
                            'flex flex-col justify-center border-t border-rule bg-dot-grid px-6 py-12 lg:border-t-0 lg:px-12 lg:py-24',
                            formFirst && 'lg:order-first',
                        )}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

/** The bordered panel that sits on the dot grid. Same frame as the score card on the landing. */
export function FunnelPanel({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 sm:p-8">
            {children}
        </div>
    );
}

export const quietLinkClass =
    'inline-flex h-8 items-center gap-2 rounded-md text-[15px] font-medium transition-colors duration-100 hover:text-muted-foreground';
