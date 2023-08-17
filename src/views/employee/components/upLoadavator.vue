<template>
    <!-- 
    (自动上传)action	必选参数，上传的地址	string----当前项目 -手动上传
    show-file-list	是否显示已上传文件列表	boolean   false 不展示列表
    before-upload	
    上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	
    function(file)
     -->
    <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
    >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
    export default {
        props:['value'],
        methods:{
            // 上传前钩子  判断文件的类型还有大小  return true(继续上传)/false(停止上传)
            beforeAvatarUpload(file){
                    const isJPG = ['image/jpeg','image/png','image/gif'].includes(file.type);
                    const isLt2M = file.size / 1024 / 1024 < 5;

                    if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                    }
                    return isJPG && isLt2M;
            },
             // 选择图片上传
             uploadImage(params) {
              console.log(params,'图片上传')
              const cos = new COS({
                SecretId: 'AKIDKXZO0QcfV8aqx0ud8WjjYyBGKbottnV4',
                SecretKey: 'ShmgQ0QfhUZQ2RccT9d7LbsBTdaQ6aKv'
              }) // 完成cos对象的初始化
              cos.putObject({
                Bucket: 'lyc-2210c-1320041670', // 存储桶名称
                Region: 'ap-nanjing', // 地域名称
                Key: params.file.name, // 文件名称
                StorageClass: 'STANDARD', // 固定值
                Body: params.file // 文件对象
              }, (err, data) => {
                if (data.statusCode === 200 && data.Location) {
                  // 拿到了腾讯云返回的地址  data.Location
                  // 通过input自定义事件将地址传出去
                  console.log(data.Location);
                  this.$emit('input', 'http://' + data.Location) // 将地址返回了
                } else {
                  this.$message.error(err.message) // 上传失败提示消息
                }
              })
            }
        }
    }
</script>

<style  scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>