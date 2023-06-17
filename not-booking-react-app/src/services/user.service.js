import axios from "axios";
import AuthService from "./auth.service";
const API_URL = "http://localhost:8080/api/user/";

const stringToColor = (val) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < val.length; i += 1) {
    hash = val.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const changeNotification = () => {
  const headers = AuthService.authHeader(false);
  let email = JSON.parse(localStorage.getItem("user")).email;
  return axios.get(API_URL + "changeNotification/" + email, {
    headers: headers,
  });
};

const deleteAccount = () => {
  const headers = AuthService.authHeader(false);
  let email = JSON.parse(localStorage.getItem("user")).email;
  return axios.get(API_URL + "deleteAccount/" + email, {
    headers: headers,
  });
};

const UserService = {
  stringToColor,
  stringAvatar,
  changeNotification,
  deleteAccount,
};

export default UserService;
