import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddClientComponent } from "src/app/components/add-client/add-client.component";
import { EditClientComponent } from "src/app/components/edit-client/edit-client.component";
import { ClientDetailsComponent } from "src/app/components/client-details/client-details.component";

const routes: Routes = [
  { path: "client/add", component: AddClientComponent },
  { path: "client/edit/:id", component: EditClientComponent },
  { path: "client/:id", component: ClientDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
