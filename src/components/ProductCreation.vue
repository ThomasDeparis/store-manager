<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      filled
      v-model="reference"
      label="Référence produit"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Valeur obligatoire']"
    />
    <q-input filled v-model="providerReference" label="Référence fournisseur" />
    <q-input
      filled
      v-model="name"
      label="Nom"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Valeur obligatoire']"
    />
    <q-input
      filled
      suffix="€"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      v-model.number="sellPrice"
      label="Prix de vente HT"
      lazy-rules
      :rules="[
        (val) =>
          (val !== null && val !== '' && val > 0) || 'Entrer un prix de vente',
      ]"
    />
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useProductStore } from 'src/stores/product-store';
import { useUserStore } from 'src/stores/user-store';
import { IProduct } from 'src/models/product';

export default defineComponent({
  name: 'ProductCreation',
  emits: ['productCreated', 'productCreationFailed'],

  setup(_, context) {
    const reference = ref('');
    const providerReference = ref('');
    const sellPrice = ref(0.0);
    const name = ref('');

    const productStore = useProductStore();
    const userStore = useUserStore();

    const onSubmit = async () => {
      try {
        const product = {
          reference: reference.value,
          providerReference: providerReference.value,
          sellPrice: sellPrice.value,
          name: name.value,
          quantity: 0,
          storeId: userStore.currentStore,
          lastChangeUserId: userStore.userData?.uid,
        } as IProduct;

        const createResult = await productStore.addProduct(product);
        context.emit('productCreated', createResult);
      } catch (error) {
        context.emit('productCreationFailed', error);
      }
    };

    return {
      reference,
      providerReference,
      sellPrice,
      name,
      onSubmit,
    };
  },
});
</script>
