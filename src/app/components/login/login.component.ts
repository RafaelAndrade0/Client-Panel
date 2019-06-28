import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.authService.getAuth().subscribe(auth => {
    //   if (auth) {
    //     this.router.navigate(["/"]);
    //   }
    // });
  }

  login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.toastr.success("You are now logged in!");
      })
      .catch(err => {
        console.log(err.message);
        this.toastr.error("Error logging in!");
      });
  }
}
