<template>
  <div class="middle_list" v-loading="loading">
    <div class="mhead">
      <span>新小程序申请</span>
    </div>
    <el-form label-position="right" label-width="160px" :model="formLabelAlign">
      <el-form-item label="应用名称">
        <el-input autofocus="true" maxlength="8" v-if="applyList.CurrStateNo%10!=3"
                  v-model="formLabelAlign.PApplyFullName"></el-input>
        <el-input autofocus="true" maxlength="8" v-if="applyList.CurrStateNo%10==3&&apply1"
                  value="applyList.PApplyFullName" v-model="applyList.PApplyFullName"></el-input>
        <p class="tips">展示给客户看,简单易懂,8字以内</p>
      </el-form-item>
      <el-form-item label="名称首字母">
        <el-input v-if="applyList.CurrStateNo%10!=3" v-model="formLabelAlign.PApplyFirstName"></el-input>
        <el-input value="applyList.PApplyFullName" v-if="applyList.CurrStateNo%10==3&&apply1"
                  v-model="applyList.PApplyFirstName"></el-input>
      </el-form-item>
      <el-form-item label="商户名">
        <el-input v-if="applyList.CurrStateNo%10!=3" v-model="formLabelAlign.PMerchantName"></el-input>
        <el-input value="applyList.PMerchantName" v-if="applyList.CurrStateNo%10==3&&apply1"
                  v-model="applyList.PMerchantName"></el-input>
        <p class="tips">如果是分行自行开发,填写分行名;如果是外部商户开发,填写商户名称</p>
      </el-form-item>
      <el-form-item label="开发分行或机构">
        <el-input v-if="applyList.CurrStateNo%10!=3" v-model="formLabelAlign.PBranchName"></el-input>
        <el-input value="applyList.PBranchName" v-model="applyList.PBranchName"
                  v-if="applyList.CurrStateNo%10==3&&apply1"></el-input>

      </el-form-item>
      <el-form-item label="商户类别">
        <el-select v-model="formLabelAlign.PMerchantType"  v-if="applyList.CurrStateNo%10!=3" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select v-model="value"  v-if="applyList.CurrStateNo%10==3" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <p class="tips">行内：分行自行开发，可以传送客户信息；行外：外部商户开发，不传送客户信息，如要传送手机号，需要单独申请</p>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="formLabelAlign.PUserName" value="formLabelAlign.PUserName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="申请人ID">
        <el-input v-model="formLabelAlign.PUserNo" value="formLabelAlign.PUserNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="申请人分行或机构">
        <el-input v-model="formLabelAlign.PUserBranch" :disabled="true" value=""></el-input>
      </el-form-item>
      <el-form-item label="补充描述">
        <el-input v-if="applyList.CurrStateNo%10!=3" type="textarea" v-model="formLabelAlign.PDesc"></el-input>
        <el-input value="applyList.PDesc" v-model="applyList.PDesc"
                  v-if="applyList.CurrStateNo%10==3&&apply1"></el-input>
      </el-form-item>
      <el-form-item label="修改说明" v-if="applyList.CurrStateNo%10==3&&apply1">
        <el-input type="textarea" value="applyList.PChangeInfo" v-model="applyList.PChangeInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitapply">提交申请</el-button>
        <el-button class="cancelbutton" type="info" @click="closeadd">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formLabelAlign: {
          PApplyFullName: '',
          PApplyFirstName: '',
          PMerchantName: '',
          PBranchName: '',
          PMerchantType: '',
          PUserName: '',
          PUserBranch: '',
          PUserNo: '',
          PDesc: '',
          CurrStateNo: '',
          CurrStateName: '',
          IsAdminUpdate: ''
        },
        apply: {
          Id: '',
          PApplyFullName: '',
          PApplyFirstName: '',
          PMerchantName: '',
          PBranchName: '',
          PMerchantType: '',
          PUserName: '',
          PUserBranch: '',
          PUserNo: '',
          PDesc: '',
          CurrStateNo: '',
          CurrStateName: '',
          IsAdminUpdate: '',
          PChangeInfo: '',
        },
        apply1: false,
        isNew: true,
        loading: false,
        value:"",
        options:['行内商户','行外商户','行外+手机号'],
      }
    },
    props: {
      applyList: Object,
      isReply: Boolean,
    },
    mounted() {
      if (this.isReply) {
        this.apply1 = true
      }
      if(this.applyList.CurrStateNo % 10 == 3){
        this.value = this.applyList.PMerchantType
      }
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      if (CurUser) {
        this.formLabelAlign.PUserName = CurUser.NAME
        this.formLabelAlign.PUserNo = CurUser.USID
        this.formLabelAlign.PUserBranch = CurUser.PATH
      }
    },
    methods: {
      closeadd() {
        this.$emit('closeapplyadd')
      },

      submitapply() {
        if (this.applyList.CurrStateNo % 10 != 3) {
          this.isNew = true
          var fd = this.formLabelAlign
          if (fd.PApplyFullName.trim() && fd.PApplyFirstName.trim() && fd.PMerchantName && fd.PBranchName && fd.PMerchantType && fd.PUserName && fd.PUserBranch && fd.PUserNo) {
            this.formLabelAlign.CurrStateNo = 11
            this.formLabelAlign.IsAdminUpdate = false
            this.loading = true
            this.setup(this.formLabelAlign)
          } else {
            this.$confirm('请将信息填写完整', '提示', {
              type: 'warning',
              showCancelButton: false,
              center: true
            })
          }
        } else {
          this.isNew = false
          this.applyList.PMerchantType = this.value
          var appe = this.applyList
          // this.apply.PApplyFullName = this.applyList.PApplyFullName
          // this.apply.PApplyFirstName = this.applyList.PApplyFirstName
          // this.apply.PMerchantName = this.applyList.PMerchantName
          // this.apply.PBranchName = this.applyList.PBranchName
          // this.apply.PMerchantType = this.applyList.PMerchantType
          // this.apply.PUserName = this.applyList.PUserName
          // this.apply.PUserBranch = this.applyList.PUserBranch
          // this.apply.PUserNo = this.applyList.PUserNo
          // this.apply.PDesc = this.applyList.PDesc
          // this.apply.CurrStateName = this.applyList.CurrStateName
          // this.apply.PChangeInfo = this.applyList.PChangeInfo
          // this.apply.CurrStateNo = 11
          // this.apply.IsAdminUpdate = false
          appe.CurrStateNo = 11
          appe.IsAdminUpdate = false
          this.setup(appe)
        }
      },
      setup(item) {
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var miniProgram = item
        console.log(miniProgram);
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
            console.log(result);
            if (result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, '申请成功')
              });
              vm.applyList.CurrStateName = result.Data.CurrStateName
              vm.$emit('changeManager', result.Data, vm.isNew)

            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
            var h = vm.$createElement;
            vm.$notify({
              title: '操作提醒',
              message: h('i', {style: 'color: teal'}, '申请失败,请查看网络状态稍后再试')
            });
          },
          cache: false,
          dataType: 'json'
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .middle_list {
    z-index: 6;
    top: 0;
    right: 0;
    position: absolute;
    height: 820px;
    width: 1130px;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .mhead {
    background-color: #f8f8f8;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 42px;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }

  .middle_list .tips {
    text-align: left;
    margin-top: -5px;
    margin-left: 20px;
    height: 20px;
    color: #aeb3bd;
    font-size: 13px;
  }

  .el-input {
    width: 630px;
    height: 40px;
    margin-left: -150px;
  }

  .el-form-item {
    margin-bottom: 18px;
  }
  .el-select {
    width: 630px;
    margin-left: 20px;
  }
  .el-textarea {
    width: 630px;
    margin-left: -150px;
    height: 80px;
  }

  .el-select {
    margin-right: 562px;

  }

  .el-form--label-right {
    margin-left: 150px;
  }

  .el-button {
    width: 112px;
    position: relative;
    right: 270px;
  }

</style>
<style>
  .el-form-item__label {
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }

</style>
