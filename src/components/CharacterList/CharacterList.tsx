import React, { useMemo, useState } from "react";
import './CharacterList.css';

export function CharacterList(props: { isLoading: boolean, characterData: any}) {
	const { characterData, isLoading} = props;
	const [activeCharacter, setActiveCharacter] = useState<string>("");
	const [showMore, setShowMore] = useState<number>(12);

	const handleCLick = (id: string):void => {
		if (activeCharacter === id) {
			setActiveCharacter("");
		} else {
			setActiveCharacter(id);
		}
	}

	const handleAddMore = () => {
		setShowMore(showMore + 12)
	}

	const showedCharacter = useMemo(()=> characterData.slice(0, showMore), [characterData, showMore])

	return(
		<div className="character-gallery">
			{
				!isLoading && (
					showedCharacter.length > 0 ? (
						<ul className="character-list">
							{
								showedCharacter.map((item: { id: string; name: string; 
															 image: string; gender:string;
															 species:string; status:string; 
															 location:any; type:string;})=>(
									<li key={item.id}
										className="character-card" 
										onClick={() => {
											handleCLick(item.id)
										}}>
											<div className="character-image__container">
												<img className="character-image"
													src={item.image} 
													alt={`character-${item.name}`} />
											</div>
											<p className="character__name">{item.name}</p>	

										<div className={activeCharacter === item.id ? "character-popup character-popup_opened" : "character-popup"}>
											
											<ul className="character-popup__description">
												<li className="character__popup-title">{item.name}</li>
												<li className="character__popup-text">
													<span>Gender:</span> {item.gender}
												</li>
												<li className="character__popup-text">
													<span>Species:</span> {item.species}
												</li>
												{item.type.length > 0 && (
													<li className="character__popup-text">
														<span>Type:</span> {item.type}
													</li>)}
												{item.status!=="unknown" && (
												<li className="character__popup-text">
													<span>Status:</span> {item.status}
												</li>)}
												{item.location.name!=="unknown"&& (
												<li className="character__popup-text">
													<span>Location:</span> {item.location.name}
												</li>)}
											</ul>
											
											<img className="character__popup-image"
													src={item.image} 
													alt={`character-${item.name}-small`}/>
										</div>							
									</li>
								)
								)
							}
						</ul>
					):(
						<div className="character-list__empty">No characters found</div>
					)
				)
			}
			
			{
				(showedCharacter.length < characterData.length ) &&
				<button type="submit" className="showmore" onClick={handleAddMore}>Show more</button>
			}
			
		</div>
	)
}