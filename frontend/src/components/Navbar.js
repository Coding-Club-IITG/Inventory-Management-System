import { Link } from "react-router-dom";
import "./NavStyle.css";

function Navbar() {
  return (
    <>
      <div className="flex items-center bg-[#032538] p-5 justify-between">
        <div className="flex gap-10 items-center text-white/70">
          <Link to="/" className="text-xl font-bold text-white">
            RIM PORTAL
          </Link>
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <div className="dropdown text-white/70 hover:text-white">
            <p className="cursor-pointer">Request</p>
            <div className="dropdown-content">
              <Link to="/" className="text-white/70 hover:text-white hover:bg-[#217cb0]">
                Requests-Sent
              </Link>
              <Link to="/" className="text-white/70 hover:text-white hover:bg-[#217cb0]">
                Requests-Received
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <input
            className="searchbar"
            type="search"
            placeholder="Search item"
          ></input>
          <button className="addbtn">Add item +</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
