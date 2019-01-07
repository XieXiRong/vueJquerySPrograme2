<template>
  <div class="middle_list">
    <div class="list_wrap">
      <div class="mhead">
        <span>转发</span>
        <i class="iconfont icon-icon-" @click="closeResendTo"></i>
      </div>
      <div class="seletitem">
        <div class="record">
          <div><span class="time">2018/11/22</span><span class="name">张飞</span><span class="help">【求助】</span><span>这个功能点能用一网通支付实现吗</span></div>
        </div>
      </div>
      <div class="seletitem">
        <span>协助审核人</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="seletitem">
        <span>求助问题</span>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入审批意见"
          v-model="resendTextarea">
        </el-input>
      </div>
      <el-row>
        <el-button type="primary">提交</el-button>
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
        options:['韩信','张飞','赵云','刘备','关羽'],
        value:''
      }
    },
    props:{
      ApplyAgreeTitle:String
    },
    methods:{
      closeResendTo(){
        this.$emit('closeResend')
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
  .el-checkbox-group{
    vertical-align: top;
    margin-left: 20px;
  }
  .seletitem2{
    width: 100%;
    text-align: left;
  }
  .list_wrap{
    margin:100px auto;
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
    line-height: 80px;
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

  .seletitem{
    width: 100%;
    text-align: left;

  }

  .seletitem span{
    margin-right: 35px;
  }
  .sele2{
    margin: auto;
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
