/** The orange date stamp old film cameras burned into the corner of a photo. */
export function LedStamp({ date = new Date(), className = "" }: { date?: Date; className?: string }) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const label = `'${get("year")} ${get("month")} ${get("day")}`;

  return (
    <span className={`led text-[11px] leading-none select-none ${className}`} aria-hidden="true">
      {label}
    </span>
  );
}
