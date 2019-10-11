import React from 'react';

export default function Footer(props) {
  const version = `${process.env.REACT_APP_VERSION}`;
  return (
    <footer className="page-footer font-small">
      <div className="footer-copyright text-center py-3">© 2019 Copyright: Brookdale Senior Living  <small>{version}</small></div>
    </footer>
  )
}
