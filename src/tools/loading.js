// loading.js
import { Loading } from 'element-ui';

let loadingCount = 0;
let loading;

const startLoading = () => {
  loading = Loading.service({
    // spinner: '/static/loading.gif',
    lock: false,
    text: '加载中...',
    fullscreen: false,
    background: 'rgba(255,255,255,0)'
  });
};

const endLoading = () => {
  loading.close();
};
export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};

