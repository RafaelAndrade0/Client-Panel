import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Client } from "../models/Client";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;

  // Observables
  clients$: Observable<Client[]>;
  client$: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = this.db.collection("clients", ref =>
      ref.orderBy("lastName", "asc")
    );
  }

  getClients(): Observable<Client[]> {
    // Get clients with id
    return (this.clients$ = this.clientsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    ));
  }

  addClient(client: Client) {
    const clientsCollection = this.db.collection<Client>("clients");
    clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    return (this.client$ = this.db
      .doc<Client>(`clients/${id}`)
      .snapshotChanges()
      .pipe(
        map(action => {
          if (!action.payload.exists) {
            return null;
          } else {
            const data = action.payload.data();
            const id = action.payload.id;
            return { id, ...data };
          }
        })
      ));
  }

  deleteClient(id: string) {
    this.db.doc<Client>(`clients/${id}`).delete();
    // clientsCollection.doc<Client>(`clients/${id}`).ref.delete();
  }

  editClient(client: Client) {
    this.db.doc<Client>(`clients/${client.id}`).update(client);
  }

  editBalance(newBalance: number, id: string) {
    this.db.doc<Client>(`clients/${id}`).update({ balance: newBalance });
  }
}
