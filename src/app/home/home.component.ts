import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params)
    })
  }

}
