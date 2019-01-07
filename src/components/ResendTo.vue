<template>
  <div class="list">
    <div class="list_wrap" v-loading="loading">
      <div class="mhead">
        <span v-html="head">转发</span>
        <i class="iconfont icon-icon-" @click="closeResendTo"></i>
      </div>
      <div class="seletitem">
        <div class="record">
          <p v-if="!helpList.length">暂无数据</p>
          <div v-for="(item,index) in helpList" :key="index">
            <span class="time">{{new Date(item.CreateDate).Format("yyyy-MM-dd hh:mm")}}</span>
            <span class="name">{{item.Name}}</span>
            <span class="help">【{{item.Operation}}】</span>
            <span>{{item.Message}}</span>
          </div>
        </div>
      </div>
      <div class="seletitem" v-if="!showHelp">
        <span>协助审核人</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.PrimaryGroupName"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="selectHelp" v-if="showHelp">
        <el-radio v-model="radio" label="同意">同意</el-radio>
        <el-radio v-model="radio" label="反对">反对</el-radio>
      </div>
      <div class="seletitem">
        <span v-html="textareaTitle">求助问题</span>
        <el-input
          type="textarea"
          :rows="5"
          :placeholder="placeHolder"
          v-model="resendTextarea">
        </el-input>
      </div>
      <el-row>
        <el-button type="primary" plain @click="submitResend">提交</el-button>
        <el-button type="info" @click="closeResendTo">取消</el-button>
      </el-row>
    </div>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        resendTextarea:'',
        options:[],
        value:'',
        radio:'同意',
        head:'',
        textareaTitle:'',
        helpman:'',
        placeHolder:'',
        helpList:[],
        type:'',
        loading:true,
      }
    },
    props:{
      ApplyAgreeTitle:String,
      showHelp:Boolean,
      showSrManagerInfo:Object,
    },
    mounted(){
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
      if(this.showHelp == true){
        //协助审批的回复
        this.head= '协助审核'
        this.textareaTitle = '意见'
        this.placeHolder = '请输入审批意见'
      }else{
        //发起协助审批
        this.head= '转发'
        this.textareaTitle = '求助问题'
        this.placeHolder = '请输入求助问题'
      }
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      var vm =this
      $.ajax({
        url: vm.User.baseUrl +"/api/users?RoleType=2", //RoleType :用户角色，0普通，1管理员，2协助审批
        type: 'GEt',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
        },
        xhrFields: {
          withCredentials: true
        },
        contentType: false,
        processData: false,
        success: function (result) {
          if(result.StateCode){
            vm.options = result.Data
            vm.loading = false
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("协助审批接口调用失败")
        },
        cache: false,
        dataType: 'json'
      });

      //获取审批记录
      $.ajax({
        url: vm.User.baseUrl +"/api/ApprovalRecord",
        type: 'GEt',
        data:{
          MPID:vm.showSrManagerInfo.Id,
          Type:'assistRecord'
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
        },
        xhrFields: {
          withCredentials: true
        },
        success: function (result) {
          if(result.StateCode){
            vm.helpList = result.Data
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("协助审批接口调用失败")
        },
        cache: false,
        dataType: 'json'
      });

    },
    methods:{
      closeResendTo(){
        if(this.showHelp){
          this.$emit('closeHelpApply')
        }else{
          this.$emit('closeResend')
        }
      },
      submitResend(){
        if(this.showHelp == true){
          //协助审批的回复
          var vm = this
          var CurUser = JSON.parse(localStorage.getItem("CurUser"));
          var helpNum = 1
          if(this.radio=='同意'){
            helpNum = 1
          }else{
            helpNum = 2
          }
          var AssistRecord2 = {
            HelpOpFlag: helpNum, //1：协助审批回复同意   2拒绝
            HelpApContent : vm.resendTextarea,
          }
          var MiniProgram = this.showSrManagerInfo
          var formData = new FormData()
          formData.append("MiniProgram",JSON.stringify(MiniProgram))
          formData.append("AssistRecord", JSON.stringify(AssistRecord2))
          $.ajax({
            url: vm.User.baseUrl + "/api/Assist",
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
                var h = vm.$createElement;
                vm.$notify({
                  title: '操作提醒',
                  message: h('i', { style: 'color: teal'}, '提交成功')
                });
                vm.$emit('hideHelpButton',result.Data)
                vm.closeResendTo()
              }
              if (!result.StateCode) {
                var h = vm.$createElement;
                vm.$notify({
                  title: '操作提醒',
                  message: h('i', { style: 'color: teal'}, result.Message)
                });
              }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("err")
            },
            cache: false,
            dataType: 'json'
          });

        }else{
          //发起协助审批
            var vm = this
            var CurUser = JSON.parse(localStorage.getItem("CurUser"));
            var AssistRecord = {
              HelpOpFlag: 0, //0：发起协助审批
              HelpUserNo : vm.value.UserNo,
              HelpUserName: vm.value.UserName,
              HelpProblem : vm.resendTextarea,
            }
            var MiniProgram = this.showSrManagerInfo
            var formData = new FormData()
            formData.append("MiniProgram",JSON.stringify(MiniProgram))
            formData.append("AssistRecord", JSON.stringify(AssistRecord))
            $.ajax({
              url: vm.User.baseUrl + "/api/Assist",
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
                  var h = vm.$createElement;
                  vm.$notify({
                    title: '操作提醒',
                    message: h('i', { style: 'color: teal'}, '转发成功')
                  });
                  vm.$emit('hideButton')
                  vm.closeResendTo()
                }
                if (!result.StateCode) {
                  var h = vm.$createElement;
                  vm.$notify({
                    title: '操作提醒',
                    message: h('i', { style: 'color: teal'}, result.Message)
                  });
                }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("err")
              },
              cache: false,
              dataType: 'json'
            });

        }
      },
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
  .selectHelp{
    text-align: left;
    padding-left: 90px;
    margin: 30px 0;
  }
  .seletitem2{
    width: 100%;
    text-align: left;
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
  .el-textarea{
    width: 600px;
    vertical-align: top;
    margin-left: 18px;
  }
  .seletitem {
    width: 100%;
    text-align: left;
    margin: 25px 0 25px 90px;
  }

  .seletitem span {
    margin-right: 35px;
  }



  .sele2{
    margin: auto;
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

  .record{
    padding: 10px 30px;
    width: 737px;
    height: 100px;
    border: dashed 1px gray;
    border-radius: 5px;
    overflow: auto;
  }
  .record span{
    margin: 0;
    font-size: 16px;
  }
  .record .time{
    margin-right: 15px;
  }
  .record .name{
    margin-right: 28px;
  }
  .record .help{
    margin-right: 5px;
  }
  .record div{
    margin-bottom: 5px;
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
