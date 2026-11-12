"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircleAlert, Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginSchema = Yup.object({
  email: Yup.string().trim().email("Enter a valid email address").required("Enter your work email"),
  password: Yup.string().required("Enter your password"),
});

const inputClass =
  "h-12 rounded-[14px] border-brand-100 bg-brand-50/60 pl-11 text-[15px] transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 hover:border-brand-200 focus-visible:border-brand-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand-500/15 md:text-[15px]";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { email: "", password: "", remember: true },
      validationSchema: LoginSchema,
      onSubmit: async () => {
        // There is no admin auth service yet (apps/api is empty). Call it here once it exists;
        // the button's loading state follows this promise.
      },
    });

  const emailError = touched.email ? errors.email : undefined;
  const passwordError = touched.password ? errors.password : undefined;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <Field id="email" label="Work email" icon={Mail} error={emailError}>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          placeholder="you@company.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field
        id="password"
        label="Password"
        icon={Lock}
        error={passwordError}
      >
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? "password-error" : undefined}
          className={`${inputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((shown) => !shown)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-1.5 my-auto grid size-9 place-items-center rounded-lg text-slate-400 transition-colors outline-none hover:bg-brand-50 hover:text-brand-700 focus-visible:ring-3 focus-visible:ring-brand-500/40"
        >
          {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
        </button>
      </Field>

      <div className="flex items-center gap-2.5 pt-0.5">
        <Checkbox
          id="remember"
          checked={values.remember}
          onCheckedChange={(checked) => setFieldValue("remember", checked === true)}
        />
        <Label htmlFor="remember" className="cursor-pointer text-[13px] font-medium text-muted-foreground">
          Keep me signed in on this device
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="group/submit relative h-12 w-full gap-2 overflow-hidden rounded-[14px] bg-linear-to-br from-violet-500 via-violet-600 to-purple-700 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(124_58_237/0.9),inset_0_1px_0_rgb(255_255_255/0.25)] transition-[translate,box-shadow] hover:-translate-y-px hover:shadow-[0_20px_40px_-14px_rgb(124_58_237/0.9),inset_0_1px_0_rgb(255_255_255/0.25)] focus-visible:border-violet-400 focus-visible:ring-violet-500/40 disabled:opacity-80"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/submit:translate-x-[350%]"
        />
        {isSubmitting ? (
          <>
            <LoaderCircle className="animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign in
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  error,
  action,
  children,
}: {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  error?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label htmlFor={id} className="text-[13px] font-semibold text-brand-950">
          <Icon className="size-4 text-brand-700" />
          {label}
        </Label>
        {action}
      </div>
      <div className="group/field relative">
        <Icon className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-brand-600" />
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-[13px] text-destructive">
          <CircleAlert className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
