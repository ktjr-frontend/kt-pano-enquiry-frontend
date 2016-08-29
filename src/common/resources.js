import Vue from 'vue'

let sessions, accounts, registrations, recoveries, cards, enquiries, sharedEnquiries, feedbacks, signatures, log

let previousRequestMap = {}
let commonOpts = {
  before(request) {
    let key = Vue.url(request.url, request.params)

    if (previousRequestMap[key]) {
      previousRequestMap[key].abort()
    }

    previousRequestMap[key] = request
  }
}

export default function setResources(resource) {
  sessions = resource('sessions', {}, {}, commonOpts) // 用户信息
  accounts = resource('accounts{/content}', {}, {}, commonOpts) // 账户信息更改
  registrations = resource('registrations{/content}', {}, {}, commonOpts) //注册
  recoveries = resource('recoveries{/content}', {}, {}, commonOpts) //忘记密码
  cards = resource('cards{/content}', {}, {}, commonOpts) // 上传名片
  enquiries = resource('inquiries{/content}', {}, {}, commonOpts) // 询价
  feedbacks = resource('feedbacks', {}, {}, commonOpts) //用户反馈
  signatures = resource('inquiries/get_wx_tokens', {}, {}, commonOpts) //微信签名
  log = resource('shadows', {}, {}, commonOpts) // 用户行为日志
}

export { sessions, accounts, registrations, recoveries, cards, enquiries, feedbacks, sharedEnquiries, signatures, log }
