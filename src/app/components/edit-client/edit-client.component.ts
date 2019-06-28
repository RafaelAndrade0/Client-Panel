import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/models/Client";
import { ClientService } from "src/app/services/client.service";
import { ToastrService } from "ngx-toastr";
import { isNumber } from "util";
import { fadeAnimation } from "src/app/animations/fade.animation";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"]
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    phone: "",
    balance: 0,
    email: "",
    firstName: "",
    lastName: ""
  };

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.clienteService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onEdit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.toastr.warning("You need to fill all fields!");
    } else {
      value.id = this.id;
      this.clienteService.editClient(value as Client);
      this.toastr.success("Client Updated with success!");
      this.router.navigate(["/client", this.id]);
    }
  }
}
