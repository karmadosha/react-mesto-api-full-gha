import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({ isOpen, onAddPlace, onClose, isLoading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink });
  }

  return (
    <PopupWithForm
      name='new-card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      submitText='Создать'
      onSubmit={handleSubmit}>
      <input
        className="form__item form__item_card_name"
        value={placeName || ''}
        type="text" 
        id="place" 
        name="name" 
        placeholder="Название" 
        minLength="2" 
        maxLength="30" 
        required={true} 
        onChange={handlePlaceNameChange}/>
        <span className="form__error form__error_field_place" id="place-error" />
      <input
        className="form__item form__item_card_about"
        value={placeLink || ''}
        type="url" 
        id="link" 
        name="link" 
        placeholder="Ссылка на картинку" 
        minLength="2" 
        required={true} 
        onChange={handlePlaceLinkChange}/>
      <span className="form__error form__error_field_link" id="link-error" />
        
    </PopupWithForm>
  )
}

export default AddPlacePopup;