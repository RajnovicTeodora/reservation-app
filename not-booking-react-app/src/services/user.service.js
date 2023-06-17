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

const getUserInfo = () => {
  const headers = AuthService.authHeader(false);
  let email = JSON.parse(localStorage.getItem("user")).email;
  return axios.get(API_URL + "getUserInfo/" + email, {
    headers: headers,
  });
};

const editUser = (newdata) => {
  const headers = AuthService.authHeader(true);
  let email = JSON.parse(localStorage.getItem("user")).email;
  return axios.post(API_URL + "editUser/" + email, newdata, {
    headers: headers,
  });
};

const updateUser = (newInfo) => {
  const oldData = JSON.parse(localStorage.getItem("user"));
  const data = {
    accessToken: oldData.accessToken,
    username: newInfo.username,
    expiresIn: oldData.expiresIn,
    userType: oldData.userType,
    email: newInfo.email,
    fullName: newInfo.name + " " + newInfo.surname,
  };
  localStorage.setItem("user", JSON.stringify(data));
};

const changePassword = (oldPass, newPass) => {   
  const headers = AuthService.authHeader(true);
  let email = JSON.parse(localStorage.getItem("user")).email;
  return axios.post(
    API_URL + "changePassword",
    {
      email,
      oldPass,
      newPass,
    },
    { headers: headers }
  );
};

const UserService = {
  stringToColor,
  stringAvatar,
  changeNotification,
  deleteAccount,
  getUserInfo,
  editUser,
  updateUser,
  changePassword,
};

export default UserService;
