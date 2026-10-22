import type { Location } from "@/core/domain/entities/location";
import type { LocationRepository } from "@/core/domain/repositories";

export class GetLocations {
  constructor(private readonly locations: LocationRepository) {}
  execute(): Promise<Location[]> {
    return this.locations.findAll();
  }
}

export class GetLocationBySlug {
  constructor(private readonly locations: LocationRepository) {}
  execute(slug: string): Promise<Location | null> {
    return this.locations.findBySlug(slug);
  }
}
