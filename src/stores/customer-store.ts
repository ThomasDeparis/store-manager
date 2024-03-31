import { defineStore } from 'pinia';
import { ICustomerState, ICustomer } from 'models/customer/customer';
import { ICustomerError } from 'models/customer/customererror';
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

export const useCustomerStore = defineStore('customer', {
  state: (): ICustomerState => {
    return {
      customers: [],
      isLoading: false,
      storeId: '',
    };
  },
  actions: {
    async loadCustomers(storeId: string) {
      this.storeId = storeId;
      this.customers = [];
      this.isLoading = true;
      const customersCol = collection(db, 'customers');
      const q = query(customersCol, where('storeId', '==', storeId));
      const querySnapshot = await getDocs(q);
      this.customers = querySnapshot.docs.map(function (p) {
        return {
          id: p.id,
          name: p.data()?.name,
          phone: p.data()?.phone,
          email: p.data()?.email,
          storeId: p.data()?.storeId,
          lastChangeUserId: p.data()?.lastChangeUserId,
        } as ICustomer;
      });
      this.isLoading = false;
    },
    async addCustomer(customer: ICustomer) {
      try {
        const newCustomer = doc(collection(db, 'customers'));
        customer.id = newCustomer.id; //copy the generated document id into id field
        await setDoc(newCustomer, customer);

        this.customers.push(customer);
      } catch (error: any) {
        const pError = {
          productReference: customer.name,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as ICustomerError;

        throw pError;
      }
    },
    // async editCustomer(edited: ICustomer) {
    //   try {
    //     const customerDoc = doc(collection(db, 'customers'), edited.id);

    //     await updateDoc(customerDoc, {
    //       name: edited.name,
    //       email: edited.email,
    //       phone: edited.phone,
    //       lastChangeUserId: edited.lastChangeUserId,
    //     });

    //     const i = this.customers.findIndex(
    //       (p) => p.id === edited.id && p.storeId === edited.storeId
    //     );
    //     if (i < 0) {
    //       const error = {
    //         customerName: edited.id,
    //         errorType: ErrorType.Technical,
    //         message:
    //           'customerStore.editCustomer : cannot find customer in store to edit it',
    //       } as ICustomerError;

    //       throw error;
    //     }
    //     const changed = this.customers[i];
    //     changed.name = edited.name;
    //     changed.email = edited.email;
    //     changed.phone = edited.phone;
    //     changed.lastChangeUserId = edited.lastChangeUserId;
    //   } catch (error: any) {
    //     const pError = {
    //       customerName: edited.id,
    //       errorType: ErrorType.Technical,
    //       message: error.toString(),
    //     } as ICustomerError;

    //     throw pError;
    //   }
    // },
  },
});
