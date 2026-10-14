import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Head, useForm } from "@inertiajs/react";
import { ArrowRight } from "@phosphor-icons/react";
import { FormEvent } from "react";

type Question = { key: string; label: string; options: Record<string, string> };

export default function Step({
    step,
    total,
    question,
}: {
    step: number;
    total: number;
    question: Question;
}) {
    const form = useForm({ answer: "" });
    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post("/onboarding/" + step);
    };

    return (
        <main className="min-h-screen bg-sm-canvas px-4 py-10 font-sm-body">
            <Head title={"Step " + step + " of " + total} />
            <form
                onSubmit={submit}
                className="mx-auto max-w-xl rounded-2xl border border-sm-primary/12 bg-sm-card p-8 shadow-sm"
            >
                <p className="text-[11px] tracking-widest text-sm-primary uppercase">
                    Step {step} of {total}
                </p>
                <fieldset className="mt-2">
                    <legend className="font-sm-display text-3xl text-sm-title">
                        {question.label}
                    </legend>
                    <RadioGroup
                        aria-label={question.label}
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
                                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-sm-primary/12 px-4 py-3 text-base text-sm-body has-data-checked:border-sm-primary has-data-checked:bg-sm-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-sm-accent"
                                >
                                    <Radio value={value} />
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
                <button
                    type="submit"
                    disabled={form.processing || form.data.answer === ""}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-sm-primary px-6 py-2 text-white hover:bg-sm-primary-hover focus-visible:ring-2 focus-visible:ring-sm-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                >
                    Continue <ArrowRight weight="bold" aria-hidden="true" />
                </button>
            </form>
        </main>
    );
}
