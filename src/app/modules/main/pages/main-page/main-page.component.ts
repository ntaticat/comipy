import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocente } from '../../../../data/interfaces/docentes.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  docenteData?: IDocente;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.data.subscribe((data) => {
      this.docenteData = data['docenteData'];
    });
  }
  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
