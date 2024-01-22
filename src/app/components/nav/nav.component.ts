import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    )
     { }

  ngOnInit(): void {
    this.router.navigate(['parametrosrequest/parametros-simu'])
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toastr.info('Logout feito com sucesso!','Logout',{ timeOut: 4000 });
  }

}
