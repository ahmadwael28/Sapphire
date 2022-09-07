import axios from "axios";

class RestServices {
  axiosInstance = null;
  currentToken = null;

  constructor() {
    if (!this.axiosInstance) this.axiosInstance = axios.create({});

    this.axiosInstance.interceptors.request.use(
      (req) => {
        if (this.currentToken) {
          req.headers.common.Token = this.currentToken;
        } else {
          // go back to login page
        }
        req.headers.common["Content-Type"] = "application/json";
        return req;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  getURLPrefix({ protocol, host, port }) {
    return `${protocol}://${host}:${port}/`;
  }

  setToken(token) {
    this.currentToken = token;
  }

  getRequest(url, header) {
    return this.axiosInstance.get(url, header);
  }

  postRequest(url, data, header) {
    return this.axiosInstance.post(url, data, header);
  }

  putRequest(url, data) {
    return this.axiosInstance.put(url, data);
  }

  deleteRequest(url) {
    return this.axiosInstance.delete(url);
  }
}

let instance = null;

if (!instance) {
  instance = new RestServices();
}

export default instance;
