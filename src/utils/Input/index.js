// Custom input component with error message support and different states (success, error, default)

import './Input.css';

const Input = (props) => {
  // error - To show error message and trigger error state
  // onChange - Callback to when there is a change in input
  const { name, placeholder, type, error, value, onChange } = props;

  return (
    <div className='broccoli-input-container'>
      <label>
        <span className='broccoli-input-label'>{placeholder}</span>
        <input
          className={`broccoli-input${error ? ' broccoli-input--error' : ''}${
            !error && value ? ' broccoli-input--success' : ''
          }`}
          name={name}
          placeholder={placeholder}
          type={type ? type : 'text'}
          value={value}
          onChange={onChange}
        />
      </label>
      <span className='broccoli-input-error'>{error}&nbsp;</span>
    </div>
  );
};

export default Input;
