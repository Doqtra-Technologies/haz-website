import type { SubmitResult } from "@/core/domain/entities/submissions";
import type { NewsletterGateway } from "@/core/domain/repositories";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class SubscribeNewsletter {
  constructor(private readonly gateway: NewsletterGateway) {}

  async execute(raw: unknown): Promise<SubmitResult> {
    const email =
      raw && typeof raw === "object" && "email" in raw
        ? String((raw as { email: unknown }).email ?? "").trim()
        : "";

    if (!EMAIL.test(email)) {
      return { ok: false, errors: { email: "Enter a valid email address" } };
    }
    await this.gateway.subscribe(email);
    return { ok: true };
  }
}
