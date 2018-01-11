import React from 'react';

//SongList will passed to the App Component as chidlren and we will show that component as a child.
export default ({ children }) => {
  return <div className="container">{children}</div>;
};
