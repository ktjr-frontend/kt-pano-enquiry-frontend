<template lang="jade">
.my-project-detail
  kt-loading(:visible='$loadingRouteData')
  .head
    h3 {{project.name}}
</template>

<script>
import {
  person
} from '../../common/resources.js'

export default {
  route: {
    data({
      to: {
        params
      }
    }) {
      return person.get({
        content: 'project_submitted_detail',
        project_id: params.projectId
      }).then(res => {
        return {
          project: res.json().res
        }
      }).catch(res => {
        this.$root.showToast()
        return null
      })
    }
  }
}
</script>
