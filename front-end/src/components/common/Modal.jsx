function Modal(props) {
    const { isOpen, children, title, close, size } = props;
  
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal")) {
            close();
        }
    }

    return (
      <div className={`modal ${isOpen ? "modal-open" : ""}`} onClick={handleOutsideClick}>
        <div className={`modal-box relative  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={close}>✕</button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>
          {children}
        </div>
      </div>
    );
  }
  
  export default Modal;
  