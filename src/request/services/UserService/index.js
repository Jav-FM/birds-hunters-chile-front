import request from "../../index";
const BASE_URL = "https://birdshunters-chile-server.herokuapp.com/api/v1";

//Función para login de usuario
const loginUser = (data) => {
  return request({
    url: `${BASE_URL}/login`,
    method: "POST",
    data,
  });
};

//Función para crear usuario
const createUser = (data) => {
  return request({
    url: `${BASE_URL}/users`,
    method: "POST",
    data,
  });
};

//Función para traer datos del usuario por su ID
const getUserById = (id) => {
  return request({
    url: `${BASE_URL}/users/${id}`,
    method: "GET",
    private: true,
  });
};

//Función para editar datos de usuario
const editUser = (id, data) => {
  return request({
    url: `${BASE_URL}/users/${id}`,
    method: "PUT",
    data,
    private: true,
  });
};

//Función para eliminar usuario
const deleteUser = (id) => {
  return request({
    url: `${BASE_URL}/users/${id}`,
    method: "DELETE",
    private: true,
  });
};

//Objeto con todas las funciones para ser exportadas
const UserService = {
  loginUser,
  createUser,
  getUserById,
  editUser,
  deleteUser,
};

export default UserService;
