import request from '../../index';
const BASE_URL= 'http://localhost:8080/api/v1'

const loginUser = (data) => {
  return request({
    url: `${BASE_URL}/login`,
    method: 'POST',
    data,
  });
};

const createUser = (data) => {
    return request({
      url: `${BASE_URL}/users`,
      method: 'POST',
      data,
    });
  };

const UserService = {
  loginUser, createUser
};

export default UserService;
