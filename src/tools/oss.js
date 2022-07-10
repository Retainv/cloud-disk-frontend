// 引入ali-oss

const axios = require("axios");
let OSS = require('ali-oss')
/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 */
export function client(data) {//data后端提供数据
  return new OSS({
    region: data.region,
    accessKeyId: data.credentials.accessKeyId,
    accessKeySecret:  data.credentials.accessKeySecret,
    bucket: data.bucketName,
    stsToken: data.credentials.securityToken,
    refreshSTSToken: async () => {
      const refreshToken = await axios.get("http://localhost:8090/api/user/sts");
      return {
        accessKeyId: refreshToken.credentials.accessKeyId,
        accessKeySecret: refreshToken.credentials.AccessKeySecret,
        stsToken: refreshToken.credentials.securityToken,
      };
    },
  })
}

/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}
