export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupProfile = document.querySelector('.popup_type_profile');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formProfileEdit = popupProfile.querySelector('.form_type_profile');
export const nameInput = formProfileEdit.querySelector('.form__item_user_name');
export const aboutInput = formProfileEdit.querySelector('.form__item_user_about');
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const formAvatar = document.querySelector('.form_type_avatar');
export const avatarEditBtn = document.querySelector('.profile__edit-avatar-btn');

export const popupAddCard = document.querySelector('.popup_type_new-card');
export const newCardAddBtn = document.querySelector('.profile__add-btn');
export const formNewCard = popupAddCard.querySelector('.form_type_card');

export const cardNameInput = formNewCard.querySelector('.form__item_card_name');
export const cardPictureInput = formNewCard.querySelector('.form__item_card_about');
export const cardTemplate = document.querySelector('.element-template');

export const popupImage = document.querySelector('.popup_type_big-picture');
export const popupImageTitle = popupImage.querySelector('.popup__image-title');
export const popupImagePicture = popupImage.querySelector('.popup__image');

export const popupDeleteCard = document.querySelector('.popup_type_card-delete');

export const containerSelector = document.querySelector('.elements');

export const popupSelector = document.querySelectorAll('.popup');