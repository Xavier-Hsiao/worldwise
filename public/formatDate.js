// Turn date info into dd/mm/yyyy format

export default function formatDate(date) {
  return new Intl.DateTimeFormat("tw", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
