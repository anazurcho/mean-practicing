import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    // const authData = new FormData();
    // authData.append("email", email);
    // authData.append("password", password);
    const authData: AuthData = { email: email, password: password };
    this.http
      .post(environment.apiURL + "/user/signup", authData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
