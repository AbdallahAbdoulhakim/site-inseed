export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    // Subtract 3 from maxLength to account for the '...'
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}


export function splitNumbersFromString(str:string | undefined, sep:string=" "){

  if(!str) return

  const numbers = str.split(sep).map(elt=> +elt)

  if(!numbers.every(elt=> !isNaN(elt))) return


  return numbers

}

export function splitString(str:string, lineWidth:number=30):string[]{
  

  let result = []
  let runningStr=str
  let strLen = str.length

  while (strLen){

    if(strLen <= lineWidth){
      result.push(runningStr)
      break
    }

    const listStops = [runningStr.slice(0,lineWidth).lastIndexOf(" "), 
      runningStr.slice(0,lineWidth).lastIndexOf("."), 
      runningStr.slice(0,lineWidth).lastIndexOf(","), 
      runningStr.slice(0,lineWidth).lastIndexOf(";"), ]


      result.push(runningStr.slice(0, Math.max(...listStops)+1 > lineWidth ? lineWidth : Math.max(...listStops)+1 ))


      runningStr = str.slice(Math.max(...listStops)+1 > lineWidth ? lineWidth : Math.max(...listStops)+1)
      strLen = runningStr.length
      
      
  }
  

return result
}