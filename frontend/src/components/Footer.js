import React from 'react';
import Logo from '../Images/logo.png';

const Footer = () => {
  return (
    <footer className="px-5 text-light">
      <div className="footer-left">
        <div className="footer-logo">
          <img className="footer-logo-img" src={Logo} alt="logo" />
        </div>
        <h4 style={{ textAlign: 'center', color: '#fff' }}>
          &ldquo;Development is in you&rdquo;
        </h4>
        <hr />
        <div className="footer-links">
          <ul className="footer-list-links">
            <li>
              <a style={{ textDecoration: 'none', color: '#fff' }} href="/">
                Home
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: 'none', color: '#fff' }}
                href="mailto: mobxshop2021@gmail.com"
              >
                Contact
              </a>
            </li>
            <li>
              <a style={{ textDecoration: 'none', color: '#fff' }} href="/#">
                About us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-middle">
        <p>Copyright &copy; 2021. All rights reserved</p>
        <p>Made by Saral Karki</p>
      </div>
    </footer>
  );
};

export default Footer;
