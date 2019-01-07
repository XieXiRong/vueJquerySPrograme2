<template>
  <div class="middle_list">
    <div class="mhead">
      <span @click="goback" class="mspan"><</span>
      <span>小程序详情</span>
      <!--<i class="iconfont icon-fanhui1" ></i>-->
    </div>
    <div class="wrap" :style="{'height':contentHeight1+'px'}">
      <div class="head_detail">
        <div class="detail_logo">
          <img :src="MPAttachments[showoneData.Id]&&MPAttachments[showoneData.Id].icon?User.baseUrl+MPAttachments[showoneData.Id].icon.RealValue:'../../static/images/Image1.png'" alt="">
        </div>
        <div class="detail_des">
          <div class="name">
            <span>{{showoneData.PApplyFullName}} ({{showoneData.PApplyFirstName}})</span>
            <span class="state"
                  :class="{'stateok':showoneData.CurrStateNo==12||showoneData.CurrStateNo==24||showoneData.CurrStateNo==32||showoneData.CurrStateNo==42||showoneData.CurrStateNo==52,
             'statenotok':showoneData.CurrStateNo%10==3,'stateing':showoneData.CurrStateNo==22||showoneData.CurrStateNo==54}">{{showoneData.CurrStateName}}</span>
          </div>
          <div class="bankname">
            <span>{{showoneData.PUserBranch}}</span>
            <span>{{showoneData.PMerchantType}}</span>
          </div>
          <div class="des">
            <p>{{showoneData.PDesc}}</p>
            <div class="info" v-if="info2&&info2.trim()">
              <span>修改说明:</span> <span v-html="info2"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="action">

        <el-row>
          <el-button type="primary" v-if="fromHelp&&fromRes" @click="helpApply">协助审核</el-button>
          <el-button type="primary" v-html="actionname"
                     v-if="leftbutton&&!fromHelp&&showoneData.CurrStateNo%10==2&&showoneData.CurrStateNo!=22||showoneData.CurrStateNo==24"
                     @click="nextapply()"></el-button>
          <el-button type="primary" v-if="showoneData.CurrStateNo%10==3&&!fromHelp" @click="reApply">重新提交</el-button>
        </el-row>
      </div>

      <DetailList :showSrManagerInfo="showoneData" :showDetail="showDetail" :MPAttachments="MPAttachments"/>

      <Progress :showoneData="showoneData"/>
    </div>
    <ResendTo v-if="showHelp" :showHelp="showHelp" :showSrManagerInfo="showoneData" @hideHelpButton="hideHelpButton"
              @closeHelpApply="closeHelpApply"/>
  </div>
</template>

<script>
  import ResendTo from './ResendTo'
  import DetailList from './DetailList'
  import Progress from './Progress'

  export default {
    data() {
      return {
        showDetail: true,
        leftbutton: false,
        actionname: '',
        showHelp: false,
        helpList: [],
        fromRes: true,
        fromReply: false,
        reApply1: false,
        info2: '',
        contentHeight1:'',
      }
    },
    props: {
      showoneData: Object,
      showone: Boolean,
      fromHelp: Boolean,
      MPAttachments: Object,
      AssistMPList: Array,
      contentHeight:Number,
    },
    components: {
      ResendTo: ResendTo,
      DetailList: DetailList,
      Progress: Progress,
    },
    updated() {
      if (this.showoneData.CurrStateNo == 11 || this.showoneData.CurrStateNo == 12 || this.showoneData.CurrStateNo == 13) {
        this.info2 = this.showoneData.PChangeInfo
      } else if (this.showoneData.CurrStateNo == 21 || this.showoneData.CurrStateNo == 22 || this.showoneData.CurrStateNo == 23 || this.showoneData.CurrStateNo == 24) {
        this.info2 = this.showoneData.MChangeInfo
      } else if (this.showoneData.CurrStateNo == 31 || this.showoneData.CurrStateNo == 32 || this.showoneData.CurrStateNo == 33) {
        this.info2 = this.showoneData.SChangInfo
      } else if (this.showoneData.CurrStateNo == 41 || this.showoneData.CurrStateNo == 42 || this.showoneData.CurrStateNo == 43) {
        this.info2 = this.showoneData.TChangeInfo
      } else if (this.showoneData.CurrStateNo == 51 || this.showoneData.CurrStateNo == 52 || this.showoneData.CurrStateNo == 53 || this.showoneData.CurrStateNo == 54) {
        this.info2 = this.showoneData.RChangeInfo
      }
    },
    computed:{

    },
    mounted() {
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
//当前状态No；状态：11为立项申请中，12为立项通过/13为立项不通过，
      // 21为商户号申请中，22为商户号已颁发/23为商户号被拒绝，31为方案审核中，
      // 32为方案通过/33为方案不通过，41为测试申请中，42为测试通过/43为测试不通过，51为上线申请中，
      // 52为已上线/53为上线被拒绝
      if (this.showoneData.CurrStateNo == 11 || this.showoneData.CurrStateNo == 12 || this.showoneData.CurrStateNo == 13) {
        this.info2 = this.showoneData.PChangeInfo
      } else if (this.showoneData.CurrStateNo == 21 || this.showoneData.CurrStateNo == 22 || this.showoneData.CurrStateNo == 23 || this.showoneData.CurrStateNo == 24) {
        this.info2 = this.showoneData.MChangeInfo
      } else if (this.showoneData.CurrStateNo == 31 || this.showoneData.CurrStateNo == 32 || this.showoneData.CurrStateNo == 33) {
        this.info2 = this.showoneData.SChangInfo
      } else if (this.showoneData.CurrStateNo == 41 || this.showoneData.CurrStateNo == 42 || this.showoneData.CurrStateNo == 43) {
        this.info2 = this.showoneData.TChangeInfo
      } else if (this.showoneData.CurrStateNo == 51 || this.showoneData.CurrStateNo == 52 || this.showoneData.CurrStateNo == 53 || this.showoneData.CurrStateNo == 54) {
        this.info2 = this.showoneData.RChangeInfo
      }

      if (this.showoneData.CurrStateNo == 12) {
        this.leftbutton = true
        this.actionname = '申请商户号'
      } else if (this.showoneData.CurrStateNo == 24) {
        this.leftbutton = true
        this.actionname = '提交方案'
      } else if (this.showoneData.CurrStateNo == 32) {
        this.leftbutton = true
        this.actionname = '提交测试'
      } else if (this.showoneData.CurrStateNo == 42) {
        this.leftbutton = true
        this.actionname = '提交上线'
      }

      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      var vm = this
      //获取审批记录
      $.ajax({
        url: vm.User.baseUrl + "/api/ApprovalRecord",
        type: 'GEt',
        data: {
          MPID: vm.showoneData.Id,
          Type: 'allRecord'
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
        },
        xhrFields: {
          withCredentials: true
        },
        success: function (result) {
          if (result.StateCode) {
            vm.helpList = result.Data
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("协助审批接口调用失败")
        },
        cache: false,
        dataType: 'json'
      });
      this.contentHeight1 = this.contentHeight*0.97-61
    },
    methods: {
      reApply() {
        this.reApply1 = true
        if (this.showoneData.CurrStateNo == 13) {
          this.$emit('applyNew', this.showoneData, this.reApply1)
        } else if (this.showoneData.CurrStateNo == 23) {
          this.$emit('addnewbusiness', this.showoneData, this.reApply1)
        } else if (this.showoneData.CurrStateNo == 33) {
          this.$emit('addApplyplan', this.showoneData, this.reApply1)
        } else if (this.showoneData.CurrStateNo == 43) {
          this.$emit('showTestSubmit', this.showoneData, this.reApply1)
        } else if (this.showoneData.CurrStateNo == 53) {
          this.$emit('openOnlineSubmit', this.showoneData, this.reApply1)
        }
      },
      hideHelpButton(data) {
        this.fromRes = false
        var index
        for (let i = 0; i < this.AssistMPList.length; i++) {
          if (data.Id == this.AssistMPList[i].Id) {
            index = i
          }
        }
        this.$emit('dataHelp', this.fromRes, index)
      },
      closeHelpApply() {
        this.showHelp = false
      },
      helpApply() {
        this.showHelp = true
      },
      goback() {
        this.$emit('closeone', this.showoneData)
      },
      nextapply() {
        if (this.showoneData.CurrStateNo == 12) {
          this.$emit('addnewbusiness', this.showoneData)
        } else if (this.showoneData.CurrStateNo == 24) {
          this.$emit('addApplyplan', this.showoneData)
        } else if (this.showoneData.CurrStateNo == 32) {
          this.$emit('showTestSubmit', this.showoneData)
        } else if (this.showoneData.CurrStateNo == 42) {
          this.$emit('openOnlineSubmit', this.showoneData)
        }

      }
    },
    watch:{
      contentHeight(){
        this.contentHeight1 = this.contentHeight*0.97-61

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

  .icon-fanhui1 {
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

  .mspan {
    line-height: 60;
    font-size: 20px;
    cursor: pointer;
  }

  .wrap {
    overflow-x: hidden;
    width: 100%;
    height: 770px;
    padding-bottom: 30px;
  }

  .el-progress-circle {
    background-color: #009688;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }

  .head_detail {
    width: 90%;
    height: 233px;
    text-align: left;
    color: #101010;
    font-family: SourceHanSansSC-regular;
    position: relative;
    margin: 0 auto;
    margin-top: 50px;
  }

  .action {
    position: relative;
    left: 375px;
    margin: 30px 0;
    text-align: left;
  }

  /*.action .el-button{*/
  /*position: relative;*/
  /*right: 115px;*/
  /*}*/
  .detail_logo {
    float: left;
    height: 100%;
    width: 233px;
    overflow: hidden;
    background-color: white;
  }

  .detail_logo img {
    width: 200px;
    height: 200px;
    margin: auto;
    border-radius: 100%;
  }

  .detail_des {
    margin-left: 90px;
    float: left;
    height: 100%;
    width: 610px;
  }

  .detail_des .name {
    width: 100%;
    height: 40px;
  }

  .detail_des .name span {
    line-height: 40px;
  }

  .detail_des .name span:first-child {
    display: inline-block;
    max-width: 300px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 25px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;

  }

  .name span:nth-child(2) {
    font-size: 18px;
    color: rgba(16, 16, 16, 1);
    font-family: SourceHanSansSC-bold;
    margin-left: 150px;
  }

  .bankname {
    margin-top: 15px;
    width: 100%;
    height: 29px;
  }

  .bankname span {
    color: #2282EF;
    font-size: 18px;
  }

  .bankname span:nth-child(2) {
    margin-left: 25px;
  }

  .des {
    position: absolute;
    top: 80px;
    left: 322px;
    margin-top: 21px;
    width: 610px;
    max-height: 105px;
    padding: 5px 0 10px 0;
  }

  .des::-webkit-scrollbar {
    display: none
  }

  .des p {
    font-size: 16px;
    line-height: 20px;
    word-wrap: break-word
  }

  .detail_des .name .stateok {
    color: green;
  }
  .des .info{
    font-size: 14px;
    margin-top: 10px;
  }
  .detail_des .name .statenotok {
    color: red;
  }

  .wrap_progress {
    width: 100%;
  }

  .progerss {
    width: 100%;
    padding-left: 100px;
    height: 120px;
  }

  .circle {

    color: rgba(16, 16, 16, 1);

    border: 1px solid rgba(187, 187, 187, 1);

    font-size: 16px;
    font-family: Roboto;
    text-align: center;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    float: left;
    margin-right: 28px;
  }

  .icon-zhishi_you {
    float: left;
    line-height: 100px;
    font-size: 30px;
    color: rgba(16, 16, 16, 0.6);
    margin-right: 15px;
  }

  .circle span {
    line-height: 100px;
  }

  .progerss .already {
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #009688;

  }

  .progerss .nowState {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(16, 16, 16, 1);
    border: 3px solid rgba(0, 150, 136, 1);
  }
  .progerss .stateing {
    color: blue;
  }
  .seletitem {
    height: 150px;
    width: 100%;
    text-align: left;
    padding-left: 100px;
    margin: 10px 0;
  }

  .seletitem span {
    margin-right: 35px;
  }

  .record {
    padding: 10px 30px 10px 0;
    width: 737px;
    height: 100px;
  }

  .record div {
    margin-bottom: 5px;
  }

  .record span {
    margin: 0;
    font-size: 16px;
  }

  .record .time {
    margin-right: 15px;
  }

  .record .name {
    margin-right: 28px;
  }

  .record .help {
    margin-right: 5px;
  }
</style>
