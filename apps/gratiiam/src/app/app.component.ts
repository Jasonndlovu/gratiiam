import { Component, OnInit } from '@angular/core';
import { UsersService } from '@comp/users';

@Component({
  selector: 'gratiiam-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.initAppSession();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  title = 'gratiiam';
}
