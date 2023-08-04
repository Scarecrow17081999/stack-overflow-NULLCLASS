import * as constants from "../constants";
import * as api from "../api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./userActions";

export const payment =
  (amount, currency, paymentDetails) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    console.log(user);
    try {
      dispatch({ type: constants.PAYMENT_REQUEST });
      const { data } = await api.payment({ amount, currency });
      await dispatch({ type: constants.PAYMENT_SUCCESS, payload: data });
      const {
        data: { key },
      } = await axios.get("http://localhost:8080/api/v1/getKey/");

      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: paymentDetails?.payment?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Stack OverFlow Clone",
        description: "Test Transaction",
        image: "",
        order_id: paymentDetails?.payment?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:8080/api/v1/paymentVerification",
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "7782887989",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var razor = new Razorpay(options);
      await razor.open();
      // navigate("/");
    } catch (error) {
      console.log(error);
      dispatch({
        type: constants.PAYMENT_FAILURE,
        payload: error?.response?.data?.message,
      });
    }
  };
