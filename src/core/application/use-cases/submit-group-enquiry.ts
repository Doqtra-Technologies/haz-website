import type {
  GroupEnquiry,
  SubmitResult,
} from "@/core/domain/entities/submissions";
import type { EnquiryGateway } from "@/core/domain/repositories";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 300;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export class SubmitGroupEnquiry {
  constructor(private readonly gateway: EnquiryGateway) {}

  async execute(raw: unknown): Promise<SubmitResult> {
    const input = (raw && typeof raw === "object" ? raw : {}) as Record<
      string,
      unknown
    >;

    const enquiry: GroupEnquiry = {
      locationSlug: str(input.locationSlug) || undefined,
      bookingOption: str(input.bookingOption),
      date: str(input.date),
      guests: str(input.guests),
      startTime: str(input.startTime),
      eventType: str(input.eventType),
      firstName: str(input.firstName),
      lastName: str(input.lastName),
      mobile: str(input.mobile),
      email: str(input.email),
      message: str(input.message),
    };

    const errors: Record<string, string> = {};
    if (!enquiry.bookingOption) errors.bookingOption = "Choose a booking option";
    if (!enquiry.date) errors.date = "Choose a date";
    const guests = Number(enquiry.guests);
    if (!Number.isInteger(guests) || guests < 1)
      errors.guests = "Enter the number of people";
    if (!enquiry.firstName) errors.firstName = "Required";
    if (!enquiry.lastName) errors.lastName = "Required";
    if (!enquiry.mobile) errors.mobile = "Required";
    if (!EMAIL.test(enquiry.email)) errors.email = "Enter a valid email";
    if (enquiry.message.length > MAX_MESSAGE)
      errors.message = `Keep it under ${MAX_MESSAGE} characters`;

    if (Object.keys(errors).length > 0) return { ok: false, errors };

    await this.gateway.send(enquiry);
    return { ok: true };
  }
}
