import {
  CF7_FORM_ID,
  CF7_LOCALE,
  CF7_UNIT_TAG_PAGE_ID,
  CF7_VERSION,
  WP_JSON_BASE,
} from "@/constants/cf7";

export interface Cf7ProductInquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  quantity: number;
  message: string;
  productTitle: string;
  productSlug: string;
}

interface Cf7FeedbackResponse {
  status: string;
  message?: string;
  invalid_fields?: { field: string; message: string }[];
}

const feedbackUrl = () =>
  `${WP_JSON_BASE}/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;

export async function submitCf7ProductInquiry(
  payload: Cf7ProductInquiryPayload,
): Promise<void> {
  const fd = new FormData();

  fd.append("_wpcf7", String(CF7_FORM_ID));
  fd.append("_wpcf7_version", CF7_VERSION);
  fd.append("_wpcf7_locale", CF7_LOCALE);
  fd.append(
    "_wpcf7_unit_tag",
    `wpcf7-f${CF7_FORM_ID}-p${CF7_UNIT_TAG_PAGE_ID}-o1`,
  );

  fd.append("your-name", payload.firstName);
  fd.append("your-surname", payload.lastName);
  fd.append("your-email", payload.email);
  fd.append("your-phone", payload.phone);
  fd.append("your-company", payload.company);
  fd.append("your-quantity", String(payload.quantity));
  fd.append("your-message", payload.message);
  fd.append("product-title", payload.productTitle);
  fd.append("product-slug", payload.productSlug);
  fd.append("your-consent", "1");

  const res = await fetch(feedbackUrl(), {
    method: "POST",
    body: fd,
  });

  let data: Cf7FeedbackResponse;
  try {
    data = (await res.json()) as Cf7FeedbackResponse;
  } catch {
    throw new Error("Nieprawidłowa odpowiedź serwera.");
  }

  if (!res.ok) {
    throw new Error(
      data.message || `Błąd serwera (${res.status}). Spróbuj ponownie później.`,
    );
  }

  if (data.status === "mail_sent") return;

  if (data.status === "validation_failed" && data.invalid_fields?.length) {
    const first = data.invalid_fields[0];
    throw new Error(
      first?.message || data.message || "Błąd walidacji formularza.",
    );
  }

  throw new Error(
    data.message ||
      (data.status === "spam"
        ? "Wiadomość została odrzucona (spam)."
        : "Nie udało się wysłać wiadomości."),
  );
}
