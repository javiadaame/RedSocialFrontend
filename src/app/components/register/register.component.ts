import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  public title:string;
  public user: User;
  public status: string;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
      this.title = 'Register';
      this.user = new User("", "", "", "", "", "", "USER"); 
      this.status = "";
  }

  
  ngOnInit(){
      console.log('Register component loaded.');  
      
  }

  onSubmit(form: { reset: () => void; }){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){ // si me llega una propiedad user, y tiene una propiedad _id, significa q todo ha salido bien
          console.log(response.user);

          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        
      }
    );
  }
}
