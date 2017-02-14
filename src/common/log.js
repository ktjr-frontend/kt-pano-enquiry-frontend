import { log } from './resources'
import Utils from './utils'

export default function(logObj) {
  const params = {
    anchor: Utils.toQueryString(logObj)
  }

  return log.get(params)
}

// 百度统计
export function bdTrack(eventArr) {
  const { _hmt } = window
  if (_hmt) {
    _hmt.push(['_trackEvent'].concat(eventArr))
  }
}
