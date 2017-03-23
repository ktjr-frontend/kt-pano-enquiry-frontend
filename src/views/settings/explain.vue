<template lang="jade">
  .wx_explain(@touchstart.stop='', :style="explainStyle")
    .wx_explain_content
      .h2 会员说明
      .explain_body
        .explain_body_top
          .explain_title
            i.icon-pano.icon-vip
            span 高级会员
          .explain_content
            h3 什么是高级会员？
            p 可享受PANO的最高级权限，使用网站的全部功能以及全域的数据检索等。全域数据检索是指基于PANO现有收录平台的产品名称、产品期限、年化收益、资产类型、底层资产、交易场所、增信方式等信息进行全站的筛选和搜索服务。
            h3 如何成为高级会员？
            p 已通过名片认证的用户才可申请成为高级会员。具体方式如下：
            .mode
              b 方式一：
              span 邀请同事/同行
            p 邀请一位互金/金融相关的用户注册PANO并通过认证，双方均可获得30天高级用户权限。
            .mode
              b 方式二：
              span 参与PANO用户体验计划
            p 参与开通PANO用户体验计划，即可免费获得至少30天高级用户权限。
            p 用户体验计划是指参与PANO的产品升级计划，可以享受PANO的最高级用户权限，可以第一时间使用PANO的新功能，并在使用一段时间之后反馈体验问卷给PANO工作人员，协助PANO产品升级。
        .explain_body_top
          .explain_title
            i.icon-pano.icon-ok
            span 已认证
          .explain_content
            h3 什么是已认证会员？
            p 注册成功且已完成名片认证的用户，可以访问总览页和市场数据、产品信息，可以对接资产项目，不能进行数据筛选和检索等高级操作。
            h3 如何成为已认证会员？
            p 互金、金融机构、交易所、资产方等相关用户，注册时提交个人名片并通过PANO认证，即可成为认证用户。
        .explain_body_top
          .explain_title
            i.icon-pano.icon-ok
            span 非认证
          .explain_content
            h3 什么是非认证会员？
            p 注册成功但未进行名片认证的用户，只可访问总览页，不能查看市场数据和产品信息，不能对接资产项目。
            h3 如何成为非认证会员？
            p 注册即可成为未认证会员。
        .explain_table
          h2 会员权限表
          table
            thead
              tr.th_color
                th.first_th
                th
                th 非认证用户
                th 认证用户
                th 高级会员
            tbody
              tr
                td(rowspan='6') pc端
                td 首页
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
              tr
                td 总览页
                td
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
              tr
                td 市场数据
                td
                td 部分
                td
                  i.icon-pano.icon-ok2
              tr
                td 产品信息
                td
                td 部分
                td
                  i.icon-pano.icon-ok2
              tr
                td 数据筛选
                td
                td
                td
                  i.icon-pano.icon-ok2
              tr
                td 数据检索
                td
                td
                td
                  i.icon-pano.icon-ok2
              tr
                td(rowspan="4") 移动端
                td 市场报加板
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
              tr
                td 资产方对接互金平台
                td
                td 1个平台/天
                td 不限
              tr
                td 互金平台发布资产需求
                td
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
              tr
                td 资产项目优先推荐
                td
                td
                td
                  i.icon-pano.icon-ok2
              tr
                td(rowspan="4") 增值服务
                td 数据定制化服务
                td
                td
                td
                  i.icon-pano.icon-ok2
              tr
                td 优质的线上公开课
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
              tr
                td 线下活动
                td
                td
                  i.icon-pano.icon-ok2
                td
                  i.icon-pano.icon-ok2
              tr
                td 推荐人脉资源
                td
                td
                td
                  i.icon-pano.icon-ok2

</template>
<script>
export default {
  props: ['subtractHeight'],
  computed: {
    explainStyle() {
      return {
        height: window.innerHeight - this.subtractHeight + 'px'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wx_explain {
  background: #f4f5f9;
  color: #3e4150;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .wx_explain_content {
    // padding: 0 0.402576rem; //50px
    .h2 {
      padding: 0.291031rem 0;
      text-align: center;
      font-size:0.359597rem;
    }
    .explain_body {
      background: #fff;
      border-radius: 0.080515rem;
      padding: 0 0.241546rem; //30px
    }
    .explain_body_top {
      padding: 0.322061rem 0.322061rem 0.322061rem 0;
      border-bottom: 0.04103rem solid #f4f5f9;
    }
    .explain_title {
      background: #437fdf;
      border-radius: 0.080515rem;
      color: #fff;
      padding: 0 0.080515rem;
      display: inline-block;
      font-size: 0.275443rem;
      .icon-vip {
        font-size: 0.275443rem;
      }
    }
    .explain_content {
      padding: 0.161031rem 0 0 0.243494rem;
      h3 {
        padding: 0.080515rem 0;
        position: relative;
        &:before {
          content: '';
          width: 0.096618rem;
          height: 0.096618rem;
          background: #65c7d0;
          border-radius: 50%;
          position: absolute;
          left: -0.181031rem;
          top: 0.271031rem;
        }
      }
      p {
        font-size: 0.2657rem; //33px
        color: #9ea2ad;
      }
      .mode {
        b {
          font-size: 0.305958rem;
          color: #f7a036;
          font-weight: normal;
        }
        span {
          font-size: 0.305958rem; //38px
        }
      }
    }
  }
  .explain_table {
    padding-bottom:30px;
    background: white;
    margin-top: 0.322061rem; //40px
    h2{
      margin-bottom:0.161031rem;//20px
    }
    table {
      table-layout: fixed;
      width: 100%;
      th{
        height: 0.805153rem; //100px
        padding: 0 .5em;
        text-align: center;
        color:#fff;
        font-size:0.269855rem;//36px
      }
    }
    tbody{
      tr:nth-of-type(even){
        background: #f6f9fd;
      }
    }
    .first_th{
      width:1.5em;//80px
    }
    .th_color{
      background: #b1b7c5;
    }
    td {
      height: 0.805153rem; //100px
      border: 1px solid #eff2f7;
      padding: 0 .5em;
      text-align: center;
      color:#80848d;
      font-size:0.227649rem;//32px
      i{
        color:#4480e0;
      }
    }
  }
}
</style>
