import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CircleNotch,
    SignOut,
} from '@phosphor-icons/react';
import { FormEvent } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import {
    FunnelLayout,
    FunnelPanel,
    quietLinkClass,
} from '@/layouts/funnel-layout';
import { logout } from '@/routes';
import { show, store } from '@/routes/onboarding';

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

const optionRow =
    'flex min-h-12 cursor-pointer items-center gap-3 px-6 py-3 first:rounded-t-lg sm:px-8 text-base font-normal transition-colors duration-100 hover:bg-subtle has-data-checked:bg-subtle has-data-[state=checked]:bg-subtle has-focus-visible:bg-subtle';

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
    // Sign-up counts as step 1, so the questions run 2 of 4 to 4 of 4.
    const shownStep = step + 1;
    const shownTotal = total + 1;
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
        <FunnelLayout
            headerAction={
                <Link href={logout()} as="button" className={quietLinkClass}>
                    <SignOut weight="bold" aria-hidden="true" /> Sign out
                </Link>
            }
            aside={
                <>
                    <Head title={question.label} />
                    <p className="strip-label">
                        Step {shownStep} of {shownTotal}
                    </p>
                    <div
                        role="progressbar"
                        aria-label="Onboarding progress"
                        aria-valuemin={1}
                        aria-valuemax={shownTotal}
                        aria-valuenow={shownStep}
                        aria-valuetext={
                            'Step ' + shownStep + ' of ' + shownTotal
                        }
                        className="mt-4 h-1 w-full max-w-sm overflow-hidden rounded-md bg-subtle"
                    >
                        <div
                            className="h-full bg-brand"
                            style={{
                                width: (shownStep / shownTotal) * 100 + '%',
                            }}
                        />
                    </div>
                    <h1
                        id="question-label"
                        className="mt-8 max-w-xl text-4xl leading-none font-medium tracking-[-0.05em] text-balance sm:text-5xl"
                    >
                        {question.label}
                    </h1>
                    <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground">
                        {step === 1 &&
                            total +
                                ' quick questions so we can point you to the ScaleupMap tool to start with.'}
                        {question.multiple &&
                            'Pick everything that applies. We will line up a tool for each.'}
                        {step !== 1 &&
                            !question.multiple &&
                            'Pick one. You can change it later.'}
                    </p>
                </>
            }
        >
            <form onSubmit={submit}>
                <FunnelPanel>
                    <fieldset
                        aria-labelledby="question-label"
                        aria-describedby={describedBy}
                        aria-invalid={form.errors.answer ? true : undefined}
                    >
                        <legend className="sr-only">{question.label}</legend>
                        {question.multiple ? (
                            <div className="-mx-6 -mt-6 divide-y divide-rule border-b border-rule sm:-mx-8 sm:-mt-8">
                                {Object.entries(question.options).map(
                                    ([value, label]) => (
                                        <Label
                                            key={value}
                                            className={optionRow}
                                        >
                                            <Checkbox
                                                checked={picked.includes(value)}
                                                onCheckedChange={(checked) =>
                                                    toggle(
                                                        value,
                                                        checked === true,
                                                    )
                                                }
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
                                className="-mx-6 -mt-6 gap-0 divide-y divide-rule border-b border-rule sm:-mx-8 sm:-mt-8"
                            >
                                {Object.entries(question.options).map(
                                    ([value, label]) => (
                                        <Label
                                            key={value}
                                            className={optionRow}
                                        >
                                            <Radio value={value} />
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
                            className="mt-4 text-sm text-destructive"
                        >
                            {form.errors.answer}
                        </p>
                    )}
                    <p
                        id="continue-hint"
                        className="mt-6 text-sm text-muted-foreground"
                    >
                        {picked.length === 0
                            ? question.multiple
                                ? 'Pick at least one to continue.'
                                : 'Pick one to continue.'
                            : 'You can change this later.'}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                            type="submit"
                            aria-describedby={describedBy}
                            disabled={form.processing}
                            className="btn-ink h-10"
                        >
                            {form.processing ? 'Saving' : 'Continue'}
                            {form.processing ? (
                                <CircleNotch
                                    weight="bold"
                                    aria-hidden="true"
                                    className="size-4 animate-spin"
                                />
                            ) : (
                                <ArrowRight
                                    weight="bold"
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            )}
                        </button>
                        {step > 1 && (
                            <Link
                                href={show(step - 1)}
                                className="btn-outline h-10"
                            >
                                <ArrowLeft
                                    weight="bold"
                                    aria-hidden="true"
                                    className="size-4"
                                />
                                Back
                            </Link>
                        )}
                    </div>
                </FunnelPanel>
            </form>
        </FunnelLayout>
    );
}
