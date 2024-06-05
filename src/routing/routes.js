import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import Menus from "./menus";
import { createBrowserHistory } from "history";

import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../config";
import axios from "axios";
import SkeletonComponent from "../components/skeletonLoader";
import Home from "../pages/Products/productType";
import Login from "../pages/login/login";

const history = createBrowserHistory();

const Router = () => {
  let query = new URL(window.location.href);
  let searchParams = new URLSearchParams(query.search);
  const { validate, uploadDetail, uploadDetailReview } = useSelector((state) => { return state })
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  axios.defaults.baseURL = BASEURL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${validate?.payload?.message?.token}`;
  axios.interceptors.request.use(request => {
    return request;
  }, error => {
    return Promise.reject(error);
  });


  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  return (
    <>
      <HistoryRouter history={history}>
        {/* {load ? <SkeletonComponent /> : (!validate?.payload?.success ? ( */}
        {false ? <SkeletonComponent /> : (!userInfo?.token? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Redirect to="/" />} />
          </Routes>

        ) : (
          <Menus />
        ))

        }
      </HistoryRouter>
    </>
  );
};
export default Router;
