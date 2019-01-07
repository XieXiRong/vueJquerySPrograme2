<template>
  <div class="middle_list">
    <div class="mhead">
      <span @click="goback1" class="mspan"><</span>
      <span>小程序详情</span>
      <!--<i class="iconfont icon-fanhui1" @click="goback1"></i>-->
    </div>
    <div class="wrap" :style="{'height':contentHeight1+'px'}" @loading="loading">
      <div class="head_detail">
        <div class="detail_logo">
          <img :src="imgUrl?User.baseUrl+imgUrl.RealValue:'../../static/images/Image1.png'" alt="">
        </div>
        <div class="detail_des">
          <div class="name">
            <span>{{showSrManagerInfo1.PApplyFullName}} ({{showSrManagerInfo1.PApplyFirstName}})</span>
            <span class="state"  :class="{'statenotok':showSrManagerInfo1.CurrStateNo%10==3,'stateok':showSrManagerInfo1.CurrStateNo==12||
                showSrManagerInfo1.CurrStateNo==24||showSrManagerInfo1.CurrStateNo==32||showSrManagerInfo1.CurrStateNo==42||showSrManagerInfo1.CurrStateNo==52,
                'stateing':showSrManagerInfo1.CurrStateNo==22||showSrManagerInfo1.CurrStateNo==54}">{{showSrManagerInfo1.CurrStateName}}</span>
            <span class="onlineNow1" @click="editDetail(showSrManagerInfo)">编辑</span>
            <span class="onlineNow3" v-if="saveOn" @click="saveEditDetail">保存</span>
            <span class="onlineNow3 on4"  @click="deleteOne">删除</span>
          </div>
          <div class="bankname">
            <span>{{showSrManagerInfo1.PUserBranch}}</span>
            <span>{{showSrManagerInfo1.PMerchantType}}</span>
          </div>
          <div class="des">
            <p>{{showSrManagerInfo1.PDesc}}</p>
            <div class="info" v-if="info2&&info2.trim()">
              <span>修改说明:</span> <span v-html="info2"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="action">
        <el-row>
          <el-button type="primary" v-if="managerButton" @click="nextapply1" v-html="showSrManagerInfo1.CurrStateNo==54?'批准上线':'同意申请'"></el-button>
          <el-button type="danger" v-if="managerButton&&showSrManagerInfo1.CurrStateNo!=54" @click="nextapply2">拒绝申请</el-button>
          <el-button type="danger" v-if="managerButton&&resendButton&&showSrManagerInfo1.CurrStateNo!=54" @click="nextapply3">转发</el-button>
        </el-row>
      </div>
      <DetailList :showSrManagerInfo="showSrManagerInfo1" :showDetail="showDetail1" @saveEditDetail="saveEditDetail" :MPAttachments="MPAttachments"/>
      <Progress :changeInfo="changeInfo" :showoneData="showSrManagerInfo1"/>
    </div>
    <ApplyAgree @changeManager1="changeManager1" @hideAgree="hideAgree" @refreshData v-if="showApplyAgree" :ApplyAgreeTitle="ApplyAgreeTitle" :showSrManagerInfo="showSrManagerInfo1" :type="type" @closeApply="closeApply"/>
    <ResendTo v-if="showResend" @hideButton="hideButton" @closeResend="closeResend" :showSrManagerInfo="showSrManagerInfo1"/>
  </div>
</template>
<script>
  import ApplyAgree from './ApplyAgree'
  import ResendTo from './ResendTo'
  import DetailList from './DetailList'
  import Progress from './Progress'
  export default {
    data(){
      return{
        showDetail:true,
        managerButton:false,
        showButton:false,
        onlineNow:false,
        showApplyAgree:false,
        ApplyAgreeTitle:'',
        showResend:false,
        showDetail1:true,
        type:'',
        imgUrl:'',
        resendButton:true,
        infos:{},
        saveOn:false,
        loading:false,
        info2:'',
        changeInfo:false,
        showSrManagerInfo1:this.showSrManagerInfo,
        contentHeight1:"",
      }
    },
    props:{
      showSrManagerInfo:Object,
      MPAttachments:Object,
      AssistMPList:Array,
      contentHeight:Number,
    },
    computed:{

    },
    components:{
      ApplyAgree:ApplyAgree,
      ResendTo:ResendTo,
      DetailList:DetailList,
      Progress:Progress,
    },
    mounted(){
      if(this.showSrManagerInfo1.CurrStateNo==11||this.showSrManagerInfo1.CurrStateNo==12||this.showSrManagerInfo1.CurrStateNo==13){
        this.info2 = this.showSrManagerInfo1.PChangeInfo
      }else if(this.showSrManagerInfo1.CurrStateNo==21||this.showSrManagerInfo1.CurrStateNo==22||this.showSrManagerInfo1.CurrStateNo==23||this.showSrManagerInfo1.CurrStateNo==24){
        this.info2 = this.showSrManagerInfo1.MChangeInfo
      }else if(this.showSrManagerInfo1.CurrStateNo==31||this.showSrManagerInfo1.CurrStateNo==32||this.showSrManagerInfo1.CurrStateNo==33){
        this.info2 = this.showSrManagerInfo1.SChangInfo
      }else if(this.showSrManagerInfo1.CurrStateNo==41||this.showSrManagerInfo1.CurrStateNo==42||this.showSrManagerInfo1.CurrStateNo==43){
        this.info2 = this.showSrManagerInfo1.TChangeInfo
      }else if(this.showSrManagerInfo1.CurrStateNo==51||this.showSrManagerInfo1.CurrStateNo==52||this.showSrManagerInfo1.CurrStateNo==53||this.showSrManagerInfo1.CurrStateNo==54){
        this.info2 = this.showSrManagerInfo1.RChangeInfo
      }


      if(this.showSrManagerInfo1.CurrStateNo==11||this.showSrManagerInfo1.CurrStateNo==21||this.showSrManagerInfo1.CurrStateNo==31||this.showSrManagerInfo1.CurrStateNo==41){
        this.managerButton = true
      }
      if(this.showSrManagerInfo1.CurrStateNo==11){
        this.ApplyAgreeTitle = '立项申请'
      }
      if(this.showSrManagerInfo1.CurrStateNo==21){
        this.ApplyAgreeTitle = '商户号申请'
      }
      if(this.showSrManagerInfo1.CurrStateNo==31){
        this.ApplyAgreeTitle = '方案审核'
      }
      if(this.showSrManagerInfo1.CurrStateNo==41){
        this.ApplyAgreeTitle = '测试验收'
      }
      if(this.showSrManagerInfo1.CurrStateNo==54){
        this.ApplyAgreeTitle = '上线确认'
        this.onlineNow = true
        this.managerButton = true
      }
      if(this.showSrManagerInfo1.CurrStateNo==51){
        this.ApplyAgreeTitle = '生成正式商户号'
        this.managerButton = true
      }
      if(this.showSrManagerInfo1.CurrStateNo==52){
        this.managerButton = false
      }
      this.imgUrl = ''
      for (var key in this.MPAttachments) {
        if (this.showSrManagerInfo1.Id == key) {
          this.imgUrl = this.MPAttachments[key].icon
        }
      }
      for(var i = 0;i<this.AssistMPList.length;i++){
        if(this.AssistMPList[i].Id==this.showSrManagerInfo1.Id){
          this.resendButton = false
        }
      }
      this.contentHeight1 = this.contentHeight*0.97-61

    },
    methods:{
      deleteOne(){
        var vm =this
        this.$confirm('此操作将删除该小程序, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.deleteOneAjax()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteOneAjax(){
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var formData = new FormData()
        // formData.append("MiniProgram", JSON.stringify(this.showSrManagerInfo1.Id))
        $.ajax({
          url: vm.User.baseUrl + "/api/miniprogram?isDelMPItem=true&MPID="+vm.showSrManagerInfo1.Id,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          success: function (result) {
            console.log(result)
            vm.$message({
              type: 'success',
              message: '删除成功!'
            });
            vm.goback1()
            vm.$emit('deleteOne',vm.showSrManagerInfo1)
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      changeManager1(data){
        console.log(data);
        this.showSrManagerInfo1 = data
      },
      hideButton(){
        this.resendButton = false
        this.changeInfo = true
      },
      hideAgree(data){
        this.managerButton=false
        this.$emit('changeManager',data)
      },
      editDetail(data){
        this.$emit('openChangeInfo',data)
      },
      // editDetail(){
      //   this.showDetail1 = false
      //   this.saveOn = true
      // },
      saveEditDetail(){
        if(!this.showDetail1){
          this.loading = true
          var vm = this
          var CurUser = JSON.parse(localStorage.getItem("CurUser"));
          this.showSrManagerInfo1.IsAdminUpdate = true
          var formData = new FormData()
          formData.append("MiniProgram", JSON.stringify(this.showSrManagerInfo1))
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
                message: h('i', { style: 'color: teal'}, '保存成功')
              });
              vm.$emit('changeManager',result.Data)

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            cache: false,
            dataType: 'json'
          });

        }

        this.showDetail1 = true
        //将修改后的数据即现在的数据
        //this.showSrManagerInfo1
      },
      goback1(){
        this.$emit('closeSrManager')
      },
      closeApply(){
        this.showApplyAgree = false
      },
      nextapply1(){
        this.type = 'agree'
        this.showApplyAgree = true
      },
      nextapply2(){
        this.type = 'reject'
        this.showApplyAgree = true
      },
      nextapply3(){
        this.showResend=true
      },
      closeResend(){
        this.showResend=false
      },
    },
    watch:{
      contentHeight(){
        this.contentHeight1 = this.contentHeight*0.97-61
      },
      showSrManagerInfo1(){
        if(this.showSrManagerInfo1.CurrStateNo==54){
          this.ApplyAgreeTitle = '上线确认'
          this.onlineNow = true
          this.managerButton = true
        }
      }
    },



  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .middle_list {
    top: 0;
    right: 0;
    position: absolute;
    height: 820px;
    width: 1130px;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #fff;
    overflow: hidden;
  }

  .icon-fanhui1{
    font-size: 34px;
    position: absolute;
    right: 50px;
    line-height: 80px;
    color: #101010;
  }
  .mhead {
    background-color: #f8f8f8;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }
  .wrap{
    overflow-x: hidden;
    width: 100%;
    padding-bottom: 30px;
    overflow-y: scroll;
  }
.head_detail{
  width: 90%;
  height: 200px;
  text-align: left;
  color: #101010;
  font-family: SourceHanSansSC-regular;
  position: relative;
  margin: 0 auto;
  margin-top: 50px;
}
.action{
  position: relative;
  left: 375px;
  margin: 30px 0;
  text-align: left;
}
  /*.action .el-button{*/
    /*position: relative;*/
    /*right: 115px;*/
/*}*/
  .detail_logo{
    float: left;
    height: 100%;
    width: 233px;
    overflow: hidden;
    background-color: white;
    border-radius: 4px;
  }
  .detail_logo img{
    width: 200px;
    height: 200px;
    border-radius: 100%;
    margin: auto;
  }
.detail_des{
  margin-left: 90px;
  float: left;
  width: 610px;
  height: 100%;
}
  .detail_des .name{
    width: 100%;
    height: 40px;
  }
  .detail_des .name span{
    line-height: 40px;
  }
  .detail_des .name span:first-child{
    display: inline-block;
    max-width: 300px;
    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 25px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;
  }
  .name span:nth-child(2){
    font-size: 18px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;
    margin-left: 60px;
  }
  .bankname{
    margin-top: 15px;
    width: 100%;
    height: 29px;
  }
  .bankname span{
    color: #2282EF;
    font-size: 18px;
  }
  .des{
    position: absolute;
    top: 80px;
    left: 322px;
    margin-top: 21px;
    width: 610px;
    max-height: 105px;
    padding: 5px 0 10px 0;
  }
  .des::-webkit-scrollbar {
    display:none
  }
  .des p{
    font-size: 16px;
    line-height: 20px;
    word-wrap : break-word
  }
  .des .info{
    font-size: 14px;
    margin-top: 10px;
  }
  .detail_content{
    text-align: left;
    clear: both;
    width: 90%;
    margin: 40px auto;
  }
  .mspan{
    line-height: 60;
    font-size: 20px;
    cursor: pointer;
  }
  .businessname{
    width: 170px;
    display: inline-block;
    margin: 10px 20px 25px 45px;
  }
  .businessname p:first-child{

    font-size: 22px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;
  }
  .businessname p:nth-child(2){
    margin-top: 10px;
    font-size: 20px;
    color: rgba(16, 16, 16, 0.6);
    font-family: SourceHanSansSC-regular;
  }
  .detail_des .name .stateok{
    color: #259B24;
  }
  .detail_des .name .statenotok{
    color: red;
  }
  .el-button{
    margin: 0 5px;
  }
  .onlineNow1{
    margin-left: 70px;
    margin-right: 10px;
    cursor: pointer;
    color: blue;
  }
  .onlineNow3{
    cursor: pointer;
    color: blue;
    margin-right: 25px;
  }
  .on4{
    color: #f56c6c;
    margin-left: 15px;
  }
  .onlineNow{
    cursor: pointer;
    color: red;
  }
  .stateing {
    color: blue;
  }
  .bankname span:nth-child(2){
    margin-left: 25px;
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
