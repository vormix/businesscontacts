import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Business } from './models/Business';
import { Category } from './models/Category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  businesses: Business[];
  categories: Category[];
  appState: string;
  activeKey: string;
  activeBusiness : Business;

  constructor(private _firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this._firebaseService.getBusinesses()
      .subscribe(businesses => this.businesses = businesses);

    this._firebaseService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  changeState(state, key = null){
    if(key)
      this.activeKey = key;
    this.appState = state;
  }

  filterCategory(category) {
    this._firebaseService.getBusinesses(category)
     .subscribe(businesses => this.businesses = businesses);
  }

  addBusiness(f) {
    let newBusiness = f as Business;
    newBusiness.created_at = new Date().toString();
    console.log(newBusiness);
    
    this._firebaseService.addBusiness(newBusiness);
    this.changeState('default');
  }

  showEdit(business) {
    this.changeState('edit', business.$key);
    this.activeBusiness = business;
  }

  updateBusiness() {
    this._firebaseService.updateBusiness(this.activeBusiness.$key, this.activeBusiness);
    this.changeState('default');
  }

  deleteBusiness(key) {

    if(!confirm("Are you sure you want to delete this business?")) return;
    
    this._firebaseService.deleteBusiness(key);
    this.changeState('default');
  }
}
