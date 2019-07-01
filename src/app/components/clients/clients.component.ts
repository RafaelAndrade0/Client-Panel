import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientService } from "src/app/services/client.service";
import { Client } from "src/app/models/Client";
import { fadeAnimation } from "src/app/animations/fade.animation";

import jsPDF from "jspdf";
import "jspdf-autotable";

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
  selectedRows: number[] = [];

  clientsSelected: Client[] = [];

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

  generatePdfActualPage() {
    const doc = new jsPDF();
    doc.autoTable({ html: "#tableClients", theme: "grid" });
    doc.save("table_actual_page.pdf");
  }

  generatePdfAllPages() {
    const doc = new jsPDF();
    const clientTable = this.clients.map(client => {
      return {
        name: `${client["firstName"]} ${client["lastName"]}`,
        email: client["email"],
        balance: client["balance"].toString()
      };
    });
    console.log(clientTable);
    doc.autoTable({
      body: clientTable,
      columns: [
        { header: "Name", dataKey: "name" },
        { header: "Email", dataKey: "email" },
        { header: "Balance", dataKey: "balance" }
      ],
      theme: "grid"
    });
    doc.save("table_all.pdf");
  }

  generatePdfSelected() {
    if (this.clientsSelected.length > 0) {
      const doc = new jsPDF();
      doc.autoTable({
        body: this.clientsSelected,
        columns: [
          { header: "Name", dataKey: "firstName" },
          { header: "Email", dataKey: "email" },
          { header: "Balance", dataKey: "balance" }
        ],
        theme: "grid"
      });
      doc.save("table_all.pdf");
    } else {
      console.log("No Clients Selected....");
    }
  }

  rowSelected(client: Client, index: number) {
    // console.log(this.selectedRows);
    if (this.selectedRows.includes(index)) {
      this.selectedRows.map((number, indexNumber) => {
        if (number === index) {
          this.selectedRows.splice(indexNumber, 1);
          this.clientsSelected.splice(indexNumber, 1);
        }
      });
    } else {
      this.selectedRows.push(index);
      this.clientsSelected.push(client);
    }
    console.log(this.selectedRows);
  }
}
