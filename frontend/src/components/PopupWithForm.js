function PopupWithForm({ isOpen, onClose, name, title, children, submitText, onSubmit, isLoading }) {

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
         className="popup__close-btn" 
         type="button" 
         aria-label="закрыть окно"
         onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`form form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          >
            {children}
            <button 
              className="form__save-btn" 
              type="submit"
              value={submitText}
              aria-label="сохранить данные"
              >
              {(isOpen && isLoading) ? 'Сохранение...' : 'Сохранить'}
            </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;