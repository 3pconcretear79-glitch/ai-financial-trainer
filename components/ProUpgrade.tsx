"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PRO_PRICE = 49;
const PRO_PRICE_STR = "49.00";

type CheckoutStep = "capture" | "paying" | "verifying" | "success" | "error";

const proFeatures = [
  "Unlimited AI coaching sessions",
  "Advanced portfolio optimization",
  "Tax-loss harvesting alerts",
  "Custom wealth-building roadmap",
  "Real-time market opportunity alerts",
  "Weekly AI-generated wealth report",
  "Priority email & chat support",
];

export default function ProUpgrade() {
  const [step, setStep] = useState<CheckoutStep>("capture");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleStartPayment = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    setStep("paying");
  };

  const handleVerify = async (orderID: string) => {
    setStep("verifying");
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID, product: "pro-monthly", email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setErrorMsg(data.error || "Payment verification failed. Please contact support.");
        setStep("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStep("error");
    }
  };

  return (
    <section id="pro" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-950/70 to-indigo-950/50 border border-blue-700/40 rounded-3xl p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 text-sm font-semibold px-5 py-2 rounded-full mb-4">
              ⚡ Pro Plan
            </div>
            <h2 className="text-3xl font-bold text-white">Unlock Your Full Wealth Potential</h2>
            <p className="mt-2 text-gray-400 text-sm">Cancel anytime. No contracts. Start today.</p>
            <p className="mt-4 text-5xl font-bold text-blue-400">
              $49 <span className="text-lg text-gray-400 font-normal">/month</span>
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {step === "capture" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStartPayment()}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
                {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
                <p className="mt-1 text-xs text-gray-500">We&apos;ll send your account activation details here.</p>
              </div>
              <button
                onClick={handleStartPayment}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-colors"
              >
                Upgrade to Pro — ${PRO_PRICE}/mo
              </button>
            </div>
          )}

          {step === "paying" && (
            <div className="space-y-4">
              <div className="rounded-xl bg-blue-900/30 border border-blue-700/30 px-4 py-3 flex items-center gap-2">
                <span className="text-blue-400 text-sm">📧</span>
                <span className="text-sm text-gray-300">Activating Pro for <strong className="text-white">{email}</strong></span>
              </div>
              <p className="text-sm text-gray-400 text-center">Complete your payment via PayPal:</p>
              <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "rect", label: "subscribe" }}
                createOrder={(_data: Record<string, unknown>, actions: Record<string, unknown>) => {
                  const orderActions = actions as { order: { create: (opts: Record<string, unknown>) => Promise<string> } };
                  return orderActions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                      amount: { currency_code: "USD", value: PRO_PRICE_STR },
                      description: `Wealth Builder Pro — Monthly Plan (${email})`,
                    }],
                  });
                }}
                onApprove={async (data: Record<string, unknown>) => {
                  await handleVerify(data.orderID as string);
                }}
                onError={() => {
                  setErrorMsg("PayPal encountered an error. Please try again.");
                  setStep("error");
                }}
                onCancel={() => setStep("capture")}
              />
              <button onClick={() => setStep("capture")} className="w-full text-xs text-gray-500 hover:text-gray-300">
                ← Change email
              </button>
            </div>
          )}

          {step === "verifying" && (
            <div className="py-8 text-center">
              <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm mt-3">Confirming your payment...</p>
            </div>
          )}

          {step === "success" && (
            <div className="rounded-xl bg-green-900/40 border border-green-600/40 p-6 text-center">
              <p className="text-3xl mb-2">🎉</p>
              <p className="text-green-400 font-bold text-xl">Welcome to Wealth Builder Pro!</p>
              <p className="text-gray-400 text-sm mt-2">
                Your Pro account is active. Check <strong className="text-white">{email}</strong> for your login details.
              </p>
            </div>
          )}

          {step === "error" && (
            <div className="space-y-3">
              <div className="rounded-xl bg-red-900/30 border border-red-600/30 p-4">
                <p className="text-red-400 text-sm">{errorMsg}</p>
              </div>
              <button
                onClick={() => { setStep("capture"); setErrorMsg(null); }}
                className="w-full text-sm text-gray-400 hover:text-gray-200"
              >
                ← Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
