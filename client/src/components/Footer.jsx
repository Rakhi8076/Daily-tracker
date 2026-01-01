import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Productivity Tracker — All Rights Reserved |
      Made with ❤️ by <span className="r-name">Rakhi</span>
    </footer>
  );
}

export default Footer;
