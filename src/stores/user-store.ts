import { defineStore } from 'pinia';
import { IUserState, IStore } from 'models/user';
import { auth } from 'src/firebase.config';
import { db } from 'src/firebase.config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';

const emptyState: IUserState = {
  userData: null,
  didAutoLogout: false,
  error: null,
  isLoading: false,
  currentStore: '',
};

const fetchAttachedStore = async (userId: string): Promise<string> => {
  if (!userId || userId === '') {
    return '';
  }

  const storesCollection = collection(db, 'stores');
  const q = query(storesCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.find(() => true)?.id || '';
};

const addDefaultStore = async (userId: string): Promise<IStore> => {
  const newStore = doc(collection(db, 'stores'));
  const storeObj = {
    id: newStore.id,
    name: 'Magasin principal',
    userId: userId,
  } as IStore;

  await setDoc(newStore, storeObj);
  return storeObj;
};

export const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return emptyState;
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.userData && this.currentStore !== '';
    },
  },
  actions: {
    async signIn(email: string, password: string) {
      this.error = null;
      this.isLoading = true;

      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.error = null;
        })
        .catch((error) => {
          this.error = error;
        });

      this.isLoading = false;
    },

    async signUp(email: string, password: string) {
      this.isLoading = true;
      this.error = null;

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.userData = userCredential.user;
          return userCredential.user.uid;
        })
        .then(async (userId) => {
          const createdStore = await addDefaultStore(userId);
          this.currentStore = createdStore.id;
        })
        .catch((error) => {
          this.error = error;
        });

      this.isLoading = false;
    },

    // observer to refresh current user when signin, signup etc.
    fetchUser() {
      onAuthStateChanged(auth, async (user) => {
        this.userData = user;
        this.currentStore = await fetchAttachedStore(user?.uid || '');
      });
    },

    async signOut() {
      await signOut(auth);
      this.$state = emptyState;
    },
  },
});
