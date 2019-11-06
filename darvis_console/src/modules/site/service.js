import axios from 'axios';

export const connectCamera = async camera => {
  try {
    const res = await axios.post('http://10.37.200.31:8086/api/getSingleFrame', {
      url: camera.url,
      username: camera.username,
      password: camera.password,
    });
    return res.data;
  } catch (err) {
    return 'error';
  }
};

export const fetcHomography = () => {
  return new Promise(resolve => {
    resolve('123');
  });
};
