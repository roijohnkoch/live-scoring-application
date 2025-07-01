export const formatCustomDateTime = (date: string, time: string) => {
  const [day, month, year] = date.replace(/\.$/, '').split('.');
  const isoString = `${year}-${month}-${day}T${time}`;
  const parsedDate = new Date(isoString);
  const monthStr = parsedDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // "AUG"
  const dayNum = parsedDate.getDate();
  const hours = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');

  return `${monthStr} ${getDayWithSuffix(dayNum)} ${hours}:${minutes}`;
};

const getDayWithSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return `${day}TH`;
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1: return `${day}ST`;
    case 2: return `${day}ND`;
    case 3: return `${day}RD`;
    default: return `${day}TH`;
  }
};