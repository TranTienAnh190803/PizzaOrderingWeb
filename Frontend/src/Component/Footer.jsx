import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className={`bg-dark text-white py-4 mt-5 `}>
        <div className="container text-center">
          <h5 className="mb-3">
            TTAPizza - Fullstack project using Reactjs, ASP.NET CORE API and
            SQLServer
          </h5>
          <div className="mb-3">
            <a
              href="https://facebook.com"
              className="me-3 text-white footer-facebook"
              title="Facebook"
            >
              <FaFacebook className="fa-lg" />
            </a>
            <a
              href="https://youtube.com"
              className="me-3 text-white footer-youtube"
              title="Youtube"
            >
              <FaYoutube className="fa-lg" />
            </a>
            <a
              href="https://github.com"
              className="text-white footer-github"
              title="Github"
            >
              <FaGithub className="fa-lg" />
            </a>
          </div>
          <p className="mb-0 small">Made by Trần Tiến Anh - from Việt Nam</p>
        </div>
      </footer>
    </>
  );
}
