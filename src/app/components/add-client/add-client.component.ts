import { Component, OnInit, ViewChild } from "@angular/core";
import { Client } from "src/app/models/Client";
import { ToastrService } from "ngx-toastr";
import { ClientService } from "src/app/services/client.service";
import { Router } from "@angular/router";
import { fadeAnimation } from "src/app/animations/fade.animation";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    balance: 0,
    email: "",
    phone: ""
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild("clientForm") form: any;

  constructor(
    private toastr: ToastrService,
    private clientService: ClientService,
    private route: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.toastr.warning("You need to fill all fields!");
    } else {
      this.clientService.addClient(value as Client);
      this.toastr.success("Client Inserted with success!");
      // Redirect
      this.route.navigate(["/"]);
      // Reset component (clientForm.reset())
    }
  }
}
