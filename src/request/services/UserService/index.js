import request from "../../index";
const BASE_URL = "http://localhost:8080/api/v1";

const loginUser = (data) => {
  return request({
    url: `${BASE_URL}/login`,
    method: "POST",
    data,
  });
};

const createUser = (data) => {
  return request({
    url: `${BASE_URL}/users`,
    method: "POST",
    data,
  });
};

const getUserById = (id) => {
  return request({
    url: `${BASE_URL}/users/${id}`,
    method: "GET",
    private: true,
  });
};

const editUser = (data) => {
  return request({
    url: `${BASE_URL}/users`,
    method: "PUT",
    data,
    private: true,
  });
};

const deleteUser = (id) => {
  return request({
    url: `${BASE_URL}/users/${id}`,
    method: "DELETE",
    private: true,
  });
};

const UserService = {
  loginUser,
  createUser,
  getUserById,
  editUser,
  deleteUser,
};

export default UserService;
