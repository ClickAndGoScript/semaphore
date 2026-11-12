<template>
  <v-form
    ref="form"
    v-model="formValid"
    v-if="item"
    data-testid="integrationMatcherForm-form"
    :data-state="formSaving ? 'loading' : (formError ? 'error' : 'ready')"
  >
    <v-alert
      :model-value="!!formError"
      color="error"
      class="pb-2"
      data-testid="integrationMatcherForm-error"
    >{{ formError }}
    </v-alert>
    <v-text-field
      v-model="item.name"
      data-testid="integrationMatcherForm-name"
      :label="$t('name')"
      :rules="[v => !!v || 'Name is required']"
      required
      :disabled="formSaving"
      variant="outlined"
      density="compact"
    ></v-text-field>

    <v-divider class="mb-5" />

    <div>
      <v-select
        v-model="item.match_type"
        data-testid="integrationMatcherForm-matchType"
        :label="$t('match_on_required')"
        :items="matchTypes"
        item-value="id"
        item-title="text"
        :rules="[v => !!v || 'Match source is required']"
        variant="outlined"
        density="compact"
        required
        :disabled="formSaving"
      ></v-select>
      <v-select
        v-model="item.body_data_type"
        data-testid="integrationMatcherForm-bodyDataType"
        v-if="item.match_type == 'body'"
        :label="$t('body_data_format_required')"
        :items="bodyDataFormats"
        item-value="id"
        item-title="text"
        :rules="[v => !!v || 'Body Data Format is required']"
        variant="outlined"
        density="compact"
        required
        :disabled="formSaving"
      ></v-select>
      <v-text-field
        v-model="item.key"
        data-testid="integrationMatcherForm-key"
        :label="$t('key_required_label')"
        :rules="[v => !!v || 'Key is required']"
        variant="outlined"
        density="compact"
        required
        :disabled="formSaving"
      ></v-text-field>
      <v-select
        v-model="item.method"
        data-testid="integrationMatcherForm-method"
        :label="$t('comparison_method_required')"
        :items="methods"
        item-value="id"
        item-title="text"
        :rules="[v => !!v || 'Comparison Method is required']"
        variant="outlined"
        density="compact"
        required
        :disabled="formSaving"
      ></v-select>
      <v-text-field
        v-model="item.value"
        data-testid="integrationMatcherForm-value"
        :label="$t('value_required_label')"
        :rules="[v => !!v || 'Value is required']"
        variant="outlined"
        density="compact"
        required
        :disabled="formSaving"
      ></v-text-field>
    </div>
  </v-form>
</template>
<script>
import ItemFormBase from '@/components/ItemFormBase';
import IntegrationExtractorChildValueFormBase from './IntegrationExtractorChildValueFormBase';
import { MATCHER_TYPE_ICONS, MATCHER_TYPE_TITLES } from '../lib/constants';

export default {
  mixins: [ItemFormBase, IntegrationExtractorChildValueFormBase],
  data() {
    return {
      MATCHER_TYPE_ICONS,
      MATCHER_TYPE_TITLES,
      matchTypes: [{
        id: 'body',
        text: this.$t('body'),
      }, {
        id: 'header',
        text: this.$t('header'),
      }],
      bodyDataFormats: [{
        id: 'json',
        text: 'JSON',
      }, {
        id: 'string',
        text: 'String',
      }],
      methods: [{
        id: 'equals',
        text: '==',
      }, {
        id: 'unequals',
        text: '!=',
      }, {
        id: 'contains',
        text: this.$t('contains'),
      }],
    };
  },
  computed: {
    integrationId() {
      if (/^-?\d+$/.test(this.$route.params.integrationId)) {
        return parseInt(this.$route.params.integrationId, 10);
      }
      return this.$route.params.integrationId;
    },
  },
  methods: {
    getItemsUrl() {
      return `/api/project/${this.projectId}/integrations/${this.integrationId}/matchers`;
    },
    getSingleItemUrl() {
      return `/api/project/${this.projectId}/integrations/${this.integrationId}/matchers/${this.itemId}`;
    },
  },
};
</script>
