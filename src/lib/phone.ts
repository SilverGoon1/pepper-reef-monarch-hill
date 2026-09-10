export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function looksLikePhone(value: string) {
  const d = digitsOnly(value);
  return d.length === 10 || (d.length === 11 && d.startsWith("1"));
}

export function toTenDigitPhone(value: string) {
  const d = digitsOnly(value);
  if (d.length === 11 && d.startsWith("1")) return d.slice(1);
  if (d.length === 10) return d;
  return "";
}

export function formatPhone(value: string) {
  const d = toTenDigitPhone(value);
  if (d.length !== 10) return value;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Map an email or US phone into the Better Auth email identifier. */
export function identifierToEmail(raw: string) {
  const trimmed = raw.trim();
  const phone = toTenDigitPhone(trimmed);
  if (phone) return { email: `${phone}@phone.southend.pizza`, phone };
  return { email: trimmed.toLowerCase(), phone: undefined as string | undefined };
}

export function phoneFromAuthEmail(email: string | null | undefined) {
  if (!email) return "";
  const m = email.match(/^(\d{10})@phone\.southend\.pizza$/i);
  return m ? m[1] : "";
}
