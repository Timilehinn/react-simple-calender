import { TitleFormat } from "./type";

export const getFormatedYearMonth = (year: number, month: number) => {
  var _month = month < 10? '0'+month : month;
  return year+"-"+_month
}

export function isLessThanMin(date1: string, date2: string): boolean {
  try{
    const [year1, month1, day1] = date1.split('-').map(Number);
    const [year2, month2, day2] = date2.split('-').map(Number);
  
    const dateObj1 = new Date(year1, month1 - 1, day1);
    const dateObj2 = new Date(year2, month2 - 1, day2);
  
    if (dateObj1 < dateObj2) {
      return true
    } else if (dateObj1 > dateObj2) {
      return false
    } else {
      return true
    }
  }catch(err){
    return false
  }
}

export const getTitleFormat = (dateString: string, format?: TitleFormat) => {
  var date = new Date(dateString);
  switch (format) {
    case 'MM YY':
        return date.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' });
    case 'MMM YYY':
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    case 'MMMM YY':
        return date.toLocaleDateString('en-US', { month: 'long', year: '2-digit' });
    case 'MMMM YYYY':
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    default:
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    }
}
