import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ClientService } from "src/app/services/client.service";
import { Client } from "src/app/models/Client";
import { ToastrService } from "ngx-toastr";
import { isNumber } from "util";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  newBalance: number;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.getClient();
  }

  getClient() {
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    });
  }

  onDelete(id: string) {
    console.log(id);
    this.clientService.deleteClient(id);
    this.toastr.success("Client Deleted With Success");
    this.router.navigate(["/"]);
  }

  changeBalance() {
    if (isNumber(this.newBalance)) {
      this.clientService.editBalance(this.newBalance, this.id);
      this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
      this.hasBalance = this.newBalance > 0 ? true : false;
    } else {
      this.toastr.error("The Balance needs to be a number!", "Balance Error!");
    }
  }
}
