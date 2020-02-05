import React from 'react';

export default function Footer(props) {
  const version = `${process.env.REACT_APP_VERSION}`;
  const currentyear = new Date().getFullYear();

  return (
    <footer className="page-footer font-small">
      <div className="footer-copyright text-center py-3">© {currentyear} Copyright: Brookdale Senior Living  <small>v {version}</small></div>
    </footer>
  )
}
