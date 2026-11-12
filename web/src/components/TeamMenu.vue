<template>
  <v-tabs class="pl-4" data-testid="team-menu">
    <v-tab
      key="team"
      :to="`/project/${projectId}/team`"
      data-testid="team-members"
    >
      {{ $t('members') }}
    </v-tab>

    <v-tab
      v-if="systemInfo.teams.invites_enabled"
      key="invites"
      :to="`/project/${projectId}/invites`"
      data-testid="team-invites"
    >
      {{ $t('invites') }}
    </v-tab>

    <v-tab
      key="roles"
      :to="`/project/${projectId}/roles`"
      data-testid="team-roles"
    >
      {{ $t('roles') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {

  props: {
    projectId: Number,
    systemInfo: Object,
  },

};
</script>
