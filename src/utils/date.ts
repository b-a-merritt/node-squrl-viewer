export const isDateValid = (dateStr: unknown) => {
  return !isNaN(new Date(`${dateStr}`).getTime());
}
