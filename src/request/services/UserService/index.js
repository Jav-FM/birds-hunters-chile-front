import request from '../../index';

const loginUser = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data,
  });
};

const createUser = (data) => {
    return request({
      url: '/login',
      method: 'POST',
      data,
    });
  };

const UserService = {
  loginUser, createUser
};

export default UserService;
