import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, isLoading }) {
  
  const avatarInput = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarInput.current.value);
  }

  return (
    <PopupWithForm
      name='avatar-edit'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      submitText='Сохранить'>
      <input
        ref={avatarInput}
        className="form__item form__item_avatar-url" 
        type="url" 
        id="avatar" 
        name="link" 
        placeholder="Ссылка на фотографию" 
        required />
      <span className="form__error form__error_field_avatar" id="avatar-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;