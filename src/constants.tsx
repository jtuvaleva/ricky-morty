import { Theme } from "react-select";

export const CUSTOM_THEME = (theme:Theme):Theme => ({
	...theme,
	colors: {
	  ...theme.colors,
	  primary: '#62a4ab',
	  primary25: '#62a4ab25',
	  primary75: '#62a4ab75',
	  primary50: '#62a4ab50',
	  danger: "#d4d4d4",
	  dangerLight: "#d4d4d420",
	  neutral50:"#62a4ab",
	  neutral20:"#62a4ab",
	  neutral40:"#62a4ab80",
	  neutral60:"#62a4ab80",
	  neutral80:"#62a4ab",
	},
})

export const CUSTOME_STYLES = {
	control:(provided:any, state:any) => ({
		...provided,
		backgroundColor: "transparent",
		borderRadius: "5px 5px 0 0",
		border: "none",
	  }),
    valueContainer: (provided:any, state:any) => ({
		...provided,
		padding: "2px 4px",
	}),
	container: (provided:any, state:any) => ({
		...provided,
		backgroundColor: "transparent",
		border: "none",
		borderBottom: "2px solid #62a4ab",
	  }),
	option: (provided:any, state:any) => ({
	  ...provided,
	  textAlign: 'left',
	  color: state.isSelected ? 'red' : '#292929',
	  padding: 10,
	}),
	placeholder: (provided:any, state:any) => ({
		...provided,
		textAlign: "left"
	}),
	multiValue: (provided:any, state:any) => ({
	  ...provided,
	  backgroundColor: state.isSelected ? 'red': "#62a4ab",
	  borderRadius: 5,
	  padding: "5px 10px",
	  color: "white"
	}),
	multiValueLabel:(provided:any, state:any) => ({
		...provided,
		color: "white"
	})
}