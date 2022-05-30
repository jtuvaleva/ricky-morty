import { CheckboxPropsType } from '../../types';
import './Checkbox.css';

export function Checkbox(props: CheckboxPropsType){
	const {item, filterName, type, isChecked, onChange} = props;

	return(
		  <>
			{type === "checkbox" ? (
				<label className="filter-checkbox">
					<input type="checkbox" 
							id={filterName}
							className="filter-checkbox__input"
							checked={isChecked} 
							onChange={onChange}/>
					<span className="filter-checkbox__mark"> </span>
					<span  className="filter-checkbox__label">{filterName}</span>
				</label>
			):(
				<>
				<input id={`${filterName}-chips`}
					   type="checkbox"
					   checked={isChecked || false}
				       name={item}
					   className="chips__input"
					   onChange={onChange}/>
				<label  className="chips__label"
						htmlFor={`${filterName}-chips`}>{item}</label>
				</>
			)
			}
			</>
	)
}