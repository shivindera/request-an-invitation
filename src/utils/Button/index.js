// Custom button component

import './Button.css';

const Button = (props) => {
  // type - To switch between button types. Namely, primary and disabled
  // onClick - Callback to when the button is clicked
  const { children, type, onClick } = props;
  const typeClass = type ? ` broccoli-button--${type}` : '';

  return (
    <button type='button' className={`broccoli-button${typeClass}`} disabled={type === 'disabled'} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
