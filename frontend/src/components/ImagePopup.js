function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_big-picture ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__image-block">
        <img 
          className="popup__image" 
          src={card?.link}
          alt={card?.name} />
        <figcaption className="popup__image-title">
          {card?.name}
        </figcaption>
        <button 
          className="popup__close-btn popup__close-btn_type_big-picture" 
          type="button" 
          aria-label="закрыть окно" 
          onClick={onClose}>
      </button>
      </figure>
    </div>
  )
}

export default ImagePopup;