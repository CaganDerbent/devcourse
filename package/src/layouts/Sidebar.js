import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user6.png";
import probg from "../assets/images/bg/download.jpg";

import { useAuthContext } from '../hooks/useAuthContext'


const Sidebar = () => {

  const {user} = useAuthContext();

  const navigation = [
    {
      title: user ?"Kurslarım" :"Ana Sayfa",
      href: user ? `/user/${user.id}/kurslarim`:'/',
      icon: "bi bi-speedometer2",
    },
    {
      title: "Tüm Kurslar",
      href: "/kurslar",
      icon: "bi bi-bell",
    },
    {
      title: "Programlama Dilleri",
      href: "/kurslar/progamlama-dilleri",
      icon: "bi bi-patch-check",
    },
    {
      title: "Veri Bilimi",
      href: "/kurslar/veri-bilimi",
      icon: "bi bi-hdd-stack",
    },
    {
      title: "Mobil Geliştirme",
      href: "/kurslar/mobil-gelistirme",
      icon: "bi bi-card-text",
    },
    {
      title: "Oyun Geliştirme",
      href: "/kurslar/oyun-gelistirme",
      icon: "bi bi-columns",
    },
    {
      title: "Web Geliştirme",
      href: "/kurslar/web-gelistirme",
      icon: "bi bi-layout-split",
    },
    {
      title: "Veri Tabanı Tasarımı",
      href: "/kurslar/veritabani",
      icon: "bi bi-textarea-resize",
    },
    {
      title: "Yazılım Mühendisliği",
      href: "/kurslar/yazilim-muhendisligi",
      icon: "bi bi-link",
    },
  ];
  

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      
        <div>
          <div className="d-flex align-items-center"></div>
          <div
            className="profilebg"
            style={{ background: `url(${probg}) no-repeat` }}
          >
            <div className="p-3 d-flex">
              <img src={user1} alt="user" width="50" className="rounded-circle" />
              <Button
                color="white"
                className="ms-auto text-white d-lg-none"
                onClick={() => showMobilemenu()}
              >
                <i className="bi bi-x"></i>
              </Button>
            </div>
            <div className="bg-dark text-white p-2 opacity-75">{user ? user.username : "Misafir Kullanıcı"}</div>
          </div>
          <div className="p-3 mt-2">
            <Nav vertical className="sidebarNav">
              {navigation.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    
                    
                    className={
                      
                      location.pathname === navi.href
                        ? "active nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
              <Button
                color="danger"
                tag="a"
                target="_blank"
                className="mt-3"
                href="https://github.com/CaganDerbent"
              >
                GitHub
              </Button>
              
            </Nav>
          </div>
        </div>
      
    </div>
  );
  
};

export default Sidebar;
