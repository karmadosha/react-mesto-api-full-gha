import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__personal">
          <button
           className="profile__edit-avatar-btn" 
           onClick={props.onEditAvatar}>
            <img
              className="profile__avatar" 
              src={currentUser.avatar} 
              alt="Аватар пользователя" />
          </button>
          <div className="profile__info">
            <div className="profile__info-group">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
               className="profile__edit-btn" 
               type="button" 
               aria-label="редактировать профиль" 
               onClick={props.onEditProfile} />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
         className="profile__add-btn"
         type="button" 
         aria-label="добавить место" 
         onClick={props.onAddNewCard} />
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card 
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />    
       ))}
      </section>
    </main>   
  )
}
export default Main;