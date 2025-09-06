import React, { useState } from "react";

const Input = ({ label, id, type = "text", ...props }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
      {...props}
    />
  </div>
);

const PasswordInput = ({ label, id, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-3 my-auto rounded-md px-2 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

const Shell = ({ children }) => (
  <div className="relative min-h-dvh grid place-items-center bg-gradient-to-b from-emerald-50 via-white to-sky-50">
    {/* soft decorative blobs */}
    <div className="pointer-events-none absolute -top-20 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl"></div>
    <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl"></div>

    <div className="w-full max-w-md px-6">{children}</div>
  </div>
);

const Card = ({ title, subtitle, children }) => (
  <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-xl">
    <div className="px-6 sm:px-8 pt-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 ring-1 ring-emerald-300">
        <span className="text-2xl">♻️</span>
      </div>
      <h1 className="text-center text-2xl font-semibold text-slate-900">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-center text-sm text-slate-600">{subtitle}</p>
      )}
    </div>
    <div className="px-6 sm:px-8 pb-8">{children}</div>
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

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match.");
      return;
    }
    // TODO: POST /api/auth/register
    console.log("signup ->", form, { agree });
  };

  return (
    <Shell>
      <Card title="Create your EcoFinds account" subtitle="Join the circular economy">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input
            label="Display Name"
            id="displayName"
            placeholder="Your name"
            autoComplete="nickname"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
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
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <PasswordInput
            label="Confirm Password"
            id="confirm"
            placeholder="Re-enter password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            required
          />

          

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-emerald-600 px-4 py-3 font-medium text-white shadow-md hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
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
