import React, { useState } from "react";
import useAuthStore from "../Store/authStore.js";
// import { useNavigate } from "react-router-dom";

const Input = ({ label, id, type = "text", ...props }) => (
  <div className="flex flex-col gap-1.5 sm:gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      autoCapitalize="none"
      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 sm:px-4 sm:py-3 text-slate-900 placeholder:slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
      {...props}
    />
  </div>
);

const PasswordInput = ({ label, id, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          autoCapitalize="none"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 pr-14 sm:px-4 sm:py-3 sm:pr-14 text-slate-900 placeholder:slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-2.5 my-auto rounded-md px-2.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 active:scale-[0.98] sm:right-3"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

const Shell = ({ children }) => (
  <div className="relative min-h-screen grid place-items-center bg-gradient-to-b from-emerald-50 via-white to-sky-50 px-4 py-6 sm:px-6 sm:py-10">
    <div className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-28 -left-10 h-56 w-56 rounded-full bg-sky-200/50 blur-3xl" />
    <div className="w-full max-w-md">{children}</div>
  </div>
);

const Card = ({ title, subtitle, children }) => (
  <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl">
    <div className="px-5 pt-6 sm:px-6 sm:pt-8">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 ring-1 ring-emerald-300 sm:h-14 sm:w-14">
        <span className="text-xl sm:text-2xl">♻️</span>
      </div>
      <h1 className="text-center text-xl sm:text-2xl font-semibold text-slate-900">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-center text-xs sm:text-sm text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
    <div className="px-5 pb-6 sm:px-6 sm:pb-8">{children}</div>
  </div>
);

export default function Signup() {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [agree, setAgree] = useState(true);

  const { register, loading, error, clearError } = useAuthStore();
  // const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    clearError();

    if (!agree) {
      // you can also set a local message UI if you don't want alert()
      alert("Please accept the Terms and Privacy Policy.");
      return;
    }
    if (!form.displayName || !form.email || !form.password) return;
    if (form.password !== form.confirm) {
      alert("Passwords do not match.");
      return;
    }

    const ok = await register({
      displayName: form.displayName,
      email: form.email,
      password: form.password,
    });

    if (ok) {
      // navigate("/"); // uncomment if using react-router
    }
  };

  return (
    <Shell>
      <Card title="Create your EcoFinds account" subtitle="Join the circular economy">
        <form onSubmit={submit} className="flex flex-col gap-3.5 sm:gap-4">
          <Input
            label="Display Name"
            id="displayName"
            placeholder="Your name"
            autoComplete="nickname"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
            disabled={loading}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={loading}
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={loading}
            required
          />
          <PasswordInput
            label="Confirm Password"
            id="confirm"
            placeholder="Re-enter password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            disabled={loading}
            required
          />

          <label className="mt-0.5 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-300"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={loading}
            />
            I agree to the Terms and Privacy Policy.
          </label>

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs sm:text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-1.5 w-full rounded-2xl px-4 py-3 sm:py-3.5 font-medium text-white shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300 ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99]"
            }`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-slate-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
          >
            Login
          </a>
        </p>
      </Card>
    </Shell>
  );
}
