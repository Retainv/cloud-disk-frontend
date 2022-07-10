const axios = require("axios");
const jszip = require("jszip");
const FileSaver = require("file-saver");


var getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      headers:{
        'Cache-control': 'no-cache',
      },
      method: "get",
      url,
      responseType: "arraybuffer"
    })
      .then(data => {
        resolve(data.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const downloadFromAliOss = function (fileArr, zipName) {
  const zip = new jszip();
  let promises = [];
  fileArr.forEach(item => {
    let promise = getFile(item.url).then(data => {
      let name = item.name;
      let foldPath = item.foldPath;
      zip.file(foldPath + name, data, {
        binary: true
      });
    });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, zipName || `文件.zip`);
    });
  });
};
