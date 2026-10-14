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
                <p className="text-[11px] tracking-widest text-sm-accent uppercase">
                    Step {step} of {total}
                </p>
                <fieldset className="mt-2">
                    <legend className="font-sm-display text-3xl text-sm-title">
                        {question.label}
                    </legend>
                    <div className="mt-6 grid gap-3">
                        {Object.entries(question.options).map(
                            ([value, label]) => (
                                <label
                                    key={value}
                                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-sm-primary/12 px-4 py-3 text-sm-body has-checked:border-sm-primary has-checked:bg-sm-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-sm-accent"
                                >
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={value}
                                        checked={form.data.answer === value}
                                        onChange={() =>
                                            form.setData("answer", value)
                                        }
                                        className="accent-sm-primary"
                                        required
                                    />
                                    {label}
                                </label>
                            ),
                        )}
                    </div>
                </fieldset>
                {form.errors.answer && (
                    <p role="alert" className="mt-3 text-sm text-red-600">
                        {form.errors.answer}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={form.processing}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-sm-primary px-6 py-2 text-white hover:bg-sm-primary-hover focus-visible:ring-2 focus-visible:ring-sm-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                >
                    Continue <ArrowRight weight="bold" aria-hidden="true" />
                </button>
            </form>
        </main>
    );
}
