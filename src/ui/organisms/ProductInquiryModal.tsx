"use client";

import React, { useEffect, useState } from "react";
import { submitCf7ProductInquiry } from "@/API/services/cf7SubmitService";
import { Product } from "@/API/models/Product";
import { links } from "@/constants";

interface ProductInquiryModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductInquiryModal: React.FC<ProductInquiryModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneLocal("");
    setCompany("");
    setQuantity(1);
    setMessage("");
    setConsent(false);
    setStatus("idle");
    setSubmitError(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setStatus("sending");
    setSubmitError(null);

    try {
      const phone = phoneLocal.trim() ? `+48 ${phoneLocal.trim()}` : "";

      await submitCf7ProductInquiry({
        firstName,
        lastName,
        email,
        phone,
        company: company.trim(),
        quantity,
        message: message.trim(),
        productTitle: product.title,
        productSlug: product.slug ?? "",
      });

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Coś poszło nie tak.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 cursor-pointer"
        aria-label="Zamknij"
        onClick={onClose}
      />
      <div className="relative z-[101] w-full max-w-lg max-h-[min(90vh,720px)] overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <button
              type="button"
              onClick={onClose}
              className="text-[#737373] cursor-pointer hover:text-black transition-colors p-1 -m-1"
              aria-label="Zamknij okno"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <h2
                id="inquiry-modal-title"
                className="text-lg md:text-xl font-bold leading-snug pr-2"
              >
                {product.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#3D3D3D]">
                {product.powerOutput && (
                  <span>
                    Moc urządzenia:{" "}
                    <strong className="text-black font-semibold">
                      {product.powerOutput}
                    </strong>
                  </span>
                )}
                {product.priceGross && (
                  <span>
                    Cena brutto:{" "}
                    <strong className="text-black font-semibold">
                      {product.priceGross}
                    </strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Widok po wysłaniu */}
          {status === "sent" ? (
            <div className="py-10 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-black">
                  Zapytanie wysłane!
                </p>
                <p className="text-sm text-[#737373] mt-1">
                  Skontaktujemy się z Tobą wkrótce.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 bg-primary-100 text-black font-bold rounded-[40px] py-3 px-8 text-sm hover:brightness-95 transition-all"
              >
                Zamknij
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs text-[#737373] mb-1 block">
                    Imię
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD006]/50 focus:border-[#FFD006]"
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-[#737373] mb-1 block">
                    Nazwisko
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD006]/50 focus:border-[#FFD006]"
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs text-[#737373] mb-1 block">
                    Adres e-mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD006]/50 focus:border-[#FFD006]"
                    autoComplete="email"
                    required
                  />
                </label>
                <div className="block">
                  <span className="text-xs text-[#737373] mb-1 block">
                    Nr telefonu
                  </span>
                  <div className="flex rounded-lg border border-[#E5E5E5] overflow-hidden focus-within:ring-2 focus-within:ring-[#FFD006]/50 focus-within:border-[#FFD006]">
                    <span className="flex items-center gap-1.5 px-2.5 py-2.5 bg-[#FAFAFA] text-sm border-r border-[#E5E5E5] shrink-0">
                      <span className="text-base leading-none" aria-hidden>
                        🇵🇱
                      </span>
                      <span className="text-sm text-[#3D3D3D]">+48</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={phoneLocal}
                      onChange={(e) => setPhoneLocal(e.target.value)}
                      placeholder="___ ___ ___"
                      className="flex-1 min-w-0 px-3 py-2.5 text-sm focus:outline-none"
                      autoComplete="tel-national"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs text-[#737373] mb-1 block">
                    Firma (opcjonalnie)
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD006]/50 focus:border-[#FFD006]"
                    autoComplete="organization"
                  />
                </label>
                <div className="block">
                  <span className="text-xs text-[#737373] mb-1 block">
                    Ilość
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#3D3D3D] shrink-0">
                      Ilość:
                    </span>
                    <div className="flex items-center rounded-lg border border-[#E5E5E5] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-lg leading-none hover:bg-[#F5F5F5] transition-colors"
                        aria-label="Zmniejsz ilość"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-sm font-medium min-w-[2.5rem] text-center border-x border-[#E5E5E5]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-2 text-lg leading-none hover:bg-[#F5F5F5] transition-colors"
                        aria-label="Zwiększ ilość"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="text-xs text-[#737373] mb-1 block">
                  Twoja wiadomość
                </span>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#FFD006]/50 focus:border-[#FFD006]"
                />
              </label>

              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#3D3D3D] text-black focus:ring-[#FFD006]"
                  required
                />
                <span className="text-sm text-[#3D3D3D]">
                  Zgadzam się na{" "}
                  <a
                    href={links.privacyPolicy}
                    className="underline font-medium text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Politykę Prywatności
                  </a>
                </span>
              </label>

              {status === "error" && (
                <p className="text-sm text-red-600 text-center">
                  {submitError ||
                    "Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio."}
                </p>
              )}

              <button
                type="submit"
                disabled={!consent || status === "sending"}
                className="w-full bg-primary-100 text-black font-bold rounded-[40px] py-3.5 px-5 text-sm hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Wysyłanie..." : "Wyślij zapytanie"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInquiryModal;
