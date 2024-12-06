import { useContextGlobal } from "./utils/ContextGlobal";

const Footer = () => {

  const { state } = useContextGlobal();

  return (
    <footer className="footer" id={state.theme}>
      <div className="DhLogo">
        <p>Powered by</p>
        <img src="./images/DH.png" alt="DH-logo" />
      </div>
      <div className="social-media">
        <img src="./images/ico-facebook.png" alt="facebook" />
        <img src="./images/ico-instagram.png" alt="facebook" />
        <img src="./images/ico-tiktok.png" alt="facebook" />
        <img src="./images/ico-whatsapp.png" alt="facebook" />
      </div>
    </footer>
  );
};

export default Footer;
