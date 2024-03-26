import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


function RootLayout() {
    const navigate = useNavigate();
    const { LogoutUser }: any = useContext(AuthContext)
    return (
        <div className="wrapper">
            <nav className="topnav navbar navbar-light">
                <button
                    type="button"
                    className="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar"
                >
                    <i className="fe fe-menu navbar-toggler-icon" />
                </button>
                <form className="form-inline mr-auto searchform text-muted">
                    <input
                        className="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted"
                        type="search"
                        placeholder="Type something..."
                        aria-label="Search"
                    />
                </form>
                <ul className="nav">
                    <li className="nav-item">
                        <a
                            className="nav-link text-muted my-2"
                            href="#"
                            id="modeSwitcher"
                            data-mode="dark"
                        >
                            <i className="fe fe-sun fe-16" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link text-muted my-2"
                            href="./#"
                            data-toggle="modal"
                            data-target=".modal-shortcut"
                        >
                            <span className="fe fe-grid fe-16" />
                        </a>
                    </li>
                    <li className="nav-item nav-notif">
                        <a
                            className="nav-link text-muted my-2"
                            href="./#"
                            data-toggle="modal"
                            data-target=".modal-notif"
                        >
                            <span className="fe fe-bell fe-16" />
                            <span className="dot dot-md bg-success" />
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle text-muted pr-0"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="avatar avatar-sm mt-2">
                                <img
                                    src="./assets/avatars/face-1.jpg"
                                    alt="..."
                                    className="avatar-img rounded-circle"
                                />
                            </span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <a className="dropdown-item" href="#">
                                Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                Settings
                            </a>
                            <a className="dropdown-item" href="#">
                                Activities
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <aside
                className="sidebar-left border-right bg-white shadow"
                id="leftSidebar"
                data-simplebar=""
            >
                <a
                    href="#"
                    className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3"
                    data-toggle="toggle"
                >
                    <i className="fe fe-x">
                        <span className="sr-only" />
                    </i>
                </a>
                <nav className="vertnav navbar navbar-light">
                    {/* nav bar */}
                    <div className="w-100 mb-4 d-flex">
                        <a
                            className="navbar-brand mx-auto mt-2 flex-fill text-center"
                            href="./index.html"
                        >
                            <svg
                                version="1.1"
                                id="logo"
                                className="navbar-brand-img brand-sm"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 120 120"
                                xmlSpace="preserve"
                            >
                                <g>
                                    <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                                    <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                                    <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
                                </g>
                            </svg>
                        </a>
                    </div>
                    <ul className="navbar-nav flex-fill w-100 mb-2">
                        <li className="nav-item dropdown">
                            <a
                                href="#dashboard"
                                data-toggle="collapse"
                                aria-expanded="false"
                                className="dropdown-toggle nav-link"
                            >
                                <i className="fe fe-home fe-16" />
                                <span className="ml-3 item-text">Dashboard</span>
                                <span className="sr-only">(current)</span>
                            </a>
                            <ul className="collapse list-unstyled pl-4 w-100" id="dashboard">
                                <li className="nav-item active">
                                    <a className="nav-link pl-3" onClick={() => { navigate('/') }}>
                                        <i className="fe fe-book-open fe-16" />
                                        <span className="ml-1 item-text">Book Store</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link pl-3" onClick={() => { navigate('/addNew') }}>
                                        <i className="fe fe-plus fe-16" />
                                        <span className="ml-1 item-text">Add Book</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="btn-box w-100 mt-4 mb-1">
                        <a
                            onClick={() => LogoutUser()}
                            className="btn mb-2 btn-primary btn-lg btn-block"
                        >
                            <i className="fe fe-log-out fe-12 mx-2" />
                            <span className="small">Logout</span>
                        </a>
                    </div>
                </nav>
            </aside>
            <main role="main" className="main-content">
                <Outlet /></main>
        </div>
    );

}
export default RootLayout;