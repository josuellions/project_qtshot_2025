function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const dia = date.getDate().toLocaleString().padStart(2, "0");
  const mes = date.toLocaleDateString("pt-BR", { month: "short" });
  const ano = date.getFullYear();
  const diaSemana = date.toLocaleDateString("pt-BR", { weekday: "long" });

  return `${dia} de ${mes} de ${ano} (${diaSemana})`;
}

// function capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

function formatDateExtensive(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedDate = formatter.format(date);

  const result = formattedDate.replace(/\bDe\b/g, "de");

  return result;
}

function formatDateDayOfTheWeek(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  });

  return formatter.format(date);
}

export { formatDate, formatDateExtensive, formatDateDayOfTheWeek };
