import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import qs from 'qs';

export class SecurityStore {
  @observable isLoggedIn: boolean = true;

  constructor() {
    makeObservable(this);
  }

  @action
  login = async (username: string, password: string, onResponseReceived?: (status: number) => void) => {
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
    }
    if (onResponseReceived != null) {
      onResponseReceived(response.status);
    }
  }

  @action
  logout = async (onResponseReceived?: (status: number) => void) => {
    this.isLoggedIn = false;

    const response = await axios("/logout", {
      method: "POST"
    });

    if (onResponseReceived != null) {
      onResponseReceived(response.status);
    }
  }
}