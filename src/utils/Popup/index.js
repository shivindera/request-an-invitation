// Popup component to provide popup functionality

import './Popup.css';

const Popup = (props) => {
  // isOpen - Flag to show or hide the popup
  // onClose - Callback to when the popup is closed or a click is made outside the popup
  const { children, isOpen, onClose } = props;
  return isOpen ? (
    <>
      <div className='broccoli-popup-mask' onClick={() => onClose()}></div>
      <div className='broccoli-popup'>
        <span className='broccoli-popup-close' onClick={() => onClose()} />
        <div className='broccoli-popup-container'>{children}</div>
      </div>
    </>
  ) : null;
};

export default Popup;
