<template>
  <div class="enquiry-result enquiry-error">
    <section class="results">
      <group>
        <cell class="service-introdution">
          <div slot="after-title">
            <h3>
            <i class="icon-pano icon-meng"></i>
            无法发行
            </h3>
            <p>{{enquiryError}}</p>
            <div class="contact">
              <ul>
                <li>邮箱：HelloPANO@ktjr.com</li>
                <li>
                  PANO微信小秘书：
                  <img class="weixin-qrcode" src="../../assets/images/weixin.jpg" alt="weixin小秘书">
                </li>
              </ul>
            </div>
          </div>
        </cell>
      </group>
    </section>
  </div>
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
  margin-top: 0;
  .weui_cells {
    margin: 0.362319rem; //45px
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
      margin: 0.322061rem 0;
      font-size: 0.483092rem;
      color: #737e9c;
    }
  }
}
</style>
