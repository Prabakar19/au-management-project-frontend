import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CLIENT_ID } from 'src/app/constants/myid';
import { Manager } from 'src/app/datastructure/manager';
import { LoginService } from 'src/app/Services/loginService/login.service';
const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  errorMessage: string = '';
  hide: boolean;
  manager: Partial<Manager> = {};

  loginForm = this.fb.group({
    emailId: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)
    );
  }

  ngOnInit(): void {
    this.googleSDK();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.loginRequest(this.loginForm.value).subscribe(
        (res) => {
          this.manager = res;
          this.loginForm.reset;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('usertoken', JSON.stringify(this.manager));
          console.log(this.manager);
          this.router.navigateByUrl('/home');
        },
        (err) => {
          this.openDialog();
          console.log(err);
        }
      );
    }
  }

  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: CLIENT_ID,
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        this.prepareLoginButton();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }

  prepareLoginButton() {
    this.auth2.attachClickHandler(
      this.loginElement.nativeElement,
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();

        this.manager.emailId = profile.getEmail();

        this.ngZone.run(() =>
          this.loginService.googleloginRequest(this.manager).subscribe(
            (res) => {
              this.manager = res;
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('usertoken', JSON.stringify(this.manager));
              this.router.navigateByUrl('/home');
            },
            (error) => {
              this.openDialog();
            }
          )
        );
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: 'You are not autherized user!!',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
