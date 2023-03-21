import { Component } from '@angular/core';
import { Account } from '@cydeaos/libs/luna/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: Account = <Account>{
    id: -1,
    username: "leila-codes"
  }
}
