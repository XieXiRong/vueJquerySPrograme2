<template>
  <div class="middle_list">
    <div class="list_wrap" v-loading="loading">
      <div class="mhead">
        <span>申请商户号</span>
        <i class="iconfont icon-icon-" @click="logoutbusiness"></i>
      </div>
      <el-form label-position="right" label-width="120px" :model="businessdata">
        <el-form-item label="测试地址">
          <el-input autofocus="true" v-if="addBusinessData.CurrStateNo%10!=3"
                    v-model="businessdata.MTestUrl"></el-input>
          <el-input autofocus="true" v-if="addBusinessData.CurrStateNo%10==3" value="addBusinessData.MTestUrl"
                    v-model="addBusinessData.MTestUrl"></el-input>
        </el-form-item>
        <div class="seletitem" v-if="addBusinessData.CurrStateNo%10!=3">
          <span>一网通支付</span>
          <el-switch
            v-model="businessdata.MIsNetcomPayment">
          </el-switch>
        </div>
        <div class="seletitem" v-if="addBusinessData.CurrStateNo%10==3">
          <span>一网通支付</span>
          <el-switch
            v-model="MIsNetcomPayment">
          </el-switch>
        </div>
        <div class="seletitem" v-if="addBusinessData.CurrStateNo%10!=3">
          <span>默认topBar</span>
          <el-switch
            v-model="businessdata.STopbar">
          </el-switch>
        </div>
        <div class="seletitem" v-if="addBusinessData.CurrStateNo%10==3">
          <span>默认topBar</span>
          <el-switch
            v-model="STopbar">
          </el-switch>
        </div>
        <!--<div class="seletitem">-->
          <!--<span>申请入口</span>-->
          <!--<el-radio v-for="(entry,index) in entrys" :key="index" v-model="businessdata.MApplyEntryType"-->
                    <!--:label="entry.RealValue">{{entry.ShowName}}-->
          <!--</el-radio>-->
        <!--</div>-->
        <!--<div class="seletitem">-->
          <!--<span>全行通用</span>-->
          <!--<el-switch-->
            <!--v-model="businessdata.MIsAllowAllBank">-->
          <!--</el-switch>-->
        <!--</div>-->
        <!--<el-form-item label="说明原因" v-if="!businessdata.MIsAllowAllBank">-->
          <!--<el-input v-if="addBusinessData.CurrStateNo%10!=3" v-model="businessdata.MNotAllowInfo"></el-input>-->
          <!--<el-input autofocus="true" v-if="addBusinessData.CurrStateNo%10==3" value="addBusinessData.MNotAllowInfo"-->
                    <!--v-model="addBusinessData.MNotAllowInfo"></el-input>-->
        <!--</el-form-item>-->

        <div class="seletitem" v-if="addBusinessData.CurrStateNo%10!=3">
          <span>调用接口</span>
          <el-checkbox-group v-model="businessdata.MCallInterface">
            <el-checkbox v-for="(item,index) in checkForm" :key="index" :label="item.ShowName"
                         size="medium"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="seletitem" v-if="addBusinessData.CurrStateNo%10==3">
          <span>调用接口</span>
          <el-checkbox-group v-model="MCallInterface">
            <el-checkbox v-for="(item,index) in checkForm" :key="index" :label="item.ShowName"
                         size="medium"></el-checkbox>
          </el-checkbox-group>
        </div>
        <!--<el-form-item label="分类标签">-->
          <!--<el-input v-if="addBusinessData.CurrStateNo%10!=3" v-model="businessdata.MTags" placeholder="选填"></el-input>-->
          <!--<el-input autofocus="true" v-if="addBusinessData.CurrStateNo%10==3" value="addBusinessData.MTags"-->
                    <!--v-model="addBusinessData.MTags"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="修改说明" v-if="addBusinessData.CurrStateNo%10==3">
          <el-input value="addBusinessData.MChangeInfo" v-model="addBusinessData.MChangeInfo"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="primary" plain @click="submitBusiness">提交</el-button>
        <el-button type="info" @click="logoutbusiness">取消</el-button>
      </el-row>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        businessdata: {
          MTestUrl: '',
          MTags: '',
          MCallInterface: [],
          STopbar:true,
          MIsNetcomPayment:true
        },
        checkForm: [],
        entrys: [],
        loading: false,
        MIsNetcomPayment:true,
        STopbar:true,
        MCallInterface:[],
      }
    },
    props: {
      addBusinessData: Object
    },
    mounted() {
      this.loading = true
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      var vm = this
      if(vm.addBusinessData.MCallInterface.trim()){
        vm.MCallInterface = JSON.parse(vm.addBusinessData.MCallInterface)
      }
      if(this.addBusinessData.MIsNetcomPayment){
        this.MIsNetcomPayment = true
      }else {
        this.MIsNetcomPayment = false
      }
      if(this.addBusinessData.STopbar){
        this.STopbar = true
      }else {
        this.STopbar = false
      }
      $.ajax({
        url: vm.User.baseUrl + "/api/params?id=" + 2002,
        type: 'Get',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
          var data = result.Data;
          console.log(data)
          vm.loading = false
          vm.checkForm = data
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("err")
        },
        cache: false,
        dataType: 'json'
      });

    },
    methods: {
      submitBusiness() {
        this.loading = true
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        if(this.addBusinessData.CurrStateNo%10!=3){
          this.addBusinessData.MTestUrl = this.businessdata.MTestUrl
          this.addBusinessData.MCallInterface = JSON.stringify(this.businessdata.MCallInterface)
          if(this.businessdata.MIsNetcomPayment){
            this.addBusinessData.MIsNetcomPayment = 1
          }else{
            this.addBusinessData.MIsNetcomPayment = 0
          }
          if(this.businessdata.STopbar){
            this.addBusinessData.STopbar = 1
          }else{
            this.addBusinessData.STopbar = 0
          }
        }
        if(this.addBusinessData.CurrStateNo%10==3){
          if(this.MIsNetcomPayment){
            this.addBusinessData.MIsNetcomPayment = 1
          }else{
            this.addBusinessData.MIsNetcomPayment = 0
          }
          if(this.STopbar){
            this.addBusinessData.STopbar = 1
          }else{
            this.addBusinessData.STopbar = 0
          }
          vm.addBusinessData.MCallInterface= JSON.stringify(vm.MCallInterface)
        }
        //新状态值要改变
        this.addBusinessData.CurrStateNo = 21
        console.log(this.addBusinessData);
        var formData = new FormData()
        formData.append("MiniProgram", JSON.stringify(this.addBusinessData))
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
            console.log(result);
            if (result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, '提交成功')
              });
              vm.$emit('changeManager', result.Data)
              vm.logoutbusiness()
            }
            if (!result.StateCode) {
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

      logoutbusiness() {
        this.$emit('closenewbusiness')
      }
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

  .icon-icon- {
    position: absolute;
    right: 40px;
    line-height: 80px;
    font-size: 24px;
    font-weight: bold;

  }

  .seletitem {
    width: 100%;
    text-align: left;
    margin: 35px 0 40px 35px;
  }

  .seletitem span {
    margin-right: 35px;
  }

  .mhead {
    background-color: #E0E0E0;
    height: 80px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 22px;
    position: relative;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 80px;
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
    margin: 20px 50px 0 50px;
  }
</style>
<style>
  .list_wrap .el-form-item__label {
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }

  .el-checkbox-group {
    display: inline-block;
  }
</style>
