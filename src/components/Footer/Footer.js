import React from "react";
import './footer.scss';

const Footer = () => {
  return (
    <div className="App">
      <section id="footerSection">
        <div className="footer">
          <div className="copyright">
            &copy; Created & Designed By <i>Marian</i>
          </div>
          <div className="smm">
            <a href="https://www.instagram.com/marian_immortal/" target="_blank"> Instagram </a>
            <a href="https://www.facebook.com/m.puzdrack/" target="_blank"> Facebook </a>
            <a href="https://twitter.com/mpuzdrack" target="_blank"> Twitter </a>
            <a href="https://www.linkedin.com/in/marian-puzdrak-ba4b351b7/" target="_blank"> LinkedIn </a>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Footer;
