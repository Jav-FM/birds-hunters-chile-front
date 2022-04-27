import request from "../../index";
const BASE_URL = "https://birdshunters-chile-server.herokuapp.com/api/v1";

//Función para creación de captura en el servidor
const createPhoto = (data) => {
  return request({
    url: `${BASE_URL}/photos`,
    method: "POST",
    data,
    private: true,
  });
};

//Función para traer las capturas del usuario
const getPhotoByUser = (id) => {
  return request({
    url: `${BASE_URL}/photos/${id}`,
    method: "GET",
    private: true,
  });
};

//Función para reemplazar una captura
const replacePhoto = (id, data) => {
  return request({
    url: `${BASE_URL}/photos/${id}`,
    method: "PUT",
    data,
    private: true,
  });
};

//Función para eliminar una captura
const deletePhoto = (id) => {
  return request({
    url: `${BASE_URL}/photos/${id}`,
    method: "DELETE",
    private: true,
  });
};

//Objeto con todas las funciones para exportarlas
const PhotosService = {
  createPhoto,
  getPhotoByUser,
  replacePhoto,
  deletePhoto,
};

export default PhotosService;
