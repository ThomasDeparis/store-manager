import { defineStore } from 'pinia';
import { IProviderState, IProvider } from 'src/models/provider/provider';
import { IProviderError } from 'models/provider/providererror';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export const useProviderStore = defineStore('provider', {
  state: (): IProviderState => {
    return {
      providers: [],
      error: null,
      isLoading: false,
      storeId: ''
    };
  },
  actions: {
    async loadProviders(storeId: string) {
      this.storeId = storeId;
      this.providers = []
      this.isLoading = true;
      const providersCol = collection(db, 'providers');
      const q = query(providersCol, where('storeId', '==', storeId));
      const querySnapshot = await getDocs(q);
      this.providers = querySnapshot.docs.map(function (p) {
        return {
          id: p.id,
          name: p.data()?.name,
          phone: p.data()?.phone,
          email: p.data()?.email,
          storeId: p.data()?.storeId,
          lastChangeUserId: p.data()?.lastChangeUserId,
        } as IProvider;
      });
      this.isLoading = false;
    },
    async addProvider(provider: IProvider) {
      try {
        const newProvider = doc(collection(db, 'providers'));
        provider.id = newProvider.id; //copy the generated document id into id field
        await setDoc(newProvider, provider);

        this.providers.push(provider);
      } catch (error: any) {
        const pError = {
          productReference: provider.name,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IProviderError;

        throw pError;
      }
    },
    async editProvider(edited: IProvider) {
      try {
        const providerDoc = doc(collection(db, 'providers'), edited.id);

        await updateDoc(providerDoc, {
          name: edited.name,
          email: edited.email,
          phone: edited.phone,
          lastChangeUserId: edited.lastChangeUserId,
        });

        const i = this.providers.findIndex(
          (p) => p.id === edited.id && p.storeId === edited.storeId
        );
        if (i < 0) {
          const error = {
            providerName: edited.id,
            errorType: ErrorType.Technical,
            message:
              'providerStore.editProvider : cannot find provider in store to edit it',
          } as IProviderError;

          throw error;
        }
        const changed = this.providers[i];
        changed.name = edited.name;
        changed.email = edited.email;
        changed.phone = edited.phone;
        changed.lastChangeUserId = edited.lastChangeUserId;
      } catch (error: any) {
        const pError = {
          providerName: edited.id,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IProviderError;

        throw pError;
      }
    },
  },
});
