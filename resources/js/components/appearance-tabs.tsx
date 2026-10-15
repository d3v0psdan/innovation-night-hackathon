import type { Icon } from '@phosphor-icons/react';
import { Monitor, Moon, Sun } from '@phosphor-icons/react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement> & {
    /** Icons only, labels stay for screen readers. For nav bars. */
    compact?: boolean;
};

export default function AppearanceToggleTab({
    className = '',
    compact = false,
    ...props
}: Props) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: Icon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            role="group"
            aria-label="Theme"
            className={cn(
                'inline-flex gap-1 rounded-lg bg-muted p-1',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: TabIcon, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => updateAppearance(value)}
                    aria-pressed={appearance === value}
                    aria-label={compact ? label : undefined}
                    className={cn(
                        'flex items-center rounded-md px-2.5 py-1.5 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        appearance === value
                            ? 'bg-background text-foreground shadow-xs'
                            : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
                    )}
                >
                    <TabIcon weight="bold" className="size-4" />
                    {!compact && (
                        <span className="ml-1.5 text-sm">{label}</span>
                    )}
                </button>
            ))}
        </div>
    );
}
