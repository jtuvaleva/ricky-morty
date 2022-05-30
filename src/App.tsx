import { ChangeEvent, useEffect, useState } from 'react';
import logo from './logo3.png';
import './App.css';
import { CharacterList } from './components/CharacterList/CharacterList';
import { Filter } from './components/Filter/Filter';
import { CharacterArray } from './types';
import { fetchMetaData } from './utils';
import { MultiValue } from 'react-select';

function App() {
  const [characterData, setCharacterData] = useState<CharacterArray[]|[]>([]);
  const [filteredData, setFilteredData] = useState<CharacterArray[]|[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<MultiValue<{value:string, label:string}>>([]);
  const [filterType, setFilterType] = useState<MultiValue<{value:string, label:string}>>([]);
  const [filterStatus, setFilterStatus] = useState({"Alive": false});
	const [filterGender, setFilterGender] = useState({"Male": false});
	const [filterSpecies, setFilterSpecies] = useState({"Human": false});

  useEffect(() => {
    setLoading(true);

    fetchMetaData()
      .then(data =>{
        setCharacterData(data)
        setFilteredData(data)})
      .finally(()=> setLoading(false));

  }, []);

  const handleChangeName = (value:MultiValue<{value:string, label:string}>):void => {
    setFilterName(value);
	};

  const handleChangeType = (value:MultiValue<{value:string, label:string}>):void => {
    setFilterType(value);
	};

  const handleChangeStatus = (evt: ChangeEvent<HTMLInputElement>) => {
		setFilterStatus({
			...filterStatus,
			[evt.target.name]: evt.target.checked 
		})
	}

  const handleChangeGender = (evt: ChangeEvent<HTMLInputElement>) => {
		setFilterGender({
			...filterGender,
			[evt.target.name]: evt.target.checked 
		})
	}

	const handleChangeSpecies = (evt: ChangeEvent<HTMLInputElement>) => {
		setFilterSpecies({
			...filterSpecies,
			[evt.target.name]: evt.target.checked 
		})
	}

  const handleSubmit = (evt: SubmitEvent) => {
    let tmpFilter = [...characterData];
    const status = Object.keys(Object.fromEntries(Object.entries(filterStatus).filter(value => value[1] === true)));
    const gender = Object.keys(Object.fromEntries(Object.entries(filterGender).filter(value => value[1] === true)));
    const speciesArray = Object.keys(Object.fromEntries(Object.entries(filterSpecies).filter(value => value[1] === true)));
    const nameArray = filterName.map(r => r.label);
    const typeArray = filterType.map(r => r.label);

    if (nameArray.length > 0) {
      tmpFilter = tmpFilter.filter((item: {name:string}) =>  nameArray.includes(item.name.split(' ')[0]));
    }

    if (typeArray.length > 0) {
      tmpFilter = tmpFilter.filter((item: {type:string}) =>  typeArray.includes(item.type));
    }

    if (status.length > 0) {
      tmpFilter = tmpFilter.filter((item: {status:string}) => status.includes(item.status))
    }

    if (gender.length > 0) {
      tmpFilter = tmpFilter.filter((item: {gender:string}) => gender.includes(item.gender))
    }

    if (speciesArray.length > 0) {
      tmpFilter = tmpFilter.filter((item: {species:string}) => speciesArray.includes(item.species))
    }

    setFilteredData(tmpFilter);
  }

  const handleReset = (evt: SubmitEvent) => {
    setFilterName([]);
    setFilterType([]);
    setFilterStatus({"Alive": false});
    setFilterGender({"Male": false});
    setFilterSpecies({"Human": false});
    setFilteredData(characterData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Filter 
              characterData={characterData}
              filterName={filterName}
              filterType={filterType}
              filterStatus={filterStatus}
              filterGender={filterGender}
              filterSpecies={filterSpecies}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              handleChange={handleChangeName}
              handleChangeType={handleChangeType}
              handleChangeStatus={handleChangeStatus}
              handleChangeGender={handleChangeGender}
              handleChangeSpecies={handleChangeSpecies}
             />
             {isLoading && <div className='spinner'></div>}
          <CharacterList isLoading={isLoading}
                     characterData={filteredData}
              />
     
    </div>
  );
}

export default App;
