export function formatMoney(value: number | null | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(miles: number | null | undefined): string {
  if (miles == null) return "—";
  return `${new Intl.NumberFormat("en-US").format(miles)} mi`;
}

export function vehicleTitle(v: {
  year: number;
  make: string;
  model: string;
  trim?: string | null;
}): string {
  return [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ");
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
