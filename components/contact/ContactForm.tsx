"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Contact form (frontend-only).
 *
 * With no backend, a valid submission is handed to the visitor's own email
 * client via a prefilled `mailto:` link, so messages actually reach the
 * ministry. `handleSubmit` is the single seam to swap for an API/WPForms
 * endpoint later, without changing any markup.
 */

interface Fields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (f: Fields): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Please enter your name.";
    if (!f.email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(f.email.trim()))
      e.email = "Please enter a valid email address.";
    if (!f.message.trim()) e.message = "Please enter your message.";
    return e;
  };

  const update =
    (key: keyof Fields) =>
    (
      ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFields((prev) => ({ ...prev, [key]: ev.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(fields);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      // Focus the first invalid field for keyboard users.
      const first = Object.keys(e)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }

    const subject = fields.subject.trim() || "Message from the website";
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
    // Hand off to the visitor's email client (frontend-only delivery).
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => {
    setFields({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSent(false);
  };

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card sm:p-8">
      {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-serif text-xl font-bold text-brand-ink">
              Your message is ready to send
            </h3>
            <p className="mt-2 max-w-sm text-sm text-brand-muted">
              Your email app should have opened with your message. If it did
              not, please email us directly at{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-brand-gold hover:text-brand-goldDark"
              >
                {site.contact.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-black/15 px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Your Name"
                required
                value={fields.name}
                onChange={update("name")}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="email"
                label="Your Email"
                type="email"
                required
                value={fields.email}
                onChange={update("email")}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <Field
              id="subject"
              label="Subject"
              value={fields.subject}
              onChange={update("subject")}
              error={errors.subject}
            />

            <Field
              id="message"
              label="Your Message"
              required
              multiline
              value={fields.message}
              onChange={update("message")}
              error={errors.message}
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-goldLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Submit
            </button>
          </motion.form>
        )}
    </div>
  );
}

/** A single labelled input / textarea with inline validation. */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  type = "text",
  autoComplete,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const base = cn(
    "w-full rounded-lg border bg-white px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-muted/60",
    error
      ? "border-red-400 focus:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200"
      : "border-black/15 focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/30",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-brand-ink"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          rows={6}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(base, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          autoComplete={autoComplete}
          className={base}
        />
      )}

      {error && (
        <p
          id={describedBy}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
