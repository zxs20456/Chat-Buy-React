import { GET_ALL_ORDERS, AFFIRM_ORDER, GET_ORDER_SUCCESS } from "./type";

import { Toast } from "antd-mobile";
import axios from "axios";
import history from "../common/history";

export function getAllOrders() {
  return async dispatch => {
    const res = await axios.get("/order/allOrders");
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: GET_ALL_ORDERS, payload: res.data.data });
    }
  };
}

export function getOrderSuccess(data) {
  return { type: GET_ORDER_SUCCESS, payload: data };
}

export function getOrder(orderId) {
  return async dispatch => {
    const res = await axios.post("/order/getOrder", { orderId });
    if (res.status === 200 && res.data.code === 0) {
      history.push("/me/orders");
      Toast.success("接单成功", 1);
    }
  };
}

export function affirmOrderSuccess(id) {
  return { type: AFFIRM_ORDER, payload: id };
}

export function affirmOrder(orderId) {
  return async dispatch => {
    const res = await axios.post("/order/affirm", { orderId });
    if (res.status === 200 && res.data.code === 0) {
      Toast.success("确认订单成功", 1);
      dispatch(affirmOrderSuccess(orderId));
    }
  };
}

