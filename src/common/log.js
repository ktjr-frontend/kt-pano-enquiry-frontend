import Vue from 'vue'

export default function(logObj) {
  let logUrl = '/api/v1/log'
  Vue.http.get(logUrl, logObj)
}
