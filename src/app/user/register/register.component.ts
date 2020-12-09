import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error: string;
  loading = false;
  action: 'register' ;
  form: FormGroup;
 

  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
    private userService: UserService,
    private fb: FormBuilder
      
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      //tтова ти е името на контролера който си задала в html
      //след това правиш и второто поле по същия начин
      //точно както е написано тук , трябва да е и там, ако има грешка няма да работи
      email: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[w+]/), Validators.minLength(14)]],
     
    })   
  }
  onSubmit()
  // onSubmit(form: NgForm)  
  {
    
    // if(this.form.invalid) {
    //   return;
    // } 
    
    const {email, password} = this.form.value;

    this.userService.doRegister({email, password})
    .then(res => {
      console.log(res);
      this.router.navigate([`user/login`])
      alert('your account is created')
    }, err => {
      console.log(err);
    })
  // async onSubmit(form: NgForm) {

  //     this.loading = true;
  //     this.error = null;

  //     const {
        
  //         email,
  //         password,
  //         rePassword
        
  //     } = form.value;

  //     let resp;

  //     try {

  //         if (this.isSignUp) {
  //             resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  //             await resp.user.updateProfile(
  //                 { displayName: `${email} ${password}` }
  //             );

  //             form.reset();
  //         } 
  //         const uid = resp.user.uid;
  //                   this.router.navigate([`user/login`]);

  //         // this.router.navigate([`/profile/${uid}`]);

  //     } catch (error) {
  //         console.log(error.message);
  //         this.error = error.message;
  //     }

  //     this.loading = false;
  // }

 

 
}
//  get isRegister() {
//       return this.action === 'register';
//   }

  get f() {
    return this.form.controls
  }
}
