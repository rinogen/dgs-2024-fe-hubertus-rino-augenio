/* eslint-disable react/prop-types */
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="container-layout">
          <div className="relative pr-72">
            <Navbar />
          </div>
          <div className="flex">
            <div className="flex-grow relative pr-72">{children}</div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
