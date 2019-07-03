import { NgModule } from "@angular/core";
import { ClientsComponent } from "../../components/clients/clients.component";
import { AddClientComponent } from "../../components/add-client/add-client.component";
import { EditClientComponent } from "../../components/edit-client/edit-client.component";
import { ClientDetailsComponent } from "../../components/client-details/client-details.component";
import { DropdownDirective } from "../../shared/dropdown.directive";
import { FilterPipe } from "../../shared/filter.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClientsRoutingModule } from "./clients-routing.module";
import { SharedModule } from "../shared.module";

@NgModule({
  declarations: [
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,
    DropdownDirective,
    FilterPipe
  ],
  /* EVERYTHING that you use in your components declarations 
    needs to be imported in your module!
   Even directives and pipes! */

  /* Modules are standalone */
  imports: [
    SharedModule,
    // CommonModule,
    // FormsModule,
    ClientsRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: "modal-content",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn"
    }),
    ToastrModule.forRoot()
  ],
  /* Only exporting the ClientsComponent (It's used by the dashboard component).
   The rest of the components are being used only internally */
  exports: [
    ClientsComponent
    // AddClientComponent,
    // EditClientComponent,
    // ClientDetailsComponent
    // NgxPaginationModule
  ]
})
export class ClientsModule {}
