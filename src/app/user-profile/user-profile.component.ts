import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    providers: [AuthService]
})
export class UserProfileComponent implements OnInit {


    constructor(public auth: AuthService) {}

    ngOnInit() {}

}
