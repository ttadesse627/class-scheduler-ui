import axios from "axios";
import ToastNotification from "../Common/ToastNotification";
import { api_url } from "../../Environment";

var success: boolean = false;
export const submitPost = async (
  endPoint: string,
  payload: Object,
  message?: string
) => {
  var response = null;
  try {
    response = await axios.post(`${api_url}/${endPoint}`, payload);
    if (response.status === 200) success = true;
    if (
      response.status === 200 &&
      (message !== null || message !== undefined)
    ) {
      ToastNotification.SuccessNotification(message);
    }
  } catch (error) {
    ToastNotification.ErrorNotification("Error while submitting form:" + error);
    response = error;
  }

  return { response, success };
};
export const submitPut = async (
  endPoint: string,
  payload?: Object,
  message?: string
) => {
  var response = null;
  try {
    if (payload !== null) {
      response = await axios.put(`${api_url}/${endPoint}`, payload);
      if (response.status === 200) success = true;
      if (
        response.status === 200 &&
        (message !== null || message !== undefined)
      ) {
        ToastNotification.SuccessNotification(message);
      }
    } else {
      response = await axios.put(endPoint);
      if (response.status === 200) success = true;
      if (
        response.status === 200 &&
        (message !== null || message !== undefined)
      ) {
        ToastNotification.SuccessNotification(message);
      }
    }
  } catch (error) {
    ToastNotification.ErrorNotification("" + error);
    response = error;
  }

  return response;
};
export const submitGet = async (
  endPoint: string,
  payload?: Object,
  message?: string
) => {
  var response = null;
  try {
    if (payload !== null) {
      response = await axios.get(`${api_url}/${endPoint}`, payload);
      if (response.status === 200) success = true;
      if (
        response.status === 200 &&
        (message !== null || message !== undefined)
      ) {
        ToastNotification.SuccessNotification(message);
      }
    } else {
      response = await axios.get(`${api_url}/${endPoint}`);
      if (response.status === 200) success = true;
      if (
        response.status === 200 &&
        (message !== null || message !== undefined)
      ) {
        ToastNotification.SuccessNotification(message);
      }
    }
  } catch (error) {
    ToastNotification.ErrorNotification("" + error);
    response = error;
  }
};
export const submitDelete = async (
  endPoint: string,
  payload?: Object,
  message?: string
) => {
  var response = null;
  try {
    if (payload !== null) {
      response = await axios.delete(`${api_url}/${endPoint}`, payload);
      if (response.status === 200) success = true;
      if (
        response.status === 200 &&
        (message !== null || message !== undefined)
      ) {
        ToastNotification.SuccessNotification(message);
      }
    } else {
      response = await axios.delete(`${api_url}/${endPoint}`);
      if (response.status === 200) success = true;
      if (
        response.status === 200 &&
        (message !== null || message !== undefined)
      ) {
        ToastNotification.SuccessNotification(message);
      }
    }
  } catch (error) {
    ToastNotification.ErrorNotification("" + error);
    response = error;
  }
};

// export const CrudService = {
//   submitPost,
//   submitPut,
//   submitGet,
//   submitDelete,
// };
