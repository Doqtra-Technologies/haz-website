export interface GroupEnquiry {
  locationSlug?: string;
  bookingOption: string;
  date: string;
  guests: string;
  startTime: string;
  eventType: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  message: string;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };
