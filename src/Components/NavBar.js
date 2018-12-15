import React from 'react';
import Headroom from 'react-headroom';
import 'semantic-ui-css/semantic.css';
import 'antd/dist/antd.css';
import '../Css/Navbar.css';

const NavBar = () => {
    return (
      <div className="navMainContainer">
        <Headroom className="headroom--pinned">
          <div className="navSubContainer">
            <div className="navLeftContainer">
              <div className="appName">
                <h2><b><i>Social App</i></b></h2>
              </div>
            </div>
          </div>
        </Headroom>
      </div>
    );
}

export default NavBar;
