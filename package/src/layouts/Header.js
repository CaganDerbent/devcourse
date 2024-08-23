import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user6.png";

import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {

  const {user} = useAuthContext();

  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const {dispatch} = useAuthContext();

  const navigate = useNavigate();

  const gotocart = ()=>{
      navigate(`/user/${user.id}/cart`)
  }

  const logout  = ()=>{

      // delete user from localStorage

      localStorage.removeItem('user')

      //dispatch logout action
      

      dispatch({type: 'LOGOUT'})
      navigate("/")

  }

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // <DropdownItem divider />

  return (
    <Navbar color="primary" dark expand="lg" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
        <NavbarBrand href="/">
          <LogoWhite/> devcourse
        </NavbarBrand>
        </div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
   
        
       
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          
          className="d-sm-block d-md-block d-lg-none"
          
          onClick={Handletoggle}
          //d-sm-block d-md-none</div>
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          {!user && (<NavItem>
          <Link to="/login" className="nav-link">Giriş Yap</Link>
          </NavItem>)}
          {!user &&(<NavItem>
            <Link to="/register" className="nav-link">
              Kayıt Ol
            </Link>
          </NavItem>)}
          {user && isSmallScreen &&(<NavItem>
            <Link to="/register" className="nav-link">
              Kurslarım
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar" className="nav-link">
              Tüm Kurslar
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/progamlama-dilleri" className="nav-link">
              Programlama Dilleri
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/veri-bilimi" className="nav-link">
              Veri Bilimi
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/mobil-gelistirme" className="nav-link">
              Mobil Geliştirme
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/oyun-gelistirme" className="nav-link">
              Oyun Geliştirme
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/web-gelistirme" className="nav-link">
              Web Geliştirme
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/veritabani" className="nav-link">
              Veri Tabanı Tasarımı
            </Link>
          </NavItem>)}
          {isSmallScreen &&(<NavItem>
            <Link to="/kurslar/yazilim-muhendisligi" className="nav-link">
              Yazılım Mühendisliği
            </Link>
          </NavItem>)}
        
        
        </Nav>
        {user && (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent" style={{color:"rgba(255,255,255,0.8)"}}>
          {user.username}
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
              style={{marginLeft:"12px"}}
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Profil</DropdownItem>
            <DropdownItem>Fotoğraf Yükle</DropdownItem>
            <DropdownItem><Link to={`user/${user.id}/cart`} className="nav-link">Sepetim</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>Çıkış Yap</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        )}


        
      
      </Collapse>
    </Navbar>
  );
};

export default Header;
