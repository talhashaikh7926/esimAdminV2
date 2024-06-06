import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Route, Link, Routes, useLocation, useNavigate } from "react-router-dom";
import ProductType from "../pages/Products/productType";
import ProductPlan from "../pages/Products/productPlan";
import AllInventory from "../pages/inventoryTracking/allInventory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faComments,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { Layout, Menu, Button } from "antd";
import InventoryIccid from "../pages/inventoryTracking/inventorywithICCID";

const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;
export const history = createBrowserHistory({
  forceRefresh: true,
});


const App = () => {
  const ref = useRef();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [userInfoData, setUserInfoData] = useState("");
  const [title, setTitle] = useState(location.pathname);

  let instagramCodeUrl = new URL(window.location.href);
  let code = new URLSearchParams(instagramCodeUrl.search);

  const reRender = (userData) => {
    setUserInfoData(userData);
  };

  useEffect(() => {
    if (location.pathname === "/Mainpage/title") {
      changetitle(location.pathname);
    } else {
      changetitle(location.pathname.split("/")[1]);
    }
  }, [location]);

  useEffect(() => {
    mobileSidebar(toggle);
  }, [toggle]);

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  const rootSubmenuKeys = ["accounting", "settings", "ugc", "social-store-management"];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const mobileSidebar = (action) => {
    setToggle(action);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [toggle]);

  const changetitle = (title) => {
    if (title === "test") {
      setTitle("test");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff', overflow: 'hidden' }}>
      <Header className="site-layout-background" style={{ padding: '0 20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '83px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <div>
          <h4>Echo Networks</h4>
        </div>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{
            marginRight: '16px',
            width: '120px',
            height: '40px',
            fontSize: '16px',
            backgroundColor: 'white',
            borderColor: 'grey',
            color: 'black', // Set text color to black
            transition: 'all 0.3s', // Smooth transition for hover effects
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "black", marginRight: '8px' }} />
          Logout
        </Button>


      </Header>
      <Layout style={{ flexDirection: 'row', flexGrow: 1 }}>
        <Sider
          style={{ backgroundColor: '#fff', paddingTop: '20px', marginTop: '16px' }} // Add marginTop to separate from the header
          width={250} // Increase the width of the sidebar
        >
          <Menu
            theme="light"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={[location.pathname.split("/")[1]]}
            style={{ backgroundColor: '#fff', padding: '0 ' }}
          >

            <SubMenu
              key="order-tracking"
              title={
                <span>
                  <FontAwesomeIcon className="menu-icon-direct" icon={faGauge} />
                  <span>Inventory & Order Tracking</span>
                </span>
              }
            >
          
              <Menu.Item key="inventory" style={{ transition: 'background-color 0.3s' }}>
                <Link to="inventory" onClick={() => { changetitle("All Inventory"); setToggle(false); }}>
                  All Inventory
                </Link>
              </Menu.Item>
              <Menu.Item key="inventory-iccid" style={{ transition: 'background-color 0.3s' }}>
                <Link to="inventory-iccid" onClick={() => { changetitle("Inventory Iccid"); setToggle(false); }}>
                  My Inventory With ICCID
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="productType" icon={<FontAwesomeIcon icon={faGauge} />} style={{ transition: 'background-color 0.3s' }}>
              <Link to="productType" onClick={() => { changetitle("product Type"); setToggle(false); }}>
                Product Type Upload
              </Link>
            </Menu.Item>
           
            <Menu.Item key="productPlan" icon={<FontAwesomeIcon icon={faGauge} />} style={{ transition: 'background-color 0.3s' }}>
              <Link to="productPlan" onClick={() => { changetitle("product Plan"); setToggle(false); }}>
                Product Plan Upload
              </Link>
            </Menu.Item>


          </Menu>
        </Sider>
        <Layout style={{ padding: '0 16px', backgroundColor: '#f0f2f5', marginTop: '16px', flexGrow: 1 }}>
          <Content style={{ padding: 24, background: 'white', minHeight: 'calc(100vh - 131px)' }}> {/* Subtract header height and margin */}
            <Routes>
              <Route path="/productType" exact element={<ProductType />} />
              <Route path="/productPlan" exact element={<ProductPlan />} />
              <Route path="/inventory" exact element={<AllInventory />} />
              <Route path="/inventory-iccid" exact element={<InventoryIccid />} />
            </Routes>
          </Content>

        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
