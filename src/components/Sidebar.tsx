import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div className={`bg-[#0F1730] fixed text-white w-80 3xl:w-64 2xl:w-56 md:w-48 h-screen shadow-xl ${open ? "-left-80" : "left-0"} transition-all duration-[1s] shadow-[#00c66c] z-10 overflow-y-auto`}>
      <div>
        <ul className="mt-4 space-y-2">
          <Link to="/"> <li className="hover:bg-[#00c66d97] p-5 3xl:p-3 md:text-base 2xl:p-2 2xl:text-lg text-3xl 3xl:text-xl font-[Roboto] cursor-pointer">
            My Contacts
          </li>
          </Link>
          <Link to="/graph">  <li className="hover:bg-[#00c66d97] p-5 3xl:p-3 md:text-base 2xl:p-2 2xl:text-lg text-3xl 3xl:text-xl font-[Roboto] cursor-pointer">
            Track of Covid India
          </li>
          </Link>
          <Link to="/map"> <li className="hover:bg-[#00c66d97] p-5 3xl:p-3 md:text-base 2xl:p-2 2xl:text-lg text-3xl 3xl:text-xl font-[Roboto] cursor-pointer">
            Map Covid View
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
