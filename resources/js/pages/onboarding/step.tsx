import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import { logout } from '@/routes';
import { show, store } from '@/routes/onboarding';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CircleNotch,
    SignOut,
} from '@phosphor-icons/react';
import { FormEvent } from 'react';

type Question = {
    key: string;
    label: string;
    options: Record<string, string>;
    multiple: boolean;
};
type Props = {
    step: number;
    total: number;
    question: Question;
    answer: string | string[];
};

const card =
    'flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-sm-meta px-4 py-3 text-base text-sm-body has-data-checked:border-sm-primary has-data-checked:bg-sm-primary/5 has-data-[state=checked]:border-sm-primary has-data-[state=checked]:bg-sm-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-sm-primary';
const quietLink =
    'inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm-meta focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none';

// Inertia reuses this page component between steps, so the form is keyed by step or it keeps the previous answer.
export default function Step(props: Props) {
    return <StepForm key={props.step} {...props} />;
}

function StepForm({ step, total, question, answer }: Props) {
    const form = useForm({ answer });
    const picked = Array.isArray(form.data.answer)
        ? form.data.answer
        : [form.data.answer].filter(Boolean);
    const describedBy = form.errors.answer
        ? 'answer-error continue-hint'
        : 'continue-hint';
    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post(store.url(step));
    };
    const toggle = (value: string, checked: boolean) =>
        form.setData(
            'answer',
            checked ? [...picked, value] : picked.filter((v) => v !== value),
        );

    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-6 font-sm-body sm:py-10">
            <Head title={question.label} />
            <form
                onSubmit={submit}
                className="mx-auto max-w-xl rounded-2xl border border-sm-meta bg-sm-card p-5 shadow-sm sm:p-8"
            >
                <div className="flex items-center justify-between">
                    {step > 1 ? (
                        <Link
                            href={show(step - 1)}
                            className="inline-flex min-h-11 items-center gap-1 rounded-full text-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                        >
                            <ArrowLeft weight="bold" aria-hidden="true" /> Back
                        </Link>
                    ) : (
                        <span />
                    )}
                    <Link href={logout()} as="button" className={quietLink}>
                        <SignOut weight="bold" aria-hidden="true" /> Sign out
                    </Link>
                </div>
                <p className="mt-4 text-xs tracking-widest text-sm-primary uppercase">
                    Step {step + 1} of {total + 1}
                </p>
                <div
                    role="progressbar"
                    aria-label="Onboarding progress"
                    aria-valuemin={1}
                    aria-valuemax={total + 1}
                    aria-valuenow={step + 1}
                    aria-valuetext={'Step ' + (step + 1) + ' of ' + (total + 1)}
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sm-primary/12"
                >
                    <div
                        className="h-full rounded-full bg-sm-primary"
                        style={{
                            width: ((step + 1) / (total + 1)) * 100 + '%',
                        }}
                    />
                </div>
                <fieldset
                    aria-describedby={describedBy}
                    aria-invalid={form.errors.answer ? true : undefined}
                    className="mt-4"
                >
                    <legend>
                        <h1 className="font-sm-display text-3xl text-sm-title">
                            {question.label}
                        </h1>
                    </legend>
                    {step === 1 && (
                        <p className="mt-2 text-sm-meta">
                            {total} quick questions so we can point you to the
                            ScaleupMap tool to start with.
                        </p>
                    )}
                    {question.multiple && (
                        <p className="mt-2 text-sm-meta">
                            Pick everything that applies. We will line up a tool
                            for each.
                        </p>
                    )}
                    {question.multiple ? (
                        <div className="mt-6 grid gap-3">
                            {Object.entries(question.options).map(
                                ([value, label]) => (
                                    <Label key={value} className={card}>
                                        <Checkbox
                                            checked={picked.includes(value)}
                                            onCheckedChange={(checked) =>
                                                toggle(value, checked === true)
                                            }
                                            className="border-sm-primary data-[state=checked]:border-sm-primary data-[state=checked]:bg-sm-primary"
                                        />
                                        {label}
                                    </Label>
                                ),
                            )}
                        </div>
                    ) : (
                        <RadioGroup
                            value={picked[0] ?? ''}
                            onValueChange={(value) =>
                                form.setData('answer', String(value))
                            }
                            className="mt-6 grid gap-3"
                        >
                            {Object.entries(question.options).map(
                                ([value, label]) => (
                                    <Label key={value} className={card}>
                                        <Radio
                                            value={value}
                                            className="border-sm-primary"
                                        />
                                        {label}
                                    </Label>
                                ),
                            )}
                        </RadioGroup>
                    )}
                </fieldset>
                {form.errors.answer && (
                    <p
                        id="answer-error"
                        role="alert"
                        className="mt-3 text-sm text-destructive"
                    >
                        {form.errors.answer}
                    </p>
                )}
                <p id="continue-hint" className="mt-6 text-sm text-sm-meta">
                    {picked.length === 0
                        ? question.multiple
                            ? 'Pick at least one to continue.'
                            : 'Pick one to continue.'
                        : 'You can change this later.'}
                </p>
                <button
                    type="submit"
                    aria-describedby={describedBy}
                    disabled={form.processing}
                    className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-sm-primary px-6 py-3 text-white hover:bg-sm-primary-hover focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                >
                    {form.processing ? 'Saving' : 'Continue'}
                    {form.processing ? (
                        <CircleNotch
                            weight="bold"
                            aria-hidden="true"
                            className="animate-spin"
                        />
                    ) : (
                        <ArrowRight weight="bold" aria-hidden="true" />
                    )}
                </button>
            </form>
        </main>
    );
}
