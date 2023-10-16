import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import userApi from "../api/modules/authApi";
import { setUser } from "../redux/features/userSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) {
        dispatch(setUser(null));
        navigate("/login");
      }
    };

    authUser();
  }, [dispatch, navigate]);

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default Layout;
