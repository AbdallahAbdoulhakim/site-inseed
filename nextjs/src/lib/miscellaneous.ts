export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    // Subtract 3 from maxLength to account for the '...'
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}



export const contact: {
  email: string;
  telephone: string;
  address:string;
  bp:string;
  country:string;
  socials: { id: number; type: string; link: string;  }[];
} = {
  email: "secretariat@inseed-comores.org",
  telephone: "+269 733 14 20",
  address:"Avenue de la République Populaire de Chine",
  country:"Comores",
  bp:"Moroni, BP 131",
  socials: [
    {
      id: 1,
      type: "Twitter-X",
      link: "https://x.com/",
      
    },
    {
      id: 2,
      type: "Facebook",
      link: "https://facebook.com/",
      
    },
    {
      id: 3,
      type: "Instagram",
      link: "https://instagram.com/",
      
    },
    {
      id: 4,
      type: "LinkedIn",
      link: "https://linkedin.com/",
      
    },
  ],
};