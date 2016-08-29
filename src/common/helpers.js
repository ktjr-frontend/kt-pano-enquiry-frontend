import _ from 'lodash'

export function pruneParams(params) {
  var newParams = _.cloneDeep(params)
  _.each(newParams, (v, i) => {
    if (newParams[i] === '' || _.isNull(newParams[i])) {
      delete newParams[i]
    }
  })
  return newParams
}
