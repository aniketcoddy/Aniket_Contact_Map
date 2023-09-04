import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Header() {
  const [opensidebar, setOpensidebar] = useState(true);

  const handleonclick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent
    setOpensidebar(!opensidebar);
  };

  const handleContentClick = () => {
    setOpensidebar(true); // Close the sidebar
  };

  useEffect(() => {
    const closeSidebar = () => {
      setOpensidebar(true);
    };

    window.addEventListener('click', closeSidebar);

    return () => {
      window.removeEventListener('click', closeSidebar);
    };
  }, []);

  return (
    <div onClick={handleContentClick}>
      <div className='flex justify-between items-center p-3 bg-[#0F1730]'>
        <img
          src="menu-line.png"
          className='h-14 2xl:h-8 3xl:h-10 lg:h-6 cursor-pointer'
          onClick={handleonclick}
        />
        <div className='text-[#00c66c] font-[Roboto] mr-12 2xl:mr-8 md:mr-4 text-5xl 2xl:text-3xl 3xl:text-4xl lg:text-2xl md:text-xl font-semibold'>
          Taiyo
          <span className='text-white font-[Roboto] text-5xl 2xl:text-3xl lg:text-2xl md:text-xl 3xl:text-4xl font-semibold'>
            .AI
          </span>
        </div>
      </div>

      <div>
        <Sidebar open={opensidebar} />
      </div>
    </div>
  );
}

export default Header;
