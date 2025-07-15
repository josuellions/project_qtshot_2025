function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const dia = date.getDate().toString().padStart(2, "0");
  const mes = date.toLocaleDateString("pt-BR", { month: "short" });
  const ano = date.getFullYear();
  const diaSemana = date.toLocaleDateString("pt-BR", { weekday: "long" });

  return `${dia} de ${mes} de ${ano} (${diaSemana})`;
}

// function capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

function formatDateExtensive(date: string) {
  const convertDate = new Date(date);

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    //weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedDate = formatter.format(convertDate);

  const result = formattedDate.replace(/\bDe\b/g, "de");

  return result;
}

function formatDateDayOfTheWeek(date: string) {
  const convertDate = new Date(date);

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  });

  return formatter.format(convertDate);
}

export { formatDate, formatDateExtensive, formatDateDayOfTheWeek };
