import { useMemo, useState } from "react";
import { FilterPropsType} from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import Select from 'react-select';
import { CUSTOME_STYLES, CUSTOM_THEME } from "../../constants";
import { extractArrayOptions } from "../../utils";
import './Filter.css';

export function Filter(props: FilterPropsType) {
	const {characterData, filterName, filterType, filterGender, filterSpecies, handleSubmit, handleReset, handleChange, handleChangeType, handleChangeGender, handleChangeSpecies} = props;
	const [isMoreFiltersChecked, setMoreFiltersChecked] = useState<boolean>(false);

	const handleCheck = () => {
		setMoreFiltersChecked(!isMoreFiltersChecked);
	}

	const genderOptions = useMemo(() => {
		return extractArrayOptions(characterData, "gender")
	}, [characterData])

	const speciesOptions = useMemo(() => {
		return extractArrayOptions(characterData, "species")
	}, [characterData])

	const selectOptions = useMemo(() => {
		return extractArrayOptions(characterData, "type")
		.filter((item:string) => item !=='')
		.map((item:string) => {
			return {value:item.toLowerCase(), label: item}
		})
	}, [characterData]);

	const selectNameOptions = useMemo(() => {
		return Array.from(new Set(characterData.map((item:{name:string}) => item.name.split(" ")[0])))
		.filter((item:string) => item !=='')
		.map((item:string) => {
			return {value:item.toLowerCase(), label: item}
		})
	}, [characterData]);
	
	
	return(
		<div className="filter">
			<div className="filter-group">
				<p className="filter-group__title">Name</p>
				{characterData && <Select options={selectNameOptions} 
										  className="basic-multi-select"
										  styles={CUSTOME_STYLES}
										  theme={CUSTOM_THEME}
										  isMulti
										  value={filterName}
										  onChange={handleChange}/>}
			</div>
			

			<Checkbox filterName={"Additional filter"}
					  type="checkbox" 
					  onChange={handleCheck} 
					  isChecked={isMoreFiltersChecked}/>
			{isMoreFiltersChecked && (
				<div className="filter__additional">
				<div  className="filter-group">
					<p className="filter-group__title">Type</p>
					{characterData && <Select options={selectOptions} 
											  className="basic-multi-select"
											  styles={CUSTOME_STYLES}
											  theme={CUSTOM_THEME}
											  isMulti
											  value={filterType}
											  onChange={handleChangeType}/>}
				</div>
				<div className="filter-group">
					<p className="filter-group__title">Gender</p>
					<div className="chips">
						{
							genderOptions.map((item:string) => 
								<Checkbox id={`${item}-gender`}
										  key={`${item}-gender`}
										  item = {item}
										  filterName={`${item}-gender`} 
										  isChecked={filterGender[item]}
										  type="chips"
										  onChange={handleChangeGender}/>
							)
						}
					</div>
				</div>

				<div className="filter-group">
					<p className="filter-group__title">Species</p>
					<div className="chips">
						{
							speciesOptions.map((item:string) => 
								<Checkbox id={`${item}-species`} 
										  key={`${item}-species`} 
										  item = {item}
										  filterName={`${item}-species`} 
										  isChecked={filterSpecies[item]}
										  type="chips"
										  onChange={handleChangeSpecies}/>
							)
						}
					</div>
				</div>
			</div>
			)
			}

			<div className="buttons-area">
					<button type="submit" className="filter-submit" onClick={handleSubmit}>Filter</button>
					<button type="submit" className="filter-reset" onClick={handleReset}>Clear Filter</button>
			</div>
		</div>

	)
}
