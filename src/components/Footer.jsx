import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, LinkedIn, Send } from "../icons";
import Button from "./Button";

export default function Footer() {
  const navigate = useNavigate();
  const handleImportantLinksClick = (e) => {
    navigate(e.target.innerHTML.replaceAll(" ", ""));
  };
  return (
    <div className="bg-primary py-20 px-4">
      <div className="max-w-screen-lg mx-auto text-textPrimary font-work leading-7 font-normal">
        <div className="flex justify-between">
          <div>
            <div className="text-accent font-yeseva text-3xl mb-5">
              WELLNESSDIARY
            </div>
            <div className="max-w-[255px]">
              Leading the Way in Medical Execellence, Trusted Care.
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-7">Important Links</div>
            <div
              onClick={handleImportantLinksClick}
              className="cursor-pointer hover:underline"
            >
              Medical Tests
            </div>
            <div
              onClick={handleImportantLinksClick}
              className="cursor-pointer hover:underline"
            >
              Articles
            </div>
            <div
              onClick={handleImportantLinksClick}
              className="cursor-pointer hover:underline"
            >
              News
            </div>
            <div
              onClick={handleImportantLinksClick}
              className="cursor-pointer hover:underline"
            >
              About Us
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-7">Contact Us</div>
            <div>Call: (237) 681-812-255</div>
            <div>Email: fildineesoe@gmail.com</div>
            <div>Address: 0123 Some place</div>
            <div>Some country</div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-7">Newsletter</div>
            <Button
              style={{ paddingLeft: "12px", paddingRight: "12px" }}
              className="rounded-md gap-2"
            >
              Enter your email address
              <Send />
            </Button>
          </div>
        </div>
        <hr className="my-11" />
        <div className="flex justify-between">
          <p> &copy; 2024 Hospital's name All Rights Reserved by PNTEC-LTD</p>
          <div className="flex gap-5">
            <a href="/#" target="_blank">
              <LinkedIn />
            </a>
            <a href="/#" target="_blank">
              <Facebook />
            </a>
            <a href="/#" target="_blank">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
