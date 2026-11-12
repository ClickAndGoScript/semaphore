<template>
  <div class="object-refs-view integration-extractor-refs-view">
    <v-alert
      type="warning"
    >
      The {{ objectTitle }} can't be deleted because it used by the resources below
    </v-alert>
    <div
      v-for="s in sections"
      class="object-refs-view__section"
      :key="s.slug"
    >
      <div class="object-refs-view__section-title">
        <v-icon size="small" class="me-2">mdi-{{ s.icon }}</v-icon>{{ s.title }}:
      </div>

      <div class="ms-6">
        <span
            v-for="t in integrationExtractorRefs[s.slug]"
            class="object-refs-view__link-wrap"
            :key="t.id"
        >
          <router-link
            :to="`/project/${projectId}/integrations/${t.integrationId}/extractor/${t.itemId}`"
            class="object-refs-view__link">{{ t.name }}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>
