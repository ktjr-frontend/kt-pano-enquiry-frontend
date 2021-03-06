import Vue from 'vue'

let sessions, assetTypes, businessTypes, accounts, registrations,
  recoveries, cardFront, cardBack, enquiries, sharedEnquiries, feedbacks,
  signatures, log, persons, quotes, projects, panoFiles, projectInterest,
  imageCaptcha, instBasicInfo, peopleSearch, userAnswers, userQuestions, userOptionLogs,
  ktInstitutions

const previousRequestMap = {}
const commonOpts = {
  before(request) {
    const key = Vue.url(request.url, request.params)

    if (previousRequestMap[key]) {
      previousRequestMap[key].abort()
    }

    previousRequestMap[key] = request
  }
}

export default function setResources(resource) {
  sessions = resource('sessions', {}, {}, commonOpts) // 用户信息
  assetTypes = resource('asset_types{/id}', {}, {}, commonOpts) // 偏好资产
  businessTypes = resource('business_types{/id}', {}, {}, commonOpts) // 业务偏好
  persons = resource('person{/content}', {}, {}, commonOpts) // 用户详细信息
  accounts = resource('accounts{/content}', {}, {}, commonOpts) // 账户信息更改
  registrations = resource('registrations{/content}', {}, {}, commonOpts) // 注册
  recoveries = resource('recoveries{/content}', {}, {}, commonOpts) // 忘记密码
  cardFront = resource('cards{/content}', {}, {}, commonOpts) // 上传名片
  cardBack = resource('back_cards{/content}', {}, {}, commonOpts) // 上传名片
  enquiries = resource('inquiries{/content}', {}, {}, commonOpts) // 询价
  feedbacks = resource('feedbacks', {}, {}, commonOpts) // 用户反馈
  signatures = resource('inquiries/get_wx_tokens', {}, {}, commonOpts) // 微信签名
  quotes = resource('quotes{/content}', {}, {}, commonOpts) // 报价板
  projects = resource('projectes{/content}', {}, {}, commonOpts) // 项目香港
  panoFiles = resource('pano_files', {}, {}, commonOpts) // 项目香港
  projectInterest = resource('project_interest', {}, {}, commonOpts) // 项目香港
  log = resource('shadows', {}, {}, commonOpts) // 用户行为日志
  imageCaptcha = resource('captcha', {}, {}, commonOpts) // 图形验证码
  instBasicInfo = resource('institutions', {}, {}, commonOpts) // 机构基本信息
  peopleSearch = resource('peoplesearch', {}, {}, commonOpts) // 找人
  userAnswers = resource('user_answers', {}, {}, commonOpts) // 找人
  userQuestions = resource('user_questions', {}, {}, commonOpts) // 找人
  userOptionLogs = resource('user_option_logs', {}, {}, commonOpts) // 找人
  ktInstitutions = resource('institutions/ktjr_id', {}, {}, commonOpts)
}

export {
  sessions,
  accounts,
  registrations,
  recoveries,
  cardFront,
  cardBack,
  enquiries,
  feedbacks,
  sharedEnquiries,
  signatures,
  log,
  persons,
  assetTypes,
  businessTypes,
  quotes,
  projects,
  panoFiles,
  projectInterest,
  imageCaptcha,
  instBasicInfo,
  peopleSearch,
  userAnswers,
  userQuestions,
  userOptionLogs,
  ktInstitutions
}
