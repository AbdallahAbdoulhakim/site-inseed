"use server";

// import Papa from "papaparse";

// interface Data {
//   date: string | number;
//   [key: string]: string | number;
// }


// export async function keyIndicatorFetcher(dataUrl: string) {

//   Papa.parse<Data>(dataUrl, {
//     download:true,
//     header: true,
//     complete: (results) => {
//       const rows: Data[] = results.data;
//       return rows;
//     },
//   });
// }