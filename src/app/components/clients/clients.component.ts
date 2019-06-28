import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientService } from "src/app/services/client.service";
import { Client } from "src/app/models/Client";
import { fadeAnimation } from "src/app/animations/fade.animation";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  animations: [fadeAnimation],
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit, OnDestroy {
  constructor(private clientService: ClientService) {}

  clients: Client[];
  currentPage: number = 1;
  totalOwed: number;
  hasBalance: boolean;
  filterTable: string;

  ngOnInit() {
    this.getAllClients();
  }

  ngOnDestroy() {}

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }

  getAllClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }
}
