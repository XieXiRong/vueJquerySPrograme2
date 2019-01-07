<template>
  <div class="wrap_progress" v-loading="loading">
    <div class="progerss">
      <div class="circle" ref="lixiang"><span>立项申请</span></div>
      <i class="iconfont icon-zhishi_you" ></i>
      <div class="circle" ref="business"><span>商户号申请</span></div>
      <i class="iconfont  icon-zhishi_you" ></i>
      <div class="circle" ref="fangan"><span>方案审核</span></div>
      <i class="iconfont  icon-zhishi_you" ></i>
      <div class="circle" ref="test"><span>测试验收</span></div>
      <i class="iconfont  icon-zhishi_you" ></i>
      <div class="circle" ref="online"><span>发布上线</span></div>
    </div>
    <div class="seletitem">
      <div class="record">
        <div v-for="(item,index) in helpList" class="itemSpan" :key="index">
          <span class="time">{{new Date(item.CreateDate).Format("yyyy-MM-dd hh:mm")}}</span>
          <span class="name">{{item.Name}}</span>
          <span class="help">【{{item.Operation}}】</span>
          <span>{{item.Message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        helpList:[],
        loading:false
      }
    },
    props:{
      showoneData:Object,
      changeInfo:Boolean,
    },
    watch:{
      showoneData(){
        this.dataShow()
      },
      changeInfo(){
        this.getdata()
      }
    },
    methods:{
      dataShow(){
        //当前状态No；状态：11为立项申请中，12为立项通过/13为立项不通过，
        // 21为商户号申请中，22为商户号已颁发/23为商户号被拒绝，31为方案审核中，
        // 32为方案通过/33为方案不通过，41为测试申请中，42为测试通过/43为测试不通过，51为上线申请中，
        // 52为已上线/53为上线被拒绝
        //协助审核进度条样式
        if(this.showoneData.CurrStateNo==11||this.showoneData.CurrStateNo==13){
          this.$refs.lixiang.className='nowState'
        }else if(this.showoneData.CurrStateNo==12){
          this.$refs.lixiang.className='already'
        } else if(this.showoneData.CurrStateNo==21||this.showoneData.CurrStateNo==23||this.showoneData.CurrStateNo==22){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='nowState'
        }else if(this.showoneData.CurrStateNo==24){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
        }else if(this.showoneData.CurrStateNo==31||this.showoneData.CurrStateNo==33){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
          this.$refs.fangan.className='nowState'
        }else if(this.showoneData.CurrStateNo==32){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
          this.$refs.fangan.className='already'
        }else if(this.showoneData.CurrStateNo==41||this.showoneData.CurrStateNo==43){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
          this.$refs.fangan.className='already'
          this.$refs.test.className='nowState'
        } else if(this.showoneData.CurrStateNo==42){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
          this.$refs.fangan.className='already'
          this.$refs.test.className='already'
        } else if(this.showoneData.CurrStateNo==51||this.showoneData.CurrStateNo==54||this.showoneData.CurrStateNo==53){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
          this.$refs.fangan.className='already'
          this.$refs.test.className='already'
          this.$refs.online.className='nowState'
        }else if(this.showoneData.CurrStateNo==52){
          this.$refs.lixiang.className='already'
          this.$refs.business.className='already'
          this.$refs.fangan.className='already'
          this.$refs.test.className='already'
          this.$refs.online.className='already'
        }
       this.getdata()
      },
      getdata(){
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var vm =this
        vm.loading = true
        //获取审批记录
        $.ajax({
          url: vm.User.baseUrl +"/api/ApprovalRecord",
          type: 'GEt',
          data:{
            MPID:vm.showoneData.Id,
            Type:'allRecord'
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          success: function (result) {
            if(result.StateCode){
              console.log(result)
              vm.helpList = result.Data
              vm.loading = false
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("协助审批接口调用失败")
          },
          cache: false,
          dataType: 'json'
        });
      },
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
      this.dataShow()
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap_progress{
    width: 100%;
  }
  .progerss{
    width: 100%;
    padding-left: 100px;
    height: 120px;
  }
  .wrap_progress .progerss div{
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
  .icon-zhishi_you{
    float: left;
    line-height: 100px;
    font-size: 30px;
    color: rgba(16, 16, 16, 0.6);
    margin-right: 15px;
  }
  .wrap_progress .progerss div span{
    line-height: 100px;
  }
  .wrap_progress .progerss .already{
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #009688;

  }
  .wrap_progress .progerss .nowState{
    background-color: rgba(255, 255, 255, 1);
    color: rgba(16, 16, 16, 1);
    border: 3px solid rgba(0, 150, 136, 1);
  }
  .seletitem {
    width: 100%;
    text-align: left;
    padding-left: 100px;
    margin: 10px 0;
  }
  .seletitem span {
    margin-right: 35px;
  }
  .record{
    width: 900px;
  }
  .record div{
    margin: 15px 0;
  }
  .record span{
    margin: 0;
    font-size: 16px;
  }
  .record .time{
    margin-right: 15px;
  }
  .record .name{
    display: inline-block;
    width: 114px;
    margin-right: 28px;
  }
  .record .help{
    margin-right: 5px;
  }
</style>

