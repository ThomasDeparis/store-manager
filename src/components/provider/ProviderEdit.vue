<template>
  <side-panel :title="$t('provider.detail')" @close="$emit('close')">
    <div class="row">
      <q-toggle
        class=""
        :model-value="isReadonly"
        color="green"
        :label="$t('forms.editMode')"
        :true-value="false"
        :false-value="true"
        @update:model-value="$emit('update:readonlyMode', isReadonly)"
      />
    </div>
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input
        filled
        v-model="editing.email"
        :readonly="isReadonly"
        :label="$t('provider.email')"
      />
      <q-input
        filled
        v-model="editing.name"
        :label="$t('provider.name')"
        :readonly="isReadonly"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        prefix="+33"
        mask="# ## ## ## ##"
        reverse-fill-mask
        v-model="editing.phone"
        :label="$t('provider.phone')"
        :readonly="isReadonly"
      />
      <div class="row justify-center">
        <q-btn
          v-if="!isReadonly"
          :label="$t('buttons.edit')"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </side-panel>
</template>

<script lang="ts">
import { toRef, defineComponent, PropType, computed, watchEffect } from 'vue';
import { useProviderStore } from 'stores/provider-store';
import { useUserStore } from 'stores/user-store';
import { IProvider } from 'src/models/provider/provider';

import SidePanel from 'components/common/SidePanel.vue';

export default defineComponent({
  name: 'ProviderEdit',
  props: {
    readonlyMode: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object as PropType<IProvider>,
      required: true,
    },
  },
  emits: [
    'close',
    'update:modelValue',
    'update:readonlyMode',
    'provider-edit-failed',
  ],
  components: { SidePanel },

  setup(props, context) {
    const editing = computed(() => props.modelValue);

    const isReadonly = toRef<boolean>(props.readonlyMode);
    watchEffect(() => (isReadonly.value = props.readonlyMode));

    const providerStore = useProviderStore();
    const userStore = useUserStore();

    const onSubmit = async () => {
      try {
        editing.value.lastChangeUserId = userStore.userData?.uid;

        await providerStore.editProvider(editing.value);
        context.emit('update:modelValue', editing.value);
      } catch (error) {
        context.emit('provider-edit-failed', error);
      }
    };

    return {
      editing,
      isReadonly,
      onSubmit,
    };
  },
});
</script>
