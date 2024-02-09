import { defineStore } from 'pinia';
import { IUserState } from '../models/user';
import { auth } from '../firebase.config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

export const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return {
      userData: null,
      didAutoLogout: false,
      error: null,
      isLoading: false,
      currentStore: '',
    };
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.userData;
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
          this.isLoading = false;
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
        this.currentStore = 'mfXwA7aLv9FAwtdDrXU0';
      });
    },

    async signOut() {
      await signOut(auth);
    },
  },
});
