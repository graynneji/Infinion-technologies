//these are my helper functions for formatting phone numbers and dates of birth
export function formatPhoneNumber(phone: string): string {
  if (!phone) return "";

  const alreadyFormatted = /^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(phone);
  if (alreadyFormatted) return phone;

  const cleaned = phone.split(/x|ext/i)[0];

  const digits = cleaned.replace(/\D/g, "");

  if (digits.length !== 10) return phone;

  const main = digits.slice(0, 10);
  const ext = digits.length > 10 ? digits.slice(10) : "";

  const formatted = `+1 (${main.slice(0, 3)}) ${main.slice(3, 6)}-${main.slice(
    6,
    10
  )}`;

  return ext ? `${formatted} x${ext}` : formatted;
}

export function formatDateOfBirth(dob: string): string {
  if (!dob) return "";

  const alreadyFormatted = /^\d{2}\/\d{2}\/\d{4}$/.test(dob);
  if (alreadyFormatted) return dob;

  const date = new Date(dob);
  if (isNaN(date.getTime())) return dob;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
