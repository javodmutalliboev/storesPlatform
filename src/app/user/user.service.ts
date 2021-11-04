import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Store } from '../stores/store.model';
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserService {
  private stores: Store[] = [];
  private storesUpdated = new Subject<{ stores: Store[], storesCount: number }>();

  constructor(private http: HttpClient) {}

  getStores() {
    this.http.get<{ message: string, stores: any, maxStores: number }>(
      'http://localhost:3000/api/users/get'
    )
      .pipe(map(storesData => {
        return {
          stores: storesData.stores.map(store => {
            return {
              id: store._id,
              deleted: store.deleted,
              location: {lat: store.location.lat, long: store.location.long},
              title: store.title,
              description: store.description
            };
          }), maxStores: storesData.maxStores
        };
      }))
      .subscribe(transformedStoresData => {
        this.stores = transformedStoresData.stores;
        this.storesUpdated.next({stores: [...this.stores], storesCount: transformedStoresData.maxStores});
      });
  }

  getStoresUpdateListener() {
    return this.storesUpdated.asObservable();
  }
}


