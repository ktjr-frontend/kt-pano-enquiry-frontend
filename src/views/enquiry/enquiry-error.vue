<template lang="jade">
.enquiry-error
  section.results
    group
      cell.service-introdution
        div(slot='after-title')
          h3
            i.icon-pano.icon-meng
            |             无法发行
          p {{enquiryError}}
          .contact
            ul
              // <li>邮箱：HelloPANO@ktjr.com</li>
              li
                | PANO微信小秘书：
                img.weixin-qrcode(src='../../assets/images/weixin.jpg', alt='weixin小秘书')

</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Spinner from 'vux-components/spinner'
import {
  enquiryError
} from '../../vuex/getters'

export default {
  components: {
    // Flexbox,
    // FlexboxItem,
    Group,
    Cell,
    Spinner
  },
  vuex: {
    getters: {
      enquiryError
    }
  }
}
</script>

<style lang="scss">
.enquiry-error {
  font-size: 0.322061rem; //40px
  margin-top: 0;
  .weui_cells {
    margin: 0.362319rem; //45px
  }
  .weui_cell,
  .weui_cell_primary {
    font-size: 0.322061rem; //40px
  }
  .weui_cell_primary {
    margin-right: 0.161031rem; //20px
  }
  .results {
    margin-top: 0;
    .icon-pano {
      color: #eef1f5;
      font-size: 1.610306rem;
      vertical-align: middle;
    }
  }

  .service-introdution {
    h3 {
      text-align: center;
      color: #737e9c;
      font-size: 0.354267rem; //44px
      margin: 0.161031rem 0; //20px
    }
    p {
      color: #acb1bd;
    }
    .weui_cell_ft {
      align-self: flex-start;
      position: absolute;
      right: 15px;
    }
    .weui_cell_primary {
      margin-right: 0;
    }
    .contact {
      padding: 0.161031rem 0;
      color: #acb1bd;
      line-height: 0.563607rem;
      margin-top: 0.362319rem; //30px
      border-top: 1px solid #f4f6fa;
      .weixin-qrcode {
        display: block;
        margin: -1.55em auto 0;
        width: 2.012882rem; //250px
        vertical-align: top;
        // margin-left: 0.402576rem;
      }
    }
  }
}
</style>
