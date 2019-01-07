<template>
  <div class="middle_list">
    <div class="list_wrap">
    <div class="mhead">
      <span>提交测试</span>
      <i class="iconfont icon-icon-" @click="closeSubmit"></i>
    </div>
    <el-form label-position="right" label-width="120px" v-loading="loading">
      <el-form-item label="测试账号" v-if="testSubmit.CurrStateNo%10!=3">
        <el-input v-model="testMessage.account"></el-input>
      </el-form-item>
      <el-form-item label="测试账号" v-if="testSubmit.CurrStateNo%10==3">
        <el-input v-model="testSubmit.TTestAccount" value="testSubmit.TTestAccount"></el-input>
      </el-form-item>
      <el-form-item label="演示地址" v-if="testSubmit.CurrStateNo%10!=3">
        <el-input v-model="testMessage.showLocation"></el-input>
      </el-form-item>
      <el-form-item label="演示地址" v-if="testSubmit.CurrStateNo%10==3">
        <el-input v-model="testSubmit.TDemoUrl" value="testSubmit.TDemoUrl"></el-input>
      </el-form-item>
      <div class="pro_icon">
        <span>测试用例</span>
        <i  class="el-icon-circle-plus-outline"><input type="file" @change="selefile"></i>
        <div class="listW">
          <div class="fileItem" v-for="(file,index) in fileList" :key="index">
            <span class="filel">{{file}}</span>
            <i class="iconfont icon3 icon-icon-" @click="delefile(index)"></i>
          </div>
        </div>
      </div>
      <el-form-item label="修改说明" v-if="testSubmit.CurrStateNo%10==3">
        <el-input v-model="testSubmit.TChangeInfo" value="testSubmit.TChangeInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitTest">提交</el-button>
        <el-button class="cancelbutton" type="info" @click="closeSubmit">取消</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        testMessage: {
          testLocation: '',
          account: '',
          showLocation: '',
        },
        fileList:[],
        fileUrlList:[],
        fileUrlList2:[],
        loading:false,
      }
    },
    props:{
      testSubmit:Object
    },
    methods:{
      selefile(e) {
        var vm = this
        var file = e.target.files[0];
        if(file){
          this.fileList = this.fileList.concat(file.name)
          vm.fileUrlList = vm.fileUrlList.concat(file)
        }
      },
      submitTest(){
        this.loading = true
        this.submitContent()
        this.submitFile()
      },
      submitContent(){
        if(this.testSubmit.CurrStateNo%10!=3){
          this.testSubmit.TTestAccount = this.testMessage.account
          this.testSubmit.TDemoUrl = this.testMessage.showLocation
        }
        this.testSubmit.CurrStateNo = 41
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var miniProgram = vm.testSubmit
        var formData = new FormData()
        formData.append("MiniProgram", JSON.stringify(miniProgram))
        formData.append("CurUser", JSON.stringify(CurUser))
        $.ajax({
          url: vm.User.baseUrl + "/api/miniprogram",
          type: 'Post',
          data: formData,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          contentType: false,
          processData: false,
          success: function (result) {
            console.log(result)
            if (!result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', { style: 'color: teal'}, result.Message)
              });
            }
            if(result.StateCode){
              vm.testSubmit.CurrStateName = result.Data.CurrStateName
              vm.$emit('changeManager', result.Data)
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      submitFile() {
        this.loading = true
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var formData = new FormData()
        formData.append("MPID", this.testSubmit.Id)
        formData.append("FieldID", this.testSubmit.TTestDemoId)
        formData.append("fieldName", 'TTestDemoId')
        this.fileUrlList.forEach(function (item,index) {
          formData.append("file1"+index, item)
        })
        $.ajax({
          url: vm.User.baseUrl + "/api/files",
          type: 'Post',
          data: formData,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          contentType: false,
          processData: false,
          success: function (result) {
            console.log(result)
            if (!result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', { style: 'color: teal'}, result.Message)
              });
            }
            if (result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });
              vm.closeSubmit()
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (!result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', { style: 'color: teal'}, '提交失败')
              });
            }
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });

      },
      delefile(index) {
        this.fileUrlList.splice(index, 1)
        this.fileList.splice(index, 1)
      },
      closeSubmit(){
        this.$emit('closeTestSubmit')
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .middle_list {
    z-index: 6;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: rgba(16, 16, 16, 0.44);
  }

  .list_wrap {
    margin: 100px auto;
    height: 640px;
    width: 927px;
    background-color: #fff;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }
  .mhead {
    background-color: #E0E0E0;
    height: 80px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 110px;
    position: relative;
  }
  .icon-icon- {
    position: absolute;
    right: 40px;
    line-height: 80px;
    font-size: 24px;
    font-weight: bold;
  }
  .mhead span {
    margin-left: 45px;
    line-height: 80px;
    font-size: 20px;
    color: #101010;
  }
  .el-input{
    width: 430px;
    height: 30px;
    margin-left: -150px;
  }
  .el-textarea{
    width: 630px;
    margin-left: -150px;
  }
  .el-select {
    margin-right: 562px;

  }
  .el-form--label-right{
    margin-left: 150px;
  }
  .el-button{
    width: 112px;
    position: relative;
    right: 170px;
    margin-top: 20px;
  }
.upload-demo{
  text-align: left;
  margin-left: 36px;
  margin-bottom: 20px;
}
  .pro_icon{
    text-align: left;
    margin-bottom: 20px;
    position: relative;
  }
  .pro_icon span{
    margin-left: 35px;
  }
  .pro_icon input{
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    height: 35px;
  }
  .pro_icon p{
    margin-top: 10px ;
    margin-left: 225px;
  }
  .el-icon-circle-plus-outline{
    font-size: 30px;
    margin-left: 45px;
  }
  .fileItem{
    height: 35px;
    display: inline-block;
  }
  .fileItem .filel{
    margin-left: 160px;
    font-size: 16px;
    vertical-align: top;
  }
  .fileItem i{
    position: absolute;
    top: -30px;
  }
  .listW{
    margin-top: 30px;
    height: 90px;
    overflow: auto;
    width: 750px;
  }
  .pro_icon .icon3{
    position: relative;
    left: 0;
    bottom: 60px;
    font-size: 10px;
    margin-left: 10px;
  }
</style>
<style>
  .el-form-item__label{
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }

</style>
