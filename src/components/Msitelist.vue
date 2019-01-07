<template>
  <div>
    <div class="middle_list">
      <div class="mhead">
        <span>我的小程序</span>
        <i class="iconfont icon-tianjiatianchong headtianjia" @click="showapplynew"></i>
      </div>
      <div class="mlist" :style="{'height':contentHeight1+'px'}">
        <!--<div v-for="(item,index) in info2" :key="index" @click="showOne(item,index,imgUrlList[index])"-->
        <div v-for="(item,index) in info2" :key="index" @click="showOne(item,index)"
        :class="{'updata':item.IsAdminUpdate==1}">
          <!--:src="imgUrlList[index]?User.baseUrl+imgUrlList[index].RealValue:'../../static/images/Image1.png'"-->
          <img :src="MPAttachments[info2[index].Id]&&MPAttachments[info2[index].Id].icon?User.baseUrl+MPAttachments[info2[index].Id].icon.RealValue:'../../static/images/Image1.png'"
                alt="">
          <p class="mname">{{item.PApplyFullName}}</p>
          <p class="mmessage"
             :class="{'statenotok':item.CurrStateNo%10==3,'stateok':item.CurrStateNo==12||
                item.CurrStateNo==24||item.CurrStateNo==32||item.CurrStateNo==42||item.CurrStateNo==52,
                'stateing':item.CurrStateNo==22||item.CurrStateNo==54}">
            {{item.CurrStateName}}</p>
        </div>
        <div class="madd" @click="showapplynew">
          <i class="iconfont icon-tianjiatianchong"></i>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'

  export default {
    data() {
      return {
        imgUrlList: [],
        idData:[],
        contentHeight1:'',
      }
    },
    props: {
      showapply: Boolean,
      applyaddSuccess: Object,
      MyMPList: Array,
      MPAttachments: Object,
      contentHeight:Number,
    },
    watch:{
      contentHeight(){
        this.contentHeight1 = this.contentHeight*0.97-61
      }
    // MPAttachments:{
      //   handler(val){
      //     this.imgUrlList = []
      //     for (let key in val){
      //       this.idData.push(key)
      //     }
      //     for (let j = 0; j < this.MyMPList.length; j++) {
      //       for (let i=0; i<this.idData.length;i++) {
      //         if (this.MyMPList[j].Id == this.idData[i]) {
      //           this.imgUrlList.push(val[this.idData[i]].icon)
      //         }
      //       }
      //     }
      //   },
      //   deep:true
      // },

    },
    methods: {
      showapplynew() {
        this.$emit('showapplynew')
      },
      showOne(item, index) {
        this.$emit('showOne', item,index)
        if (item.IsAdminUpdate) {
          var vm = this
          var CurUser = JSON.parse(localStorage.getItem("CurUser"));
          var formData = new FormData()
          item.IsAdminUpdate = false
          formData.append("MiniProgram", JSON.stringify(item))
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
              console.log(result)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("err")
            },
            cache: false,
            dataType: 'json'
          });
        }
        Vue.set(this.MyMPList[index], 'IsAdminUpdate', false)
      },

    },

    computed: {
      info2() {
        if (this.applyaddSuccess.PApplyFullName) {
          this.applyaddSuccess.CurrStateName = '立项申请中'
          this.MyMPList.unshift(this.applyaddSuccess)
          return this.MyMPList
        } else {
          return this.MyMPList
        }
      },
    },
    mounted() {
      this.contentHeight1 = this.contentHeight*0.97-61

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
    background-color: #fff;
    overflow: hidden;
  }

  .mhead {
    background-color: #f8f8f8;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
  }
  .mlist {
    width: 100%;
    overflow-y: scroll;
  }

  .mhead span {
    margin-left: 63px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }

  .mlist div {
    margin:50px 0 0 63px;
    display: inline-block;
    float: left;
    width: 200px;
    height: 238px;
    line-height: 20px;
    text-align: center;
    border-radius: 4px;
    border: solid rgba(0, 0, 0, 0.05) 1px;
    cursor: pointer;
    transition: 0.5s;
  }

  .mlist div:hover {
    background-color: #eee;
    box-shadow: 3px 3px 3px #eee;
  }

  .mlist .updata {
    border: 1px solid red;
  }

  .mlist div img {
    margin: 35px 0 10px 0;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }

  .mlist .mname {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 18px;
    color: #101010;
    margin-bottom: 10px;
    font-family: SourceHanSansSC-regular;
  }

  .headtianjia {
    position: absolute;
    right: 60px;
    font-size: 35px;
    cursor: pointer;
    color: #403939;
    line-height: 60px;
  }

  .mlist .mmessage {
    font-size: 16px;
    color: #232323;
    margin-top: 15px;
  }

  .mlist .madd {
    border: 1px dashed rgba(187, 187, 187, 1);
    cursor: pointer;
    margin-bottom: 20px;
  }

  .mlist .madd i {
    font-size: 100px;
    color: rgba(16, 16, 16, 0.44);
    line-height: 238px;
  }
  .middle_list .stateok {
    color: #259B24;
  }

  .middle_list .statenotok {
    color: red;
  }
  .middle_list .stateing {
    color: blue;
  }
</style>

