import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked ? 'element__like_active' : ''}`);

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  return(
    <div className="element">
      <img
       className="element__picture"
       src={`${props.card.link}`}
       alt={`${props.card.name}`}
       onClick={handleCardClick} />
      {isOwn && 
        <button 
          className="element__remove" 
          type="button" 
          aria-label="удалить карточку" 
          onClick={handleDeleteClick}/>}
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button
           className={cardLikeButtonClassName} 
           type="button" 
           aria-label="поставить лайк"
           onClick={handleLikeClick}
          />
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
export default Card;