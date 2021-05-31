import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
      private connectionService: ConnectionService,
      private router: Router,
      private afs: AngularFirestore,
      private http: HttpClient
    ) {

  }

  title = 'Home';
  products = [
    {
      title: "",
      price: "",
      quantity: ""
    }
  ];

  dataObserver: Subscription | null = null;

  goToAboutPage() {
    this.router.navigate(['/second', 'Szabó Csaba', {message: this.title}]);
  }

  ngOnInit(): void {
    this.http.get<any>('https://progrendszerek.herokuapp.com/product').subscribe(data => {
        this.products = data;
        console.log(data);
    })

  }

}
