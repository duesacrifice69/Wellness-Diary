import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-primary py-20 px-4">
      <div className="max-w-screen-lg mx-auto text-textPrimary font-work leading-7 font-normal">
        <div className="flex justify-between">
          <div>
            <div className="text-accent font-yeseva text-3xl mb-5">
              WELLNESSDIARY
            </div>
            <div className="max-w-[255px]">
              Empowering Individuals to Take Control of Their Health and
              Well-being Through Every Entry.
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-7">Important Links</div>
            <Link className="block hover:underline" to="/">
              Home
            </Link>
            <Link className="block hover:underline" to="/Articles">
              Articles
            </Link>
            <Link className="block hover:underline" to="/Services">
              Services
            </Link>
            <Link className="block hover:underline" to="/AboutUs">
              About Us
            </Link>
          </div>
          <div>
            <div className="text-lg font-semibold mb-7">Contact Us</div>
            <div>Email: wellnessdiary@gmail.com</div>
            <div>Address: 0123 Some place</div>
            <div>Some country</div>
          </div>
          <div></div>
        </div>
        <hr className="my-11" />
        <div className="flex justify-between">
          <p> &copy; 2024 WellnessDiary All Rights Reserved</p>
          {/* <div className="flex gap-5">
            <a href="/#" target="_blank">
              <LinkedIn />
            </a>
            <a href="/#" target="_blank">
              <Facebook />
            </a>
            <a href="/#" target="_blank">
              <Instagram />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
