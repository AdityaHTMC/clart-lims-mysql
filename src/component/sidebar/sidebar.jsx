/* eslint-disable no-unused-vars */

import { useAppSelector } from "../../Redux/Hooks";
// import { useTranslation } from "@/app/i18n/client";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import companyLogo from '../../assets/small-logo.jpg'
import { useCommonContext } from "../../helper/CommonProvider";
import { Spinner } from "reactstrap";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
  const { sidebar } = useAppSelector((store) => store.LayoutReducer);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [subIndex, setSubIndex] = useState({ parentIndex: -1, activeIndex: -1 })
  const { menuList } = useCommonContext()


  const mainMenu = menuList?.data?.map((menuItem, i) => (
    <li key={i} className={i === activeIndex && "active"}>
      {menuItem.type === "sub" && (
        <a
          className={`sidebar-header ${subIndex?.parentIndex === i && 'active'}`}
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            setActiveIndex(activeIndex === i ? -1 : i);
          }}
        >
          <span style={{fontSize:'13px'}}>{menuItem.title}</span>
          <div className="pull-right">
            {activeIndex === i ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </a>
      )}

      {menuItem.type === "link" && (
        <Link to={`${menuItem?.path}`} className={`sidebar-header ${activeIndex === i ? "active" : ""}`} onClick={() => {
          setActiveIndex(i);
          setSubIndex({ parentIndex: -1, activeIndex: -1 });
        }}>
          {/* TODO: menu image */}
          <span >{menuItem.title}</span>
          {menuItem?.sub_menu?.length > 0 ? <i className="fa fa-angle-right pull-right"></i> : ""}
        </Link>
      )}

      {menuItem.sub_menu && (
        <ul className={`sidebar-submenu ${activeIndex === i ? "menu-open" : ""}`} style={activeIndex === i ? { opacity: 1, transition: "opacity 500ms ease-in" } : {}}>
          {menuItem?.sub_menu?.map((childrenItem, index) => (
            <li key={index}>
              {childrenItem?.type === "link" && (
                <Link
                  to={`${childrenItem.path}`}
                  className={subIndex?.activeIndex === index && subIndex?.parentIndex === i ? 'active' : ''}
                  onClick={() => {
                    setSubIndex({ parentIndex: i, activeIndex: index });
                  }}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem?.title}{" "}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  ));

  // const mainMenu = mainmenu.map((menuItem, i) => (
  //   <li className={`${menuItem.active ? "active" : ""}`} key={i}>
  //     {menuItem.sidebartitle ? <div className="sidebar-title">{menuItem.sidebartitle}</div> : ""}

  //     {menuItem.type === "sub" && (
  //       <a
  //         className="sidebar-header "
  //         href="#"
  //         onClick={(event) => {
  //           event.preventDefault();
  //           return setNavActive(menuItem);
  //         }}
  //       >
  //         <menuItem.icon />
  //         <span>{menuItem.title}</span>
  //         <i className="fa fa-angle-right pull-right"></i>
  //       </a>
  //     )}

  //     {menuItem.type === "link" && (
  //       <Link to={`${menuItem?.path}`} className={`sidebar-header ${menuItem.active ? "active" : ""}`} onClick={() => setNavActive(menuItem)}>
  //         <menuItem.icon />
  //         <span>{menuItem.title}</span>
  //         {menuItem.children ? <i className="fa fa-angle-right pull-right"></i> : ""}
  //       </Link>
  //     )}

  //     {menuItem.children && (
  //       <ul className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`} style={menuItem.active ? { opacity: 1, transition: "opacity 500ms ease-in" } : {}}>
  //         {menuItem.children?.map((childrenItem, index) => (
  //           <li key={index} className={childrenItem.children ? (childrenItem.active ? "active" : "") : ""}>
  //             {childrenItem.type === "sub" && (
  //               <a
  //                 href="#"
  //                 onClick={(event) => {
  //                   event.preventDefault();
  //                   return setNavActive(childrenItem);
  //                 }}
  //               >
  //                 <i className="fa fa-circle"></i>
  //                 {childrenItem.title} <i className="fa fa-angle-right pull-right"></i>
  //               </a>
  //             )}

  //             {childrenItem.type === "link" && (
  //               <Link to={`${childrenItem.path}`} className={childrenItem.active ? "active" : ""} onClick={() => setNavActive(childrenItem)}>
  //                 <i className="fa fa-circle"></i>
  //                 {childrenItem.title}{" "}
  //               </Link>
  //             )}

  //             {childrenItem.children && (
  //               <ul className={`sidebar-submenu ${childrenItem.active ? "menu-open" : "active"}`}>
  //                 {childrenItem.children.map((childrenSubItem, key) => (
  //                   <li className={childrenSubItem.active ? "active" : ""} key={key}>
  //                     {childrenSubItem.type === "link" && (
  //                       <Link to={`${childrenSubItem.path}`} className={childrenSubItem.active ? "active" : ""} onClick={() => setNavActive(childrenSubItem)}>
  //                         <i className="fa fa-circle"></i>
  //                         {childrenSubItem.title}
  //                       </Link>
  //                     )}
  //                   </li>
  //                 ))}
  //               </ul>
  //             )}

  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </li>
  // ));

  return (
    <Fragment>
      <div className={`page-sidebar ${sidebar && "open"}`}>
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper">
            <Link to={`/dashboard`}>
              <img className="blur-up lazyloaded" src={companyLogo} alt="" style={{ width: '35%' }} />
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          {/* <UserPanel /> */}
          {menuList?.loading && (
            <div className="d-grid" style={{placeItems: 'center'}}>
              <Spinner color="secondary" className="my-4" />
            </div>
          )}

          {!menuList?.loading && menuList?.data?.length > 0 && (
            <ul className="sidebar-menu">{mainMenu}</ul>
          )}

          {!menuList?.loading && menuList?.data?.length === 0 && (
            <span className="text-muted text-center" style={{ fontSize: 14 }}>No Menu found</span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;