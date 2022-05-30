import { CharacterArray } from "./types";

export async function fetchMetaData() {
    let allData:CharacterArray[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;
    
  
    while(morePagesAvailable) {
      currentPage++;
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      let { results, info } = await response.json();
      allData.push(...results)
      morePagesAvailable = currentPage < info.pages;
    }
  
    return allData;
  }


export const extractArrayOptions = (data:CharacterArray[], fieldName: keyof CharacterArray):any => {
		return Array.from(new Set(data.map(item => item[fieldName]))).sort()
}