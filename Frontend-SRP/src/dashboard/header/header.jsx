import './header.css'
import React, { useState } from "react";

function header({ togleSidebar }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
    const handleSidebarToggle = () => {
      togleSidebar();
      setSidebarOpen(!sidebarOpen);
    };
    return (
        <>
            <section className='header-container'>
            <div className="content-left">
          <i
            className={`bx ${sidebarOpen ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}
            style={{ fontSize: '24px', border: 'none', cursor: 'pointer' }}
            onClick={handleSidebarToggle}
          ></i>
        </div>
                <div className="content-right">
                    <div className="options-icons">
                        <div className="icon-help">
                            <i className='bx bx-help-circle' ></i>
                        </div>
                        <div className="icon-notification">
                            <i className='bx bx-bell'></i>
                        </div>
                    </div>
                    <div className="separator-content">
                        <span className="separator"></span>
                    </div>
                    <div className="user-info">
                        <div className="info-img">
                            <div className="img-user">
                                <img src="https://lh3.googleusercontent.com/-d0_mauFqK_Y/AAAAAAAAAAI/AAAAAAAAAAA/AML38-vw3b-2kTUv3uaLo-KiD256a1ltmg/photo.jpg?sz=46" alt="" />
                            </div>
                        </div>
                        <div className="info-text">
                            <p className="text-username">Christia Giovani</p>
                            <span className="text-rol">Administrador</span>
                        </div>
                    </div>
                    <div className="option-menu">
                        <i className='bx bx-dots-vertical-rounded'></i>
                    </div>
                </div>
            </section>
        </>
    );
}

export default header;