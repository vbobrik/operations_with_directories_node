const path = require('path');
const fs = require('fs-extra');

const testDirectoryPath = '\\categories\\test_folder';
const fileNamePath = '\\categories\\test_folder\\createdFile.txt';
const newTestDirectoryPath = '\\categories\\new_test_folder';

//Create a new directory
function createFolder() {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdir(testDirectoryPath, err => {
        console.log('-----------create folder---------');
        if (err) {
          console.error(err);
          return reject;
        }
        return resolve();
      });
    }
    catch (err) {
      console.error(err);
    }
  })
}

//Create a .txt file in the created directory
function putFile1() {
  return new Promise((resolve, reject) => {
    console.log('-----------fill folder---------');
    fs.open(fileNamePath, 'w', err => {
      if (err) {
        console.error(err);
        return reject;
      }
      return resolve();
    })
  })
}

//Copy created directory with a content (1 .txt file)
function copyFolder() {
  return new Promise((resolve, reject) => {
    fs.copy(testDirectoryPath, newTestDirectoryPath, err => {
      if (err) {
        console.error(err);
        return reject;
      }
      console.log('-----------copy folder success---------')
      return resolve();
    })
  });
}

//Create the second .txt file in the first directory
function putFile2() {
  return new Promise((resolve, reject) => {
    console.log('-----------fill2 folder---------');
    fs.open(`${testDirectoryPath}\\second.txt`, 'w', err => {
      if (err) {
        console.error(err);
        return reject;
      }
      return resolve();
    })
  })
}

//Check content of any directory
function readFolder(pathToFolder) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathToFolder, (err, data) => {
      if (err) {
        console.error(err);
        return reject;
      }
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
      console.log('-----read-----');
      return resolve();
    });
  });
}

//Remove content in the first created directory 
function removeAllFilesInFolder(testDirectoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(testDirectoryPath, (err, data) => {
      console.log('-----remove-----');
      if (err) {
        console.error(err);
        return reject;
      }
      console.log(data);
      return resolve(data);
    })
  }).then(data =>
    data.forEach((item) => {
      let filePath = path.join(testDirectoryPath, item);
      fs.unlink(filePath, err => {
        if (err) console.error(err);
      })
    }))
}

//Remove the second created directory with a content
function removeFolder(testDirectoryPath) {
  fs.remove(testDirectoryPath, err => {
    console.log('-----remove-----');
    if (err) {
      console.error(err);
    }
  });
}

async function allOperations(create, putFile1, readFolder, pathToFolder1, pathToFolder2, copy, putFile2, removeAllFilesInFolder, removeFolder) {
  try {
    await create();
    await putFile1();
    await copy();
    await putFile2();
    await readFolder(pathToFolder1);
    await readFolder(pathToFolder2);
    removeAllFilesInFolder(pathToFolder1);
    removeFolder(pathToFolder2);
  }
  catch (err) {
    console.error(err);
    return err;
  }
}

allOperations(createFolder, putFile1, readFolder, testDirectoryPath, newTestDirectoryPath, copyFolder, putFile2, removeAllFilesInFolder, removeFolder);