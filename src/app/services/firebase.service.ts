import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Business } from '../models/Business';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;

  constructor(private af: AngularFireDatabase) { }

  getBusinesses(category: string = null) {
    if (category != null && category != "0") {
      this.businesses = this.af.list('/businesses', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      }) as 
      FirebaseListObservable<Business[]>; 
    } else {
      this.businesses = this.af.list('/businesses') as 
        FirebaseListObservable<Business[]>;
    }

    return this.businesses;
  }

  getCategories() {
    this.categories = this.af.list('/categories') as 
      FirebaseListObservable<Category[]>;

    return this.categories;
  }

  addBusiness(business) {
    return this.businesses.push(business);
  }

  updateBusiness(key, business){
    return this.businesses.update(key, business);
  }

  deleteBusiness(key){
    return this.businesses.remove(key);
  }
}
