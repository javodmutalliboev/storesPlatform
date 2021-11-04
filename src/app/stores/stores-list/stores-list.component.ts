import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "../store.model";
import {Subscription} from "rxjs";
import {StoresService} from "../stores.service";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit, OnDestroy {
  stores: Store[] = [];
  isLoading = false;
  totalStores = 0;
  storesPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 6];
  adminIsAuthenticated = false;
  private storesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public storesService: StoresService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.storesService.getStores(this.storesPerPage, 1);
    this.storesSub = this.storesService.getStoresUpdateListener().subscribe(
      (storesData: { stores: Store[], storesCount: number }) => {
        this.isLoading = false;
        this.totalStores = storesData.storesCount;
        this.stores = storesData.stores;
      }
    );
    this.adminIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener().subscribe(isAuthenticated => {
        this.adminIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.storesPerPage = pageData.pageSize;
    this.storesService.getStores(this.storesPerPage, this.currentPage);
  }

  onDelete(storeId: string) {
    this.storesService.deleteStore(storeId);
  }

  ngOnDestroy() {
    this.storesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
