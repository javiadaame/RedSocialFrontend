import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent {
  public title:string;
  public user:User;
  public status: string;
  public identity!: { _id: any; };
  public token!: string | any[];

  constructor(  
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService){
    
      this.title = 'Login';
      this.user = new User("", "", "", "", "", "", "USER"); 
      this.status = "";

  }

  ngOnInit(){
      console.log('Login component loaded.');
  }

  onLoginSubmit(form: { reset: () => void; }){
    this._userService.signup(this.user).subscribe(
      response => {
          this.identity = response.user;
          if(!this.identity || !this.identity._id){
            this.status = 'error';
          }else{
            this.status = 'success';
            form.reset();


            this.getToken();

          }
          console.log(response.user);
      },
      error => {
        var errormsg = <any>error;

        console.log(errormsg);
        if(errormsg != null){
          this.status = 'error';
        }
      }
    );
  }

  
  getToken(){
    this._userService.signup(this.user).subscribe(
      response => {
          this.token = response.token;
          if(this.token.length <= 0){
            this.status = 'error';
          }else{
            this.status = 'success';

          }
          console.log(response.user);
      },
      error => {
        var errormsg = <any>error;

        console.log(errormsg);
        if(errormsg != null){
          this.status = 'error';
        }
      }
    );
  }
}
