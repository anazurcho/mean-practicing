import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string = "";
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post(environment.apiURL + "/user/signup", authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>(environment.apiURL + "/user/login", authData)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        console.log(response);
      });
  }
}
