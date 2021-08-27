<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success='handleSucess'
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import config from '../../api/config'
export default {
  data() {
    return {
      fileList: [],
      action:config.baseUrl+config.upload
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    /**
     * 回显
     */
    handleSucess(response){
        // console.log(config.baseUrl+'/'+response.url.slice(7));
        let imgUrl=config.baseUrl+'/'+response.url.slice(7)
        this.$emit('getSucess',imgUrl)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>