import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Store } from './store.model';
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class StoresService {
  private stores: Store[] = [];
  private storesUpdated = new Subject<{ stores: Store[], storesCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getStores(storesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${storesPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, stores: any, maxStores: number }>(
      'http://localhost:3000/api/admin/stores' + queryParams
    )
      .pipe(map(storesData => {
        return {stores: storesData.stores.map(store => {
          return {
            id: store._id,
            deleted: store.deleted,
            location: {lat: store.location.lat, long: store.location.long},
            title: store.title,
            description: store.description
          };
        }), maxStores: storesData.maxStores};
      }))
      .subscribe(transformedStoresData => {
        this.stores = transformedStoresData.stores;
        this.storesUpdated.next({stores: [...this.stores], storesCount: transformedStoresData.maxStores});
    });
  }

  getStoresUpdateListener() {
    return this.storesUpdated.asObservable();
  }

  getStore(id: string) {
    return this.http.get<{store: any}>('http://localhost:3000/api/admin/get/' + id);
  }

  addStore(deleted: boolean, location: {lat: string, long: string}, title: string, description: string) {
    const store: Store = {id: null, deleted: deleted, location: {lat: location.lat, long: location.long},
      title: title, description: description};
    this.http.post<{ message: string, storeId: string }>('http://localhost:3000/api/admin/create', store)
      .subscribe(responseData => {
        /* const id = responseData.storeId;
        store.id = id;
        this.stores.push(store);
        this.storesUpdated.next([...this.stores]); */
        this.router.navigate(["/admin"]);
      });
  }

  updateStore(id: string, deleted: boolean, location, title: string, description: string) {
    const store: Store = {id: id, deleted: deleted, location: location, title: title, description: description};
    this.http.put('http://localhost:3000/api/admin/update/' + id, store)
      .subscribe(response => {
        /* const updatedStores = [...this.stores];
        const oldStoreIndex = updatedStores.findIndex(s => s.id === store.id);
        updatedStores[oldStoreIndex] = store;
        this.stores = updatedStores;
        this.storesUpdated.next([...this.stores]); */
        this.router.navigate(["/admin"]);
      });
  }

  deleteStore(storeId: string) {
    this.http.patch<{ store: any }>('http://localhost:3000/api/admin/delete/' + storeId, {deleted: true})
      .subscribe(responseData => {
         const storeIndex = this.stores
          .findIndex(store => (store.id === responseData.store._id));
        this.stores[storeIndex].deleted = responseData.store.deleted;
      });
  }
}
