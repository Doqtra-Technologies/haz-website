import type { EventItem } from "@/core/domain/entities/event";
import type { EventRepository } from "@/core/domain/repositories";

export class GetEvents {
  constructor(private readonly events: EventRepository) {}
  execute(): Promise<EventItem[]> {
    return this.events.findAll();
  }
}

export class GetEventBySlug {
  constructor(private readonly events: EventRepository) {}
  execute(slug: string): Promise<EventItem | null> {
    return this.events.findBySlug(slug);
  }
}
