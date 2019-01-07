<template>
  <div class="middle_list">
    <div class="list_wrap">
      <div class="mhead">
        <span>提交方案</span>
        <i class="iconfont icon-icon-" @click="closeplan"></i>
      </div>
      <div v-loading="loading">
        <div class="pro_icon">
          <span>上传图标</span>
          <img v-if="imageUrl2&&apllyPlan.CurrStateNo%10!=3" @mouseenter="enter" :src="imageUrl2" class="avatar">
          <img v-if="imageUrl2&&apllyPlan.CurrStateNo%10==3" @mouseenter="enter" :src="imageUrl2" class="avatar">
          <i v-if="showicon" class="iconfont icon3 icon-icon-" @click="deleimg"></i>
          <i v-show="!imageUrl2" class="el-icon-picture avatar-uploader-icon">
            <input :class="imageUrl2?'abs':''" type="file" @change="selImage"></i>
        </div>

        <div class="seletitem"  v-if="apllyPlan.CurrStateNo%10!=3">
          <span>功能点说明</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入功能点说明"
            v-model="textarea">
          </el-input>
        </div>
        <div class="seletitem"  v-if="apllyPlan.CurrStateNo%10==3">
          <span>功能点说明</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入功能点说明"
            v-model="apllyPlan.SDesc"
            value="apllyPlan.SDesc">
          </el-input>
        </div>
        <div class="pro_icon">
          <span>附件</span>
          <i class="el-icon-circle-plus-outline"><input type="file" @change="selefile"></i>
          <div class="listW">
            <div class="fileItem" v-for="(file,index) in fileList" :key="index">
              <span class="filel">{{file}}</span>
              <i class="iconfont icon4 icon-icon-" @click="delefile(index)"></i>
            </div>
          </div>
        </div>
        <div class="seletitem" v-if="apllyPlan.CurrStateNo%10==3">
          <span>修改说明</span>
          <el-input
            class="inputshow"
            type="textarea"
            :rows="2"
            v-model="apllyPlan.SChangInfo"
            placeholder="请输入修改说明"
            value="apllyPlan.SChangInfo">
          </el-input>
        </div>
        <el-row>
          <el-button type="primary" plain @click="submitload">提交</el-button>
          <el-button type="info" @click="closeplan">取消</el-button>
        </el-row>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        imageUrl: '',
        showOnMsite: true,
        textarea: '',
        imgName: '',
        showicon: false,
        fileName: '',
        fileUrlList: [],
        imgname: '',
        fileUrlList2: [],
        imageUrl2: "",
        loading: false,
        imageUrl3:'',
        showReplace:true,
        apllyPlan:{},
      };
    },
    props: {
      apllyPlan1: Object,
      MPAttachments:Object,
    },
    watch:{

    },
    mounted(){
      this.apllyPlan = this.apllyPlan1
      if(this.apllyPlan.CurrStateNo%10==3){
        if(this.MPAttachments[this.apllyPlan.Id].icon){
          this.imageUrl = this.MPAttachments[this.apllyPlan.Id].icon
          this.imageUrl2 = this.User.baseUrl+this.MPAttachments[this.apllyPlan.Id].icon.RealValue
        }
        if(this.MPAttachments[this.apllyPlan.Id].schemaAttachments.length){
          var vm = this
          for(var i=0;i<this.MPAttachments[this.apllyPlan.Id].schemaAttachments.length;i++){
            vm.fileList.push(this.MPAttachments[this.apllyPlan.Id].schemaAttachments[i].ShowName)
            vm.fileUrlList.push(this.MPAttachments[this.apllyPlan.Id].schemaAttachments[i])
          }
        }
      }
    },
    methods: {
      deleimg() {
        this.imageUrl2 = ''
        this.showicon = false
        this.showReplace = false
        this.imageUrl=''
      },
      enter() {
        this.showicon = true
      },
      selImage(e) {
        var vm = this
        var file = e.target.files[0];
        var type = file.type.split('/')[0];
        if (type != 'image') {
          return;
        }
        this.imgname = file.name
        vm.imageUrl = file
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          vm.imageUrl2 = reader.result;
        }
      },
      selefile(e) {
        var vm = this
        var file = e.target.files[0];
        if (file) {
          this.fileList = this.fileList.concat(file.name)
          this.fileName = file.name
          vm.fileUrlList = vm.fileUrlList.concat(file)
        }
      },
      delefile(index) {
        this.fileUrlList.splice(index, 1)
        this.fileList.splice(index, 1)
      },
      submitload() {
        // if (!this.imageUrl) {
        //   this.$alert('请上传图片', '提示', {
        //     confirmButtonText: '确定',
        //     callback: action => {
        //       this.$message({
        //         type: 'info',
        //         message: `action: ${ action }`
        //       });
        //     }
        //   });
        // } else {
          this.loading = true
          //此处还有一个showOnMsite:true,  向后台post的数据
          this.submitImg()
          this.submitFile()
          this.submitPlan()
      },
      submitImg1() {
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var formData = new FormData()
        formData.append("MPID", this.apllyPlan.Id)
        formData.append("FieldID", this.apllyPlan.SIconId)
        formData.append("fieldName", 'SIconId')
        formData.append("file", this.imageUrl)
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
            if (result.StateCode) {
              vm.$emit('changeImage',result.Data[0])
            }
            if (!result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, result.Message)
              });
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });

      },
      submitImg() {
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        if(this.apllyPlan1.CurrStateNo%10==3){
          if(this.MPAttachments[this.apllyPlan.Id].icon){
              // console.log(vm.MPAttachments[vm.apllyPlan.Id].schemaAttachments[i].ShowName);
            if(vm.imgname&&vm.imgname!=vm.MPAttachments[this.apllyPlan.Id].icon.ShowName||!vm.imageUrl2){
              vm.deleFileData(vm.MPAttachments[vm.apllyPlan.Id].icon.Id)
            }
          }
        }
        var formData = new FormData()
        formData.append("MPID", this.apllyPlan.Id)
        formData.append("FieldID", this.apllyPlan.SIconId)
        formData.append("fieldName", 'SIconId')
        formData.append("file", this.imageUrl)
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
            if (result.StateCode) {
              vm.$emit('changeImage',result.Data[0])
            }
            if (!result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, result.Message)
              });
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
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var formData = new FormData()
        formData.append("MPID", this.apllyPlan.Id)
        formData.append("FieldID", this.apllyPlan.SAttachId)
        formData.append("fieldName", 'SAttachId')

        if(this.apllyPlan1.CurrStateNo%10==3){
          if(this.MPAttachments[this.apllyPlan.Id].schemaAttachments.length){
            for(var i=0;i<this.MPAttachments[this.apllyPlan.Id].schemaAttachments.length;i++){
              // console.log(vm.MPAttachments[vm.apllyPlan.Id].schemaAttachments[i].ShowName);
              if(vm.fileList.indexOf(vm.MPAttachments[vm.apllyPlan.Id].schemaAttachments[i].ShowName)<0){
                vm.deleFileData(vm.MPAttachments[vm.apllyPlan.Id].schemaAttachments[i].Id)
              }
            }
          }
        }

        this.fileUrlList.forEach(function (item, index) {
          formData.append("file1" + index, item)
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
            if (!result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, result.Message)
              });
            }
            if (result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, '提交成功')
              });
              vm.closeplan()
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });

      },
      deleFileData(id){
        console.log('a');
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        $.ajax({
          url: vm.User.baseUrl + "/api/files?id="+id,
          type: 'Delete',
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
                message: h('i', {style: 'color: teal'}, result.Message)
              });
            }
            if (result.StateCode) {
              console.log(result.Data);
              // vm.$emit('changeManager', result.Data)
            }

          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json',
          async:false,
        });
      },
      submitPlan() {

        if(this.apllyPlan.CurrStateNo%10!=3){
          this.apllyPlan.SDesc = this.textarea
        }
        this.apllyPlan.CurrStateNo = 31
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var miniProgram = vm.apllyPlan
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
                message: h('i', {style: 'color: teal'}, result.Message)
              });
            }
            if (result.StateCode) {
              vm.apllyPlan.CurrStateName = result.Data.CurrStateName
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
      closeplan() {
        this.$emit('closeApplyplan')
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload-demo {
    text-align: left;
    margin: 25px 0 25px 90px;
  }

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

  .el-textarea {
    width: 400px;
    vertical-align: top;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    vertical-align: middle;
    margin-left: 50px;
  }

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

  .pro_icon {
    text-align: left;
    height: 130px;
    position: relative;
  }

  .pro_icon span {
    margin-left: 90px;
  }

  .pro_icon input {
    position: absolute;
    font-size: 100px;
    height: 50px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .pro_icon p {
    margin-top: 10px;
    margin-left: 225px;
  }

  .el-icon-picture {
    text-align: left;
    font-size: 55px;
    margin-left: 50px;
    line-height: 55px;
  }

  .el-icon-circle-plus-outline {
    font-size: 35px;
    line-height: 35px;
    margin-left: 90px;
  }

  .icon-icon- {
    position: absolute;
    right: 40px;
    line-height: 80px;
    font-size: 24px;
    font-weight: bold;

  }

  .pro_icon .icon3 {
    position: absolute;
    left: 310px;
    bottom: 90px;
    font-size: 10px;
    margin-left: 10px;
  }
  .pro_icon .icon4{
    position: relative;
    left: 2px;
    bottom: 90px;
    font-size: 10px;
    margin-left: 10px;
  }
  .seletitem {
    width: 100%;
    text-align: left;
    margin: 25px 0 15px 90px;
  }

  .seletitem span {
    margin-right: 35px;
  }

  .mhead {
    background-color: #E0E0E0;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 32px;
    position: relative;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }

  .el-input {
    width: 640px;
    height: 40px;
    margin-left: -75px;
  }

  .el-form--label-right {
    margin-left: 40px;
  }

  .el-button {
    margin: 10px 50px 0 50px;
  }

  .list_wrap .abs {
    position: absolute;
    opacity: 0;
  }

  .fileItem {
    height: 35px;
    display: inline-block;
  }

  .fileItem .filel {
    font-size: 16px;
  }

  .fileItem i {
    position: absolute;
    top: 0;
  }

  .listW {
    padding-left: 125px;
    height: 120px;
    overflow-y: auto;
  }
  .inputshow{
    margin-left: 18px;
  }
</style>

<style>
  .list_wrap #u1 .el-upload-list {
    width: 92px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list_wrap .el-upload-list--picture .el-upload-list__item {
    border: none;
  }
</style>
