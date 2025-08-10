export function formatLocalCurrency(value: string) {
  if (!value) return "";
  const numValue =
    typeof value === "string"
      ? parseInt(value.replace(/[^0-9]/g, ""), 10)
      : value;
  if (isNaN(numValue)) return "";
  return `Rp ${numValue.toLocaleString("id-ID")}`;
}
