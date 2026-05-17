"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Heart, Loader2, X } from "lucide-react";
import { useState } from "react";

type Attendance = "attending" | "not_attending" | "maybe";
type Meal = "no_preference" | "vegetarian" | "non_vegetarian";
type Status = "idle" | "submitting" | "success" | "error";

type RSVPModalProps = {
  open: boolean;
  onClose: () => void;
  accentColor: string;
  foreground: string;
  surface?: string;
  inviteeName: string;
  coupleSlug: string;
};

const ATTENDANCE_OPTIONS: { value: Attendance; label: string }[] = [
  { value: "attending", label: "Yes, I'll be there!" },
  { value: "not_attending", label: "Sending love, but I can't make it" },
  { value: "maybe", label: "I'll let you know" },
];

const MEAL_OPTIONS: { value: Meal; label: string }[] = [
  { value: "no_preference", label: "No preference" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "non_vegetarian", label: "Non-vegetarian" },
];

export function RSVPModal({
  open,
  onClose,
  accentColor,
  foreground,
  surface = "#ffffff",
  inviteeName,
  coupleSlug,
}: RSVPModalProps) {
  const [name, setName] = useState(inviteeName === "Guest" ? "" : inviteeName);
  const [attendance, setAttendance] = useState<Attendance>("attending");
  const [partySize, setPartySize] = useState(1);
  const [meal, setMeal] = useState<Meal>("no_preference");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const mutedFg = foreground + "99";
  const borderColor = foreground + "22";
  const inputBg = foreground + "08";

  function resetForm() {
    setName(inviteeName === "Guest" ? "" : inviteeName);
    setAttendance("attending");
    setPartySize(1);
    setMeal("no_preference");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  }

  function handleClose() {
    onClose();
    // reset after exit animation
    setTimeout(resetForm, 300);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupleSlug,
          guestName: name.trim(),
          attendance,
          partySize,
          mealPreference: meal,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const showSizeAndMeal = attendance === "attending" || attendance === "maybe";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl overflow-y-auto max-h-[90dvh]"
            style={{ backgroundColor: surface, color: foreground }}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${borderColor}` }}>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 shrink-0" style={{ color: accentColor }} aria-hidden />
                <h2 id="rsvp-title" className="text-lg font-semibold tracking-tight">
                  RSVP
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-1.5 transition hover:bg-black/5"
                aria-label="Close RSVP dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
                <CheckCircle2 className="h-12 w-12" style={{ color: accentColor }} />
                <div>
                  <p className="text-lg font-semibold">Thank you, {name}!</p>
                  <p className="mt-1 text-sm" style={{ color: mutedFg }}>
                    {attendance === "attending"
                      ? "We're so excited to celebrate with you."
                      : attendance === "not_attending"
                      ? "You'll be missed — thank you for letting us know."
                      : "We hope to see you there!"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-4 space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="rsvp-name" className="block text-xs font-medium uppercase tracking-widest" style={{ color: mutedFg }}>
                    Your name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    maxLength={120}
                    required
                    className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition focus:ring-2"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: foreground,
                      // @ts-expect-error css var
                      "--tw-ring-color": accentColor + "66",
                    }}
                  />
                </div>

                {/* Attendance */}
                <fieldset className="space-y-1.5">
                  <legend className="text-xs font-medium uppercase tracking-widest" style={{ color: mutedFg }}>
                    Will you attend?
                  </legend>
                  <div className="mt-2 space-y-2">
                    {ATTENDANCE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition"
                        style={{
                          border: `1px solid ${attendance === opt.value ? accentColor + "aa" : borderColor}`,
                          background: attendance === opt.value ? accentColor + "12" : inputBg,
                        }}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={opt.value}
                          checked={attendance === opt.value}
                          onChange={() => setAttendance(opt.value)}
                          className="accent-current shrink-0"
                          style={{ accentColor }}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Party size + meal — only shown when attending or maybe */}
                <AnimatePresence>
                  {showSizeAndMeal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5 overflow-hidden"
                    >
                      {/* Party size */}
                      <div className="space-y-1.5">
                        <label htmlFor="rsvp-party" className="block text-xs font-medium uppercase tracking-widest" style={{ color: mutedFg }}>
                          Number of guests (including you)
                        </label>
                        <select
                          id="rsvp-party"
                          value={partySize}
                          onChange={(e) => setPartySize(Number(e.target.value))}
                          className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition focus:ring-2"
                          style={{
                            background: inputBg,
                            border: `1px solid ${borderColor}`,
                            color: foreground,
                          }}
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "guest" : "guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Meal preference */}
                      <div className="space-y-1.5">
                        <label htmlFor="rsvp-meal" className="block text-xs font-medium uppercase tracking-widest" style={{ color: mutedFg }}>
                          Meal preference
                        </label>
                        <select
                          id="rsvp-meal"
                          value={meal}
                          onChange={(e) => setMeal(e.target.value as Meal)}
                          className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition focus:ring-2"
                          style={{
                            background: inputBg,
                            border: `1px solid ${borderColor}`,
                            color: foreground,
                          }}
                        >
                          {MEAL_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="rsvp-message" className="block text-xs font-medium uppercase tracking-widest" style={{ color: mutedFg }}>
                    Leave a message{" "}
                    <span className="normal-case tracking-normal" style={{ color: mutedFg }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your wishes or a note for the couple…"
                    rows={3}
                    maxLength={500}
                    className="w-full resize-none rounded-lg px-3.5 py-2.5 text-sm outline-none transition focus:ring-2"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: foreground,
                    }}
                  />
                  <p className="text-right text-xs" style={{ color: mutedFg }}>
                    {message.length}/500
                  </p>
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="rounded-lg px-3.5 py-2.5 text-sm" style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-70"
                  style={{ backgroundColor: accentColor }}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send RSVP"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
