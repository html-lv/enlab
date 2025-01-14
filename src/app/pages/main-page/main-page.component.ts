import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { OfficeComponent } from "../../shared/office/office.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, OfficeComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  public offices: any[] = [
    { name: 'Riga', path: '/riga'},
    { name: 'Tallinn', path: '/tallinn'},
    { name: 'Vilnus', path: '/vilnus'}
  ];

constructor(private router: Router){

}
}
