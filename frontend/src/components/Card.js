import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked ? 'element__like_active' : ''}`);

  function handleCardClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  return(
    <div className="element">
      <img
       className="element__picture"
       src={`${card.link}`}
       alt={`${card.name}`}
       onClick={handleCardClick} />
      {isOwn && 
        <button 
          className="element__remove" 
          type="button" 
          aria-label="удалить карточку" 
          onClick={handleDeleteClick}/>}
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button
           className={cardLikeButtonClassName} 
           type="button" 
           aria-label="поставить лайк"
           onClick={handleLikeClick}
          />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
export default Card;