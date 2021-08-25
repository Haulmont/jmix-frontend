import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import qs from 'qs';

export enum LoginAttemptResult {
  SUCCESS = 'success',
  UNAUTHORIZED = 'unauthorized',
  UNKNOWN_ERRROR = 'unknownError',
}

export class SecurityStore {
  @observable isLoggedIn: boolean = true;

  constructor() {
    makeObservable(this);
  }

  @action
  async login(username: string, password: string): Promise<LoginAttemptResult> {
    const response = await axios('/login', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        username,
        password
      })
    });
    if (response.status === 200) {
      this.isLoggedIn = true;
      return LoginAttemptResult.SUCCESS;
    }
    if (response.status === 401) {
      return LoginAttemptResult.UNAUTHORIZED;
    }
    return LoginAttemptResult.UNKNOWN_ERRROR;
  }

  @action
  async logout() {
    this.isLoggedIn = false;
  }
}