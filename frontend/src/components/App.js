import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from '../utils/Auth';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const[isAddNewcardPopupOpen, setNewcardPopupOpen] = useState(false);
  const[isAvatarEditPopupOpen, setAvatarEditPopupOpen] = useState(false);
  const[selectedCard, setSelectedCard] = useState(null);
  const[isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {   
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.email);
            navigate('/', {replace: true});
          }
        })
        .catch((err) => {
          console.log(err);
          })
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isLoggedIn) {
      api.getUserInfo(token)
      .then((userData) =>{
        setCurrentUser(userData);
        setUserEmail(userData.email);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isLoggedIn) {
      api.getInitialCards(token)
       .then((cards) => {
          setCards(cards.reverse());
        })
        .catch((err) => console.log(err))
    }    
  }, [isLoggedIn])

  function handleCardLike(card) {    
    const isLiked = card.likes.some((i) => i === currentUser._id);    

    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editProfile(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.editAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);    
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setAvatarEditPopupOpen(true);
    }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddNewCardClick() {
    setNewcardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setNewcardPopupOpen(false);
    setAvatarEditPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  const isOpen = isAvatarEditPopupOpen || isEditProfilePopupOpen || isAddNewcardPopupOpen || isImagePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res) {
          setIsSuccess(true);
          setInfoTooltipOpen(true);
          navigate('/signin', {replace: true});
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then(res => {
        if (res) {    
          setIsLoggedIn(true);
          localStorage.setItem('token', res.token);
          setUserEmail(email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setInfoTooltipOpen(true);
        console.log(err);
      })
  }
  
  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/signin', {repalce: true});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">      
          <Header onSignOut={handleSignOut} userEmail={userEmail} isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/" element={
              <ProtectedRoute 
                element={Main}
                isLoggedIn={isLoggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddNewCard={handleAddNewCardClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />}
            />
            <Route path="/*" element={
              <Navigate to={isLoggedIn ? '/' : '/signin'} />
            }
            />
          </Routes>          
          <Footer />
          <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen={isAddNewcardPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup
            isOpen={isAvatarEditPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onUpdateAvatar={handleUpdateAvatar}
          />      

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}        
          />

          <InfoTooltip 
            isOpen={infoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
    )
  }   


export default App;