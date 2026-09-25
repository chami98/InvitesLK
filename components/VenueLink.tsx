import { getVenueMapsLink, type CoupleInvite } from "@/lib/data";

/** Venue name that opens Google Maps; inherits the surrounding template typography. */
export function VenueLink({ couple }: { couple: Pick<CoupleInvite, "venue" | "venueMapUrl"> }) {
  return (
    <a
      href={getVenueMapsLink(couple)}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-dotted decoration-1 underline-offset-4 transition hover:opacity-75"
      aria-label={`${couple.venue} — open in Google Maps`}
    >
      {couple.venue}
    </a>
  );
}
