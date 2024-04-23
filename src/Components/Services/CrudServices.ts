import axios from "axios";

const api_url: string = "http://localhost:8080/api";
var response: any = undefined;
export const handlePost = async (
  endPoint: string,
  payload: Object
) => {
  try {
    response = await axios.post(`${api_url}/${endPoint}`, payload);
  } catch (error) {
    response = error;
  }
  return response;
};
export const handlePut = async (
  endPoint: string,
  payload?: any
) => {
  try {
    if (payload !== null) {
      response = await axios.put(`${api_url}/${endPoint}`, payload);
    } else {
      response = await axios.put(`${api_url}/${endPoint}`);
    }
  } catch (error) {
    response = error;
  }

  return response;
};
export const handleGet = async (
  endPoint: string,
  payload?: Object
) => {
  try {
    if (payload !== null || payload !== undefined) {
      response = await axios.get(`${api_url}/${endPoint}`, payload);
    } else {
      response = await axios.get(`${api_url}/${endPoint}`);
    }
  } catch (error) {
    response = error;
  }
  return response;
};

export const handleDelete = async (
  endPoint: string,
  payload?: any,
) => {
  try {
    if ((payload !== null) && (payload !== undefined)) {
      response = await axios.delete(`${api_url}/${endPoint}`, payload);
    } else {
      response = await axios.delete(`${api_url}/${endPoint}`);
    }
  } catch (error) {
    response = error;
  }
  return response;
};
