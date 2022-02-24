// Static Footer component

import './Footer.css';

const Footer = () => {
  return (
    <footer className='broccoli-footer'>
      <div className='broccoli-footer-container'>
        <p>
          Made with <span className='broccoli-footer-heart'>&#10084;</span> at Home
        </p>
        <p>&copy; 2022 Broccoli & Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
