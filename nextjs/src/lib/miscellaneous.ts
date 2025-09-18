export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    // Subtract 3 from maxLength to account for the '...'
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}


export function splitNumbersFromString(str:string | undefined, sep:string="+"){

  if(!str) return

  const numbers = str.split("+");


  return numbers

}