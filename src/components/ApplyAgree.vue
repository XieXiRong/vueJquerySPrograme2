<template>
  <div class="list">
    <div class="list_wrap" v-loading="loading">
      <div class="mhead">
        <span>{{ApplyAgreeTitle}}</span>
        <i class="iconfont icon-icon-" @click="closeApplyAgree"></i>
      </div>
      <div>
        <div class="seletitem" v-if="show51&&type=='reject'">
          <span>审批意见</span>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入审批意见"
            v-model="OpContent">
          </el-input>
        </div>
        <div class="seletitem" v-if="!show51">
          <span>审批意见</span>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入审批意见"
            v-model="OpContent">
          </el-input>
        </div>
        <div class="seletitem" v-if="ApplyAgreeTitle=='上线确认'">
          <span>检查项</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="RHasMerchantNo">商户号已颁发</el-checkbox>
            <br>
            <el-checkbox label="RHasDoc">方案文档已提交</el-checkbox>
            <br>
            <el-checkbox label="RHasTest">已测试验收</el-checkbox>
          </el-checkbox-group>
        </div>
        <p v-if="show51&&type=='agree'" class="tip2">提示：生成正式商户号后管理员可见分行不可见，请线下完成配置工作。</p>
        <el-row>
          <el-button type="primary" :disabled="isOnline" v-html="leftButton" plain @click="submitNew"></el-button>
          <el-button type="info" @click="closeApplyAgree">取消</el-button>
        </el-row>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        OpContent:'',
        checkList:[],
        change54:false,
        show51:false,
        loading:false,
        isAddNew:false,
        leftButton:'',
        isOnline:false,
      }
    },
    props:{
      ApplyAgreeTitle:String,
      showSrManagerInfo:Object,
      type:String
    },
    mounted(){
      if(this.showSrManagerInfo.CurrStateNo==51){
        this.show51 = true
      }
      if(this.ApplyAgreeTitle=='上线确认'){
        this.isOnline = true
      }
      if(this.type=='reject'&&this.showSrManagerInfo.CurrStateNo==11){
        this.isAddNew = true
      }
      if(this.type=='reject'){
        this.leftButton = '拒绝'
      }else{
        this.leftButton = '同意'
      }
    },
    watch:{
      checkList(){
        if(this.checkList.length==3){
          this.isOnline = false
        }else{
          this.isOnline = true
        }
      }
    },
    methods:{
      closeApplyAgree(){
        this.$emit('closeApply')
      },
      submitNew(){
        this.loading = true
        if(this.type=='agree'){
          if(this.showSrManagerInfo.CurrStateNo==11){
            this.submitMethod(12)
          }else if(this.showSrManagerInfo.CurrStateNo==21){
            this.submitMethod(22)
          }else if(this.showSrManagerInfo.CurrStateNo==31){
            this.submitMethod(32)
          }else if(this.showSrManagerInfo.CurrStateNo==41){
            this.submitMethod(42)
          }else if(this.showSrManagerInfo.CurrStateNo==51){
            this.submitEnd(54)
          }else if(this.showSrManagerInfo.CurrStateNo==54){
            this.submitEnd(52)
          }
        }
        if(this.type=='reject'){
          if(this.showSrManagerInfo.CurrStateNo==11){
            this.submitMethod(13)
          }else if(this.showSrManagerInfo.CurrStateNo==21){
            this.submitMethod(23)
          }else if(this.showSrManagerInfo.CurrStateNo==31){
            this.submitMethod(33)
          }else if(this.showSrManagerInfo.CurrStateNo==41){
            this.submitMethod(43)
          }else if(this.showSrManagerInfo.CurrStateNo==51){
            this.submitMethod(53)
          }else if(this.showSrManagerInfo.CurrStateNo==54){
            this.submitMethod(53)
          }
        }
      },
      submitMethod(num){
        this.loading = true
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var formData = new FormData()
        this.showSrManagerInfo.CurrStateNo = num
        formData.append("MiniProgram", JSON.stringify(this.showSrManagerInfo))
        formData.append("OpContent", JSON.stringify(vm.OpContent))
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
            if(result.StateCode){
              vm.loading = false
              var h = vm.$createElement;
              var msg = ''
              if(vm.type=='reject'){
                msg = '拒绝成功'
              }else{
                msg = '通过成功'
              }
              vm.$notify({
                title: '操作提醒',
                message: h('i', { style: 'color: teal'}, msg)
              });
              if(!vm.isAddNew){
                vm.$emit('hideAgree',result.Data)
              }
              vm.$emit('changeManager1',result.Data)
              vm.closeApplyAgree()

            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
            vm.loading = false
            var h = vm.$createElement;
            vm.$notify({
              title: '操作提醒',
              message: h('i', { style: 'color: teal'}, '操作失败')
            });
          },
          cache: false,
          dataType: 'json'
        });
      },
      submitEnd(Num){
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        if(this.checkList.indexOf('RHasMerchantNo')>=0){
          this.showSrManagerInfo.RHasMerchantNo =1
        }else{
          this.showSrManagerInfo.RHasMerchantNo =0
        }
        if(this.checkList.indexOf('RHasDoc')>=0){
          this.showSrManagerInfo.RHasDoc =1
        }else{
          this.showSrManagerInfo.RHasDoc =0
        }
        if(this.checkList.indexOf('RHasTest')>=0){
          this.showSrManagerInfo.RHasTest =1
        }else{
          this.showSrManagerInfo.RHasTest =0
        }
        var formData = new FormData()
        this.showSrManagerInfo.CurrStateNo = Num
        formData.append("MiniProgram", JSON.stringify(this.showSrManagerInfo))
        formData.append("OpContent", JSON.stringify(vm.OpContent))
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
            console.log(result);
            if(result.StateCode){
              vm.change54 = true
              var h = vm.$createElement;
              var msg = ''
              if(vm.type=='reject'){
                msg = '拒绝成功'
              }else{
                msg = '通过成功'
              }
              vm.$notify({
                title: '操作提醒',
                message: h('i', { style: 'color: teal'}, msg)
              });
              vm.$emit('hideAgree',result.Data)
              vm.$emit('changeManager1',result.Data)
              vm.closeApplyAgree()
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list {
    z-index: 6;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: rgba(16, 16, 16, 0.44);
  }
.el-checkbox-group{
  vertical-align: top;
  margin-left: 20px;
}
  .list_wrap{
    margin:40px auto;
    height: 640px;
    width: 927px;
    background-color: #fff;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }
  .icon-icon-{
    position: absolute;
    right: 40px;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;

  }
  .tip2{
    margin: 180px auto;
  }
  .el-textarea{
    width: 600px;
    vertical-align: top;
  }
  .seletitem {
    width: 100%;
    text-align: left;
    margin: 25px 0 25px 90px;
  }

  .seletitem span {
    margin-right: 35px;
  }

  .seletitem{
    width: 100%;
    text-align: left;
    margin: 35px 0 40px 55px;
  }
  .seletitem span{
    margin-right: 35px;
  }
  .mhead {
    background-color: #E0E0E0;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 22px;
    position: relative;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }
  .tips{
    color: rgba(229, 28, 35, 1);
    font-size: 16px;
    text-align: center;
    margin-top: 50px;
    font-family: SourceHanSansSC-regular;

  }
  .el-input{
    width: 640px;
    height: 40px;
    margin-left: -75px;
  }
  .el-form--label-right{
    margin-left: 40px;
  }

  .el-button{
    margin: 20px  50px 0 50px;
  }
</style>
<style>
  .list_wrap .el-form-item__label{
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }
  .el-checkbox-group{
    display: inline-block;
  }
</style>
