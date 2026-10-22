import type { GroupEnquiry } from "@/core/domain/entities/submissions";
import type {
  EnquiryGateway,
  NewsletterGateway,
} from "@/core/domain/repositories";

/**
 * Development gateways: they only log. Replace with real providers
 * (e.g. Resend / SendGrid for enquiries, Mailchimp / Klaviyo for the newsletter)
 * by implementing the same interfaces and swapping them in `container.ts`.
 */
export class ConsoleEnquiryGateway implements EnquiryGateway {
  async send(enquiry: GroupEnquiry): Promise<void> {
    console.log("[group-enquiry]", JSON.stringify(enquiry));
  }
}

export class ConsoleNewsletterGateway implements NewsletterGateway {
  async subscribe(email: string): Promise<void> {
    console.log("[newsletter]", email);
  }
}
