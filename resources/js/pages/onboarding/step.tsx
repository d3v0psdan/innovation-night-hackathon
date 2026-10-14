import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    ArrowRight,
    CircleNotch,
    SignOut,
} from "@phosphor-icons/react";
import { FormEvent } from "react";

type Question = { key: string; label: string; options: Record<string, string> };
type Props = {
    step: number;
    total: number;
    question: Question;
    answer: string;
};

export default function Step({ step, total, question, answer }: Props) {
    const form = useForm({ answer });
    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post("/onboarding/" + step);
    };

    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-10 font-sm-body">
            <Head title={"Step " + step + " of " + total} />
            <form
                onSubmit={submit}
                className="mx-auto max-w-xl rounded-2xl border border-sm-primary/40 bg-sm-card p-8 shadow-sm"
            >
                <p className="text-xs tracking-widest text-sm-primary uppercase">
                    Step {step} of {total}
                </p>
                <div
                    role="progressbar"
                    aria-label="Onboarding progress"
                    aria-valuemin={1}
                    aria-valuemax={total}
                    aria-valuenow={step}
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sm-primary/12"
                >
                    <div
                        className="h-full rounded-full bg-sm-primary"
                        style={{ width: (step / total) * 100 + "%" }}
                    />
                </div>
                <fieldset className="mt-4">
                    <legend className="font-sm-display text-3xl text-sm-title">
                        {question.label}
                    </legend>
                    {step === 1 && (
                        <p className="mt-2 text-sm-meta">
                            {total} quick questions so we can pick your first
                            tool.
                        </p>
                    )}
                    <RadioGroup
                        value={form.data.answer}
                        onValueChange={(value) =>
                            form.setData("answer", String(value))
                        }
                        className="mt-6 grid gap-3"
                    >
                        {Object.entries(question.options).map(
                            ([value, label]) => (
                                <Label
                                    key={value}
                                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-sm-primary/40 px-4 py-3 text-base text-sm-body has-data-checked:border-sm-primary has-data-checked:bg-sm-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-sm-primary"
                                >
                                    <Radio
                                        value={value}
                                        className="border-sm-primary/60"
                                    />
                                    {label}
                                </Label>
                            ),
                        )}
                    </RadioGroup>
                </fieldset>
                {form.errors.answer && (
                    <p role="alert" className="mt-3 text-sm text-destructive">
                        {form.errors.answer}
                    </p>
                )}
                <p id="continue-hint" className="mt-6 text-sm text-sm-meta">
                    {form.data.answer === ""
                        ? "Pick one to continue."
                        : "You can change this later."}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                    <button
                        type="submit"
                        aria-describedby="continue-hint"
                        disabled={form.processing || form.data.answer === ""}
                        className="inline-flex items-center gap-2 rounded-full bg-sm-primary px-6 py-3 text-white hover:bg-sm-primary-hover focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                    >
                        {form.processing ? "Saving" : "Continue"}
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
                    {step > 1 && (
                        <Link
                            href={"/onboarding/" + (step - 1)}
                            className="inline-flex items-center gap-1 py-3 text-sm-primary focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                        >
                            <ArrowLeft weight="bold" aria-hidden="true" /> Back
                        </Link>
                    )}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="ml-auto inline-flex items-center gap-1 py-3 text-sm-meta focus-visible:ring-2 focus-visible:ring-sm-primary focus-visible:outline-none"
                    >
                        <SignOut weight="bold" aria-hidden="true" /> Sign out
                    </Link>
                </div>
            </form>
        </main>
    );
}
