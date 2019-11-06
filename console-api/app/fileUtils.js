const fs = require('fs');
const server_env = false;

const getPath = () => {
  let path = '';
  if (server_env) {
    path = '/home/darvis';
  } else {
    path = 'd:\\darvis';
  }
  return path;
}

const isFolderExists = async (path, createFolder) => {
  try {
    let p = path;
    if(!server_env) {
      p = path.replace('/', '\\');
    }
    if(await fs.existsSync(p)){
      return true;
    } else {
      if(createFolder) {
        fs.mkdirSync(p);
      }
      return false;
    }
  } catch (e) {
    return false;
  }
}

exports.getMainPath = () => {
  return getPath();
}

exports.checkFolderExists = async (path, createFolder) => {
  return await isFolderExists(path, createFolder);
}

exports.saveDW = async (filename, dw) => {
  let path = getPath();
  await isFolderExists(path, true);
  path = path + '/dw';
  await isFolderExists(path, true);
  fs.writeFile(path + '/' + filename, JSON.stringify(dw, null, 2), function (err) {
    if (err) {
      //console.log(err);
      //return false;
    }
  });
  return true;
}

exports.deleteLevelFile = async (levelId) => {

}

exports.copyLevelFile = async (origin, target) => {
  let path = getPath();
  // check directory exists and create it
  await isFolderExists(path, true);
  path = path + '/levels';
  await isFolderExists(path, true);
  const filePath = path + '/' + target;
  fs.copyFile(origin, filePath, (err) => {
    if (err) {
    }
  });

}

