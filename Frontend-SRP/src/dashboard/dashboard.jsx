import { useState } from 'react';
import './dashboard.css'
import Siderbar from './sidebar/sidebar';
import Header from './header/header';
import { Outlet } from 'react-router-dom';

function dashboard() {
    const [isSidebarClose, setIsSidebarClose] = useState(true);

    const togleSidebar = () =>{
        setIsSidebarClose(!isSidebarClose);
        console.log('close')
    }

    return (
        <>
            <div className="container-dashboard">

                <section className={`sidebar ${isSidebarClose ? 'sidebar' : 'close'}`}>
                    <Siderbar isSidebarClose={isSidebarClose}/>
                </section>

                <section className="content">
                    <header className="content-header">
                        <Header togleSidebar ={togleSidebar} />
                    </header>

                    <main className="content-main">
                        <Outlet />
                    </main>
                </section>

            </div>
        </>
    )
        
}

export default dashboard;