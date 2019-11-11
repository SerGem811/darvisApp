import axios from 'axios';
import {CAMERA_API, TEST_ENV} from '../../config'

export const connectCamera = async camera => {
  try {
    const res = await axios.post(CAMERA_API, {
      url: TEST_ENV ? '/data/camera_34.mp4' : camera.url,
      username: camera.user,
      password: camera.pass,
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
