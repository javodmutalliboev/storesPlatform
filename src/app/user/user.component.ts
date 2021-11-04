import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from '../stores/store.model';
import {Subscription} from "rxjs";
import { UserService } from "./user.service";
import {map} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

declare var ymaps: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'User';
  stores: Store[] = [];
  totalStores = 0;
  // private storesSub: Subscription;

  // constructor(public userService: UserService) {}
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // this.userService.getStores();
    // this.storesSub = this.userService.getStoresUpdateListener().subscribe(
    //   (storesData: { stores: Store[], storesCount: number }) => {
    //     this.totalStores = storesData.storesCount;
    //     this.stores = storesData.stores;
    //   }
    // );

    const res = await this.http.get<{ message: string, stores: any, maxStores: number }>(
      'http://localhost:3000/api/users/get'
    ).toPromise();

    this.stores = res.stores;
    this.totalStores = res.maxStores;

    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [41.5744, 64.1833],
        zoom: 6
      }, {
        searchControlProvider: 'yandex#search'
      });

      // Creating a content layout.
      var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      );

      var myPlacemark: any;

      for (let i = 0; i < res.maxStores; i++) {
        myPlacemark = new ymaps.Placemark([res.stores[i].location.lat,
          res.stores[i].location.long], {
          hintContent: res.stores[i].title,
          balloonContent: res.stores[i].description
        }, {
          /**
           * Options.
           * You must specify this type of layout.
           */
          iconLayout: 'default#image',
          // Custom image for the placemark icon.
          iconImageHref: '../../assets/myIcon.gif',
          // The size of the placemark.
          iconImageSize: [30, 42],
          /**
           * The offset of the upper left corner of the icon relative
           * to its "tail" (the anchor point).
           */
          iconImageOffset: [-5, -38]
        });

        myMap.geoObjects.add(myPlacemark);
      }
    });
  }

  // ngOnDestroy() {
  //   this.storesSub.unsubscribe();
  // }
}

