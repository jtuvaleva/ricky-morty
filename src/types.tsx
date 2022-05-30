import { ChangeEventHandler } from "react";

export interface CharacterArray {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
      name: string,
      url: string
    },
    location: {
      name: string,
      url: string
    },
    image: string,
    episode: Array<string>,
    url: string,
    created: string
}

export interface CheckboxPropsType {
  id?:string,
  item?:string,
  filterName:string,
  type:string,
  isChecked?:boolean,
  onChange?:ChangeEventHandler<HTMLInputElement> | undefined
}

export interface FilterPropsType {
  characterData:CharacterArray[], 
  filterName: any, 
  filterType: any, 
  filterStatus:any,
  filterGender:any, 
  filterSpecies:any, 
  handleSubmit:any, 
  handleReset:any, 
  handleChange:any, 
  handleChangeType:any, 
  handleChangeStatus:any,
	handleChangeGender:any, 
  handleChangeSpecies:any
}

export interface OptionArray  {
  "label": string,
  "value": string
}