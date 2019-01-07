<template>
  <div class="middle_list">
    <div class="mhead">
      <span @click="closeChange" class="mspan"><</span>
      <span>管理员修改</span>
    </div>
    <div class="tableWrap" :style="{'height':contentHeight1+'px'}" v-loading="loading">
      <el-form label-position="right" class="forms" label-width="160px">
        <el-form-item label="应用名称">
          <el-input maxlength="8" value="applyList.PApplyFullName"
                    v-model="applyList.PApplyFullName"></el-input>
          <!--<p class="tips">展示给客户看,简单易懂,8字以内</p>-->
        </el-form-item>
        <el-form-item label="名称首字母">
          <el-input value="applyList.PApplyFullName" v-model="applyList.PApplyFirstName"></el-input>
        </el-form-item>
        <el-form-item label="商户名">
          <el-input value="applyList.PMerchantName" v-model="applyList.PMerchantName"></el-input>
          <!--<p class="tips">如果是分行自行开发,填写分行名;如果是外部商户开发,填写商户名称</p>-->
        </el-form-item>
        <el-form-item label="开发分行或机构">
          <el-input value="applyList.PBranchName" v-model="applyList.PBranchName"></el-input>
        </el-form-item>
        <el-form-item label="商户类别">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <!--<p class="tips">行内：分行自行开发，可以传送客户信息；行外：外部商户开发，不传送客户信息，如要传送手机号，需要单独申请</p>-->
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="applyList.PUserName" value="applyList.PUserName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请人ID">
          <el-input v-model="applyList.PUserNo" value="applyList.PUserNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请人分行或机构">
          <el-input v-model="applyList.PUserBranch" value="applyList.PUserBranch" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="补充描述">
          <el-input value="applyList.PDesc" v-model="applyList.PDesc"></el-input>
        </el-form-item>


        <el-form-item label="测试地址" v-if="applyList.CurrStateNo>=21">
          <el-input value="applyList.MTestUrl"
                    v-model="applyList.MTestUrl"></el-input>
        </el-form-item>
        <el-form-item label="一网通支付" v-if="applyList.CurrStateNo>=21">
          <el-switch
            v-model="MIsNetcomPayment">
          </el-switch>
        </el-form-item>

        <el-form-item label="默认topBar" v-if="applyList.CurrStateNo>=21">
          <el-switch
            v-model="STopbar">
          </el-switch>
        </el-form-item>

        <div class="seletitem seletitem3" v-if="applyList.CurrStateNo>=21">
          <span>调用接口</span>
          <el-checkbox-group class="checkList" v-model="MCallInterface">
            <el-checkbox v-for="(item,index) in checkForm" :key="index" :label="item.ShowName"
                         size="medium"></el-checkbox>
          </el-checkbox-group>
        </div>
        <el-form-item label="功能点说明" v-if="applyList.CurrStateNo>=31">
          <el-input
            type="textarea"
            placeholder="请输入功能点说明"
            v-model="applyList.SDesc"
            value="applyList.SDesc">
          </el-input>
        </el-form-item>

        <el-form-item label="测试账号" v-if="applyList.CurrStateNo>=41">
          <el-input v-model="applyList.TTestAccount" value="applyList.TTestAccount"></el-input>
        </el-form-item>

        <el-form-item label="演示地址" v-if="applyList.CurrStateNo>=41">
          <el-input v-model="applyList.TDemoUrl" value="applyList.TDemoUrl"></el-input>
        </el-form-item>

        <el-form-item label="生产地址" v-if="applyList.CurrStateNo>=51">
          <el-input v-model="applyList.RApplyHome" value="applyList.RApplyHome"></el-input>
        </el-form-item>
        <el-form-item label="全行通用" v-if="applyList.CurrStateNo>=51">
          <el-switch
            v-model="applyList.MIsAllowAllBank">
          </el-switch>
        </el-form-item>
        <el-form-item label="说明原因" v-if="applyList.CurrStateNo>=51">
          <el-input value="applyList.MNotAllowInfo" v-model="applyList.MNotAllowInfo"></el-input>
        </el-form-item>


        <el-form-item label="展示在首页宫格" v-if="applyList.CurrStateNo>=51">
          <el-switch
            v-model="applyList.RIsShowHome">
          </el-switch>
        </el-form-item>
        <el-form-item label="可搜索" v-if="applyList.CurrStateNo>=51">
          <el-switch
            v-model="applyList.RIsSearch">
          </el-switch>
        </el-form-item>

        <div class="seletitem seletitem3" v-if="applyList.CurrStateNo>=51">
          <span>申请入口</span>

            <el-radio v-for="(entry,index) in entrys" :key="index" v-model="MEntryType1"
                      :label="entry.ShowName">{{entry.ShowName}}
            </el-radio>

        </div>
        <el-form-item label="分类标签" v-if="applyList.CurrStateNo>=51">
          <el-input value="applyList.MTags" v-model="applyList.MTags"></el-input>

        </el-form-item>
        <el-form-item label="正式商户号" v-if="applyList.CurrStateNo>=52">
          <el-input value="applyList.RMerchantNo" v-model="applyList.RMerchantNo"></el-input>

        </el-form-item>
        <el-form-item label="正式商户秘钥" v-if="applyList.CurrStateNo>=52">
          <el-input value="applyList.RMerchantPw" v-model="applyList.RMerchantPw"></el-input>

        </el-form-item>
      </el-form>
      <div class="buttonList">
        <el-button type="primary" plain @click="submitapply">保存</el-button>
        <el-button class="cancelbutton" type="info" @click="closeChange">取消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        value: "",
        options: ['行内商户', '行外商户', '行外+手机号'],
        applyList: {},
        checkForm:[],
        MIsNetcomPayment:false,
        STopbar:false,
        MCallInterface:[],
        entrys:[],
        MEntryType1:'',
        formData:false,
        entryData:false,
        contentHeight1:'',
      }
    },
    props: {
      applyListOne: Object,
      contentHeight:Number,
    },
    watch:{
      formData(){
        if(this.applyListOne.CurrStateNo>=21&&this.applyListOne.CurrStateNo<51){
          if(this.formData){
            this.loading = false
          }
        }
        if(this.applyListOne.CurrStateNo>=51){
          if(this.formData&&this.entryData){
            this.loading = false
          }
        }

      },

      contentHeight(){
          this.contentHeight1 = this.contentHeight*0.97-15

        },

      entryData(){
        if(this.applyListOne.CurrStateNo>=51){
          if(this.formData&&this.entryData){
            this.loading = false
          }
        }
      }
    },
    mounted() {
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      var vm = this
      this.applyList = this.applyListOne
      this.value = this.applyList.PMerchantType

      if(vm.applyList.MCallInterface.trim()){
        vm.MCallInterface = JSON.parse(vm.applyList.MCallInterface)
      }
      if(this.applyList.MIsNetcomPayment){
        this.MIsNetcomPayment = true
      }else {
        this.MIsNetcomPayment = false
      }
      if(this.applyList.STopbar){
        this.STopbar = true
      }else {
        this.STopbar = false
      }
      if(this.applyListOne.CurrStateNo>=21){
        this.loading = true
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
            vm.checkForm = data
            vm.formData = true

          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      }
      if(this.applyListOne.CurrStateNo>=51){

        $.ajax({
          url: vm.User.baseUrl + "/api/params?id=" + 2001,
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
            vm.entrys = data
            if(vm.applyList.MApplyEntryType){
              var i = vm.applyList.MApplyEntryType - 1
              vm.MEntryType1 = vm.entrys[i].ShowName
            }
            vm.entryData = true
            //RealValue  bianhao
            //ShowName  mingzi
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      }
      this.contentHeight1 = this.contentHeight*0.97-15

    },
    methods: {
      closeChange() {
        this.$emit('closeChangeInfo')
      },

      submitapply() {
        this.loading = true
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        if(this.MIsNetcomPayment){
          this.applyList.MIsNetcomPayment = 1
        }else{
          this.applyList.MIsNetcomPayment = 0
        }
        if(this.STopbar){
          this.applyList.STopbar = 1
        }else{
          this.applyList.STopbar = 0
        }
        if(this.applyList.MIsAllowAllBank){
          this.applyList.MIsAllowAllBank = 1
        }else{
          this.applyList.MIsAllowAllBank = 0
        }
        if(this.applyList.RIsShowHome){
          this.applyList.RIsShowHome = 1
        }else{
          this.applyList.RIsShowHome = 0
        }
        if(this.applyList.RIsSearch){
          this.applyList.RIsSearch = 1
        }else{
          this.applyList.RIsSearch = 0
        }

        for(var i=0;i<vm.entrys.length;i++){
          if(vm.entrys[i].ShowName==vm.MEntryType1){
            vm.applyList.MApplyEntryType = i + 1
          }
        }
        this.applyList.IsAdminUpdate = true
        vm.applyList.MCallInterface = JSON.stringify(vm.MCallInterface)
        var formData = new FormData()
        formData.append("MiniProgram", JSON.stringify(this.applyList))
        $.ajax({
          url: vm.User.baseUrl + "/api/miniprogram",
          type: 'PUT',
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
            vm.loading = false
            var h = vm.$createElement;
            vm.$notify({
              title: '操作提醒',
              message: h('i', {style: 'color: teal'}, '保存成功')
            });
            vm.$emit('changeManager', result.Data)
            vm.$emit('closeChangeInfo')
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
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
    width: 1130px;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #fff;
    overflow: hidden;
  }
  .mspan{
    line-height: 61;
    font-size: 20px;
    cursor: pointer;
  }
  .mhead {
    background-color: #f8f8f8;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    vertical-align: middle;
    font-size: 20px;
    color: #101010;
  }
.tableWrap{
  margin-top: 60px;
  width: 100%;
  overflow-y: auto;
}
  .middle_list .tips {
    text-align: left;
    width: 300px;
    margin-top: 3px;
    line-height: 14px;
    color: #aeb3bd;
    font-size: 12px;
  }
  .seletitem {
    width: 390px;
    padding-left: 110px;
    margin: 20px 35px 20px 0;
    display: inline-block;
    text-align: left;
  }

  .seletitem span {
    color: rgba(16, 16, 16, 0.8);
    font-size: 14px;
  }
  .seletitem3{
    width: 700px;
    display: block;
  }
  .seletitem3 span{
    margin-right: 13px;
  }
  .el-input {
    width: 300px;
  }
  .el-form-item {
    text-align: left;
    width: 500px;
    margin: 0 20px 15px 20px;
    display: inline-block;
    vertical-align: top;
  }

  .forms {
    text-align: left;
  }
  .el-select {
    width: 300px;
  }
  .checkList {
    display: inline-block;
  }
  .el-textarea {
    display: inline-block;
    width: 300px;
  }

  .el-select {
    margin-right: 562px;
  }
.el-form{
  margin-top: 30px;
}
  .el-button {
    width: 112px;
  }
.buttonList{
  margin: 30px auto;
}
</style>
<style>
  .el-form-item__label {
    color: rgba(16, 16, 16, 0.8);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }

</style>
