import React, { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    VK.Widgets.Comments('vk_comments', { limit: 10, attach: '*' });
  }, []);

  return <div id="vk_comments" />;
};

export default Header;
