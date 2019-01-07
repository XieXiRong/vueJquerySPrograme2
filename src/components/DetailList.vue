<template>
  <div class="detail_content">
    <div class="businessname">
      <p>商户名</p>
      <p v-if="showDetail">{{showSrManagerInfo.PMerchantName}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.PMerchantName" size="small"
                v-model="showSrManagerInfo.PMerchantName"></el-input>
    </div>
    <div class="businessname">
      <p>开发分行或机构</p>
      <p v-if="showDetail">{{showSrManagerInfo.PBranchName}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.PBranchName" size="small"
                v-model="showSrManagerInfo.PBranchName"></el-input>
    </div>
    <div class="businessname">
      <p>商户类别</p>
      <p v-if="showDetail">{{showSrManagerInfo.PMerchantType}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.PMerchantType" size="small"
                v-model="showSrManagerInfo.PMerchantType"></el-input>
    </div>
    <div class="businessname">
      <p>申请人分行或机构</p>
      <p v-if="showDetail">{{showSrManagerInfo.PUserName}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.PUserName" size="small"
                v-model="showSrManagerInfo.PUserName"></el-input>
    </div>
    <div class="attwrap">
      <div class="businessname1">
        <p>申请人分行</p>
        <p v-if="showDetail">{{showSrManagerInfo.PUserBranch}}</p>
        <el-input v-if="!showDetail" value="showSrManagerInfo.PUserBranch" size="small"
                  v-model="showSrManagerInfo.PUserBranch"></el-input>
      </div>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.PUserNo">
      <p>申请人ID</p>
      <p v-if="showDetail">{{showSrManagerInfo.PUserNo}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.PUserNo" size="small"
                v-model="showSrManagerInfo.PUserNo"></el-input>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=21">
      <p>测试地址</p>
      <p v-if="showDetail">{{showSrManagerInfo.MTestUrl}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.MTestUrl" size="small"
                v-model="showSrManagerInfo.MTestUrl"></el-input>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=21">
      <p>一网通支付</p>
      <p v-html="showSrManagerInfo.MIsNetcomPayment==1?'是':'否'"></p>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=21">
      <p>默认topbar</p>
      <p v-html="showSrManagerInfo.STopbar==1?'是':'否'"></p>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=21">
      <p>调用接口</p>
      <p>{{showSrManagerInfo.MCallInterface}}</p>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>22">
      <p>测试商户号</p>
      <p v-if="showDetail">{{showSrManagerInfo.TTestMerchantNo}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.TTestMerchantNo" size="small"
                v-model="showSrManagerInfo.TTestMerchantNo"></el-input>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>22">
      <p>测试商户秘钥</p>
      <p v-if="showDetail">{{showSrManagerInfo.TTestMerchantPw}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.TTestMerchantPw" size="small"
                v-model="showSrManagerInfo.TTestMerchantPw"></el-input>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=31">
      <p>功能点说明</p>
      <p>{{showSrManagerInfo.SDesc}}</p>
    </div>
    <div class="attwrap">
      <div class="businessname1" v-if="showSrManagerInfo.CurrStateNo>=31">
        <p>方案附件</p>
        <p class="fujian"><a target="_blank" v-for="(item,index) in downloadName" :key="index" :href="User.baseUrl+downloadUrl[index]" :download="item">{{item}}</a></p>
      </div>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=41">
      <p>演示地址</p>
      <p v-if="showDetail">{{showSrManagerInfo.TDemoUrl}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.TDemoUrl" size="small"
                v-model="showSrManagerInfo.TDemoUrl"></el-input>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=41">
      <p>测试账号</p>
      <p v-if="showDetail">{{showSrManagerInfo.TTestAccount}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.TTestAccount" size="small"
                v-model="showSrManagerInfo.TTestAccount"></el-input>
    </div>

    <div class="attwrap">
      <div class="businessname1" v-if="showSrManagerInfo.CurrStateNo>=41">
        <p>测试用例</p>
        <p class="fujian"><a target="_blank" v-for="(item1,index) in testCasesName" :key="index" :href="User.baseUrl+testCases[index]" :download="item1">{{item1}}</a></p>
      </div>
    </div>
    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=51">
      <p>申请入口</p>
      <p v-if="showDetail">{{entry}}</p>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=51">
      <p>可被搜索</p>
      <p v-html="showSrManagerInfo.RIsSearch==1?'可搜索':'不可搜索'"></p>
    </div>


    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=51">
      <p>全行通用</p>
      <p v-html="showSrManagerInfo.MIsAllowAllBank==1?'是':'否'"></p>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=51">
      <p>首页宫格展示</p>
      <p v-html="showSrManagerInfo.RIsShowHome==1?'展示':'不展示'"></p>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=51">
      <p>分类标签</p>
      <p>{{showSrManagerInfo.MTags}}</p>
    </div>

    <div class="businessname" v-if="showSrManagerInfo.CurrStateNo>=51">
      <p>生产地址</p>
      <p v-if="showDetail">{{showSrManagerInfo.RApplyHome}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.RApplyHome" size="small"
                v-model="showSrManagerInfo.RApplyHome"></el-input>
    </div>
    <div class="businessname" v-if="showBusiness1">
      <p>正式商户号</p>
      <p v-if="showDetail">{{showSrManagerInfo.RMerchantNo}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.RMerchantNo" size="small"
                v-model="showSrManagerInfo.RMerchantNo"></el-input>
    </div>
    <div class="businessname" v-if="showBusiness1">
      <p>正式商户秘钥</p>
      <p v-if="showDetail">{{showSrManagerInfo.RMerchantPw}}</p>
      <el-input v-if="!showDetail" value="showSrManagerInfo.RMerchantPw" size="small"
                v-model="showSrManagerInfo.RMerchantPw"></el-input>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          PApplyFullName: '',
        },
        entry: '',
        imgUrl:'',
        downloadUrl:[],
        downloadName:[],
        testCases:[],
        testCasesName:[],
        showBusiness1:false,
        entrys:[],
      }
    },
    props: {
      showSrManagerInfo: Object,
      showDetail: Boolean,
      MPAttachments: Object,
    },
    watch: {
      showSrManagerInfo(val){
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        if(CurUser.ROLETYPE==0){
          if(this.showSrManagerInfo.CurrStateNo==52){
            this.showBusiness1 = true
          }else{
            this.showBusiness1 = false
          }
        }else if(CurUser.ROLETYPE==1){
          if(this.showSrManagerInfo.CurrStateNo==52||this.showSrManagerInfo.CurrStateNo==54){
            this.showBusiness1 = true
          }else{
            this.showBusiness1 = false
          }
        }
        if(this.showSrManagerInfo.CurrStateNo==51){
          for (var j = 0; j < vm.entrys.length; j++) {
            if (vm.showSrManagerInfo.MApplyEntryType == vm.entrys[j].RealValue) {
              vm.entry = vm.entrys[j].ShowName
            }
          }
        }
      }
    },
    computed: {

    },
    methods: {

    },

    mounted() {
      var vm = this
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      if(CurUser.ROLETYPE==0){
        if(this.showSrManagerInfo.CurrStateNo==52){
          this.showBusiness1 = true
        }else{
          this.showBusiness1 = false
        }
      }else if(CurUser.ROLETYPE==1){
        if(this.showSrManagerInfo.CurrStateNo==52||this.showSrManagerInfo.CurrStateNo==54){
          this.showBusiness1 = true
        }else{
          this.showBusiness1 = false
        }
      }
      //获取入口选项
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
           vm.entrys = data
          for (var j = 0; j < vm.entrys.length; j++) {
            if (vm.showSrManagerInfo.MApplyEntryType == vm.entrys[j].RealValue) {
              vm.entry = vm.entrys[j].ShowName
            }
          }
          // this.showSrManagerInfo.MCallInterface = JSON.parse(this.showSrManagerInfo.MCallInterface)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("err")
        },
        cache: false,
        dataType: 'json'
      });
      if(this.showSrManagerInfo.CurrStateNo>=31){
        this.imgUrl = ''
        this.downloadUrl = []
        this.downloadName = []
        for (var key in this.MPAttachments) {
          if (this.showSrManagerInfo.Id == key) {
            if(this.MPAttachments[key].icon){
              this.imgUrl = this.MPAttachments[key].icon.RealValue
            }
            for(var i=0;i<this.MPAttachments[key].schemaAttachments.length;i++){
              this.downloadUrl = this.downloadUrl.concat(this.MPAttachments[key].schemaAttachments[i].RealValue)
              this.downloadName = this.downloadName.concat(this.MPAttachments[key].schemaAttachments[i].ShowName)
            }
          }
        }
      }
      if(this.showSrManagerInfo.CurrStateNo>=41){
        this.testCases = []
        this.testCasesName = []
        for (var key in this.MPAttachments) {
          if (this.showSrManagerInfo.Id == key) {
            for(var i=0;i<this.MPAttachments[key].testCases.length;i++){
              this.testCases = this.testCases.concat(this.MPAttachments[key].testCases[i].RealValue)
              this.testCasesName = this.testCasesName.concat(this.MPAttachments[key].testCases[i].ShowName)
            }
          }
        }
      }

      // if(this.showSrManagerInfo.CurrStateNo>=21){
      //   var arr = JSON.parse(this.showSrManagerInfo.MCallInterface)
      //   for(var j=0;j<arr.length;j++){
      //     console.log(arr[j]);
      //   }
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail_content {
    text-align: left;
    clear: both;
    width: 90%;
    margin: 10px auto;
  }
 .attwrap{
   display: inline-block;
   vertical-align: top;
 }
  .attwrap .businessname1{
    display: inline-block;
    width: 180px;
    margin: 5px 20px 30px 40px;
    vertical-align: top;
  }
  .attwrap .businessname1 a{
    display: block;
    margin: 5px 0;
  }
  .businessname1 p:first-child {
    font-size: 22px;
    margin-bottom: 10px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;
  }
  .businessname1 p:nth-child(2){
    font-size: 16px;
    color: rgba(16, 16, 16, 0.6);
    margin: 5px auto;
  }
  .businessname {
    width: 180px;
    height: 90px;
    position: relative;
    display: inline-block;
    margin: 5px 20px 5px 40px;
    overflow: auto;
  }

  .businessname p:first-child {
    font-size: 22px;
    position: absolute;
    top: 0;
    margin-bottom: 10px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;
  }

  .businessname p:nth-child(2) {
    margin-top: 35px;
    font-size: 16px;
    color: rgba(16, 16, 16, 0.6);
    display: inline-block;
    height: 16px;
    width: 100%;
    font-family: SourceHanSansSC-regular;
    position: absolute;
  }

  .detail_des .name .stateok {
    color: #259B24;
  }

  .detail_des .name .statenotok {
    color: red;
  }

  .el-button {
    margin: 0 15px;
  }

  .onlineNow1 {
    margin-left: 100px;
    margin-right: 20px;
    cursor: pointer;
    color: blue;
  }

  .onlineNow {
    cursor: pointer;
    color: red;
  }

  .el-input {
    position: absolute;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    top: 30px;
  }
  .fujian a{
    margin-right: 15px;
    color: blue;
  }
</style>
<style>
  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }
</style>
