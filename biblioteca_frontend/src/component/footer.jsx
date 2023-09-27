import React from "react";
import "../App.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Mini Logo" className="logo-footer" />
      </div>
      <div className="footer-info">
        <p>
          &copy; Sebastian J. Macharette -{" "}
          {new Date().toLocaleDateString("es-ES")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
