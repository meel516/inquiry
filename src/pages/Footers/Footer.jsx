import React from 'react';

export default function Footer(props) {
  console.log(`GAE Version: ${process.env.GAE_VERSION}`)
  const version = `${process.env.GAE_VERSION}`;
  return (
    <footer className="page-footer font-small">
      <div className="footer-copyright text-center py-3">© 2019 Copyright: Brookdale Senior Living  <small>v {version}</small></div>
    </footer>
  )
}
