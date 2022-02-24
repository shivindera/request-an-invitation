// Static Header component

import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className='broccoli-header'>
      <div className='broccoli-header-container'>
        <a className='broccoli-link' href='/' rel='noopener noreferrer'>
          <img src={logo} className='broccoli-header-logo' alt='logo' />
        </a>
        <h1 className='broccoli-header-text'>BROCCOLI & CO.</h1>
      </div>
    </header>
  );
};

export default Header;
