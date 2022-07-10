import {Notification} from "element-ui";

export const notifySuccess = function(message) {
  Notification({
    dangerouslyUseHTMLString: true,
    title: '成功',
    message: `<span style="color: teal">` + message + `</span>`,
    type: 'success'
  });

}
export const notifyWarning = function(message) {
  Notification({
    dangerouslyUseHTMLString: true,
    title: '提示',
      message: `<span style="color: rgb(230,162,60)">` + message + `</span>`,
      type: 'warning'
    });
}
export const notifyError = function(message) {
  Notification({
    dangerouslyUseHTMLString: true,
    title: '失败',
    message: `<span style="color: rgb(245,108,108)">` + message + `</span>`,
    type: 'error'
  });
}
