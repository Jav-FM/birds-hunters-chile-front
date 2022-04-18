import request from "../../index";
const BASE_URL = "http://localhost:8080/api/v1";

const createPhoto = (data) => {
  return request({
    url: `${BASE_URL}/photos`,
    method: "POST",
    data,
    private: true,
  });
};

const getPhotoByUser = (id) => {
  return request({
    url: `${BASE_URL}/photos/${id}`,
    method: "GET",
    private: true,
  });
};

const replacePhoto = (id, data) => {
  return request({
    url: `${BASE_URL}/photos/${id}`,
    method: "PUT",
    data,
    private: true,
  });
};

const deletePhoto = (id) => {
  return request({
    url: `${BASE_URL}/photos/${id}`,
    method: "DELETE",
    private: true,
  });
};

const PhotosService = {
  createPhoto,
  getPhotoByUser,
  replacePhoto,
  deletePhoto,
};

export default PhotosService;
