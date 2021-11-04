import {Component, OnInit, OnDestroy} from "@angular/core";
import { NgForm } from "@angular/forms";

import { StoresService } from "../stores.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Store} from "../store.model";
import { Subscription } from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: "app-store-create",
  templateUrl: "./store-create.component.html",
  styleUrls: ["./store-create.component.css"]
})
export class StoreCreateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredDescription = "";
  deleted: boolean = false;
  isLoading = false;
  store: Store;
  private mode = 'create';
  private storeId: string;
  private authStatusSub: Subscription;

  constructor(
    public storesService: StoresService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('storeId')) {
        this.mode = 'edit';
        this.storeId = paramMap.get('storeId');
        this.isLoading = true;
        this.storesService.getStore(this.storeId).subscribe(storeData => {
          this.isLoading = false;
          this.store = {
            id: storeData.store._id,
            deleted: storeData.store.deleted,
            location: storeData.store.location,
            title: storeData.store.title,
            description: storeData.store.description
          };
          });
      } else {
        this.mode = 'create';
        this.storeId = null;
      }
    });
  }

  onSaveStore(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const location = {lat: form.value.lat, long: form.value.long};
    if (this.mode === 'create') {
      this.storesService.addStore(this.deleted, location, form.value.title, form.value.description);
    } else {
      this.isLoading = true;
      this.storesService
        .updateStore(this.storeId, this.deleted, location, form.value.title, form.value.description);
    }
    form.resetForm();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
