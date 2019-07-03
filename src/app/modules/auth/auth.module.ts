import { NgModule } from "@angular/core";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegisterComponent } from "src/app/components/register/register.component";
import { SharedModule } from "../shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, AuthRoutingModule],
  exports: []
})
export class AuthModule {}
