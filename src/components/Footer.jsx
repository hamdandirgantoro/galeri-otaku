import { Disclosure } from "@headlessui/react";
import GhIcon from "../assets/images/icons8-github.svg";

const Footer = () => {
  return (
    <Disclosure
      as="footer"
      className="bg-gray-800 text-gray-300 flex justify-between py-4 items-center"
    >
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">© 2025 Galeri Otaku</div>
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <a
          href="https://github.com/hamdandirgantoro/galeri-otaku"
          target="_blank"
        >
          <img src={GhIcon} alt="github" />
        </a>
      </div>
    </Disclosure>
  );
};

export default Footer;
