import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { links } from '../assets/constants';
import { logo } from '../assets/index';

const NavLinks = ({ handleClick }) => (
  <div className="mt-10 ">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-[#191624] ">
        <Link to="/">
          <div className="flex flex-col items-center hover:opacity-80">
            <img src={logo} alt="logo" className=" object-contain" />
            <h2 className="mt-1 text-cyan-400 font-black text-lg ">Dream Sound</h2>
          </div>
        </Link>
        <NavLinks />
      </div>
      {/* mobile sidebar */}
      <div className="absolute block top-6 right-3 md:hidden ">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)} />
        ) : (
          <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)} />
        )}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className=" object-contain" />
            <h2 className="mt-1 text-cyan-400 font-black text-lg ">Dream Sound</h2>
          </div>
        </Link>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
