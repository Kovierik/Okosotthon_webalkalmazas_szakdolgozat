import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/authentication/login-service.service';
import { RegisterParameters } from './types';
import { LoginParameters } from './types';
import { TokenHandlerService } from '../../authentication/token-handler.service';

@Component({
  selector: 'app-login-overlay',
  templateUrl: './login-overlay.component.html',
  styleUrls: ['./login-overlay.component.scss'],
})
export class LoginOverlayComponent {
  public loginError?: string;

  public registerWasSuccessful: boolean = false;
  public registerError?: string;

  constructor(
    private readonly loginServiceService: LoginServiceService,
    private readonly tokenHandlerService: TokenHandlerService
  ) {}

  toggle(): void {
    this.userNameValidatorDelete();
    this.emailValidatorDelete();
    this.passwordValidatorDelete();
    this.passwordAgainValidatorDelete();

    this.loginError = undefined;
    this.registerWasSuccessful = false;
    this.registerError = undefined;

    const blur = document.querySelectorAll('[id^="blur"]');
    if (blur) {
      blur.forEach((element) => {
        element.classList.toggle('active');
      });
    }

    const popup = document.querySelectorAll('[id^="popup"]');
    if (blur) {
      popup.forEach((element) => {
        element.classList.toggle('active');
      });
    }
  }

  getLoginValues(loginValues: LoginParameters): void {
    this.loginError = undefined;

    if (!loginValues.loginUsername || !loginValues.loginPassword) {
      this.loginError = 'Kérem töltsön ki minden mezőt!';
      return;
    }

    this.loginServiceService.login(
      loginValues.loginUsername,
      loginValues.loginPassword,
      (data) => {
        this.loginError = data;
        if (data === 'WrongPasswordOrUsername') {
          this.loginError = 'Hibás felhasználónév vagy jelszó!';
          return;
        }
        if (data !== '') {
          this.tokenHandlerService.tokenSet(data);
        }
      }
    );
  }

  getRegisterValues(registerValues: RegisterParameters): void {
    this.registerWasSuccessful = false;
    this.registerError = undefined;

    if (
      !registerValues.registerPassword ||
      !registerValues.registerPasswordAgain ||
      !registerValues.registerUsername ||
      !registerValues.registerEmail
    ) {
      this.registerError = 'Kérem töltsön ki minden mezőt!';
      return;
    }

    if (
      registerValues.registerPassword !== registerValues.registerPasswordAgain
    ) {
      this.registerError = 'A jelszavak nem egyeznek.';
      return;
    }

    this.loginServiceService.register(
      registerValues.registerUsername,
      registerValues.registerPassword,
      registerValues.registerEmail,
      (response) => {
        if (response === 'Ok') {
          this.registerWasSuccessful = true;
          this.registerError = undefined;
          return;
        }
        this.registerError = response;
        switch (response) {
          case 'EmailAlreadyExists':
            this.registerError = 'A megadott email cím már foglalt.';
            break;

          case 'UserNameAlreadyExists':
            this.registerError = 'A felhasználónév már foglalt.';
            break;
        }
      }
    );
  }

  switchToRegister() {
    this.userNameValidatorDelete();
    this.emailValidatorDelete();
    this.passwordValidatorDelete();
    this.passwordAgainValidatorDelete();

    this.loginError = undefined;
    this.registerWasSuccessful = false;
    this.registerError = undefined;
  }

  userNameValidator() {
    const userName = <HTMLInputElement>(
      document.querySelector('[id^="userName"]')
    );
    userName?.addEventListener('keyup' || 'keydown', () => {
      const valid = document.querySelector('.username-valid') as HTMLElement;
      const invalid = document.querySelector(
        '.username-invalid'
      ) as HTMLElement;
      if (userName.value.length == 0 || userName.value.length < 8) {
        userName.style.border = '2px ridge red';
        valid.style.display = 'none';
        invalid.style.display = 'block';
        this.registerError =
          'Felhasználónévnek minimum 8 karakter hosszúnak kell lennie.';
      } else {
        userName.style.border = '2px ridge green';
        valid.style.display = 'block';
        invalid.style.display = 'none';
        this.registerError = undefined;
      }
    });
  }

  userNameValidatorDelete() {
    const userName = <HTMLInputElement>(
      document.querySelector('[id^="userName"]')
    );
    const userValid = document.querySelector('.username-valid') as HTMLElement;
    const userInvalid = document.querySelector(
      '.username-invalid'
    ) as HTMLElement;

    userName.value = '';
    userName.style.border = 'none';
    userName.style.borderBottom = '2px solid rgba(0,0,0,0.2)';
    userValid.style.display = 'none';
    userInvalid.style.display = 'none';
  }

  emailValidator() {
    const email = <HTMLInputElement>document.querySelector('[id^="emailName"]');
    email?.addEventListener('keyup' || 'keydown', () => {
      const valid = document.querySelector('.email-valid') as HTMLElement;
      const invalid = document.querySelector('.email-invalid') as HTMLElement;
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email.value)) {
        email.style.border = '2px ridge red';
        valid.style.display = 'none';
        invalid.style.display = 'block';
        this.registerError = 'Nem létező email cím.';
      } else {
        email.style.border = '2px ridge green';
        valid.style.display = 'block';
        invalid.style.display = 'none';
        this.registerError = undefined;
      }
    });
  }

  emailValidatorDelete() {
    const email = <HTMLInputElement>document.querySelector('[id^="emailName"]');
    const valid = document.querySelector('.email-valid') as HTMLElement;
    const invalid = document.querySelector('.email-invalid') as HTMLElement;

    email.value = '';
    email.style.border = 'none';
    email.style.borderBottom = '2px solid rgba(0,0,0,0.2)';
    valid.style.display = 'none';
    invalid.style.display = 'none';
  }

  passwordValidator() {
    const password = <HTMLInputElement>(
      document.querySelector('[id^="passwordName"]')
    );
    password?.addEventListener('keyup' || 'keydown', () => {
      const valid = document.querySelector('.password-valid') as HTMLElement;
      const invalid = document.querySelector(
        '.password-invalid'
      ) as HTMLElement;
      const pattern = new RegExp(
        /^(?=.*\d)(?=.*[a-záéíűúőöüó])(?=.*[A-ZÁÉÍŰÚŐÖÜÓ])[0-9a-zzáéíűúőöüóA-ZÁÉÍŰÚŐÖÜÓ]{8,}$/
      );
      if (!pattern.test(password.value)) {
        password.style.border = '2px ridge red';
        valid.style.display = 'none';
        invalid.style.display = 'block';
        this.registerError =
          'Jelszónak tartalmaznia kell egy nagybetűt és egy számot.';
      } else {
        password.style.border = '2px ridge green';
        valid.style.display = 'block';
        invalid.style.display = 'none';
        this.registerError = undefined;
      }
    });
  }

  passwordValidatorDelete() {
    const password = <HTMLInputElement>(
      document.querySelector('[id^="passwordName"]')
    );
    const valid = document.querySelector('.password-valid') as HTMLElement;
    const invalid = document.querySelector('.password-invalid') as HTMLElement;

    password.value = '';
    password.style.border = 'none';
    password.style.borderBottom = '2px solid rgba(0,0,0,0.2)';
    valid.style.display = 'none';
    invalid.style.display = 'none';
  }

  passwordAgainValidator() {
    const passwordAgain = <HTMLInputElement>(
      document.querySelector('[id^="passwordAgainName"]')
    );

    const password = <HTMLInputElement>(
      document.querySelector('[id^="passwordName"]')
    );

    passwordAgain?.addEventListener('keyup' || 'keydown', () => {
      const valid = document.querySelector(
        '.password-again-valid'
      ) as HTMLElement;
      const invalid = document.querySelector(
        '.password-again-invalid'
      ) as HTMLElement;
      if (passwordAgain.value !== password.value) {
        passwordAgain.style.border = '2px ridge red';
        valid.style.display = 'none';
        invalid.style.display = 'block';
      } else {
        passwordAgain.style.border = '2px ridge green';
        valid.style.display = 'block';
        invalid.style.display = 'none';
      }
    });
  }

  passwordAgainValidatorDelete() {
    const passwordAgain = <HTMLInputElement>(
      document.querySelector('[id^="passwordAgainName"]')
    );
    const valid = document.querySelector(
      '.password-again-valid'
    ) as HTMLElement;
    const invalid = document.querySelector(
      '.password-again-invalid'
    ) as HTMLElement;

    passwordAgain.value = '';
    passwordAgain.style.border = 'none';
    passwordAgain.style.borderBottom = '2px solid rgba(0,0,0,0.2)';
    valid.style.display = 'none';
    invalid.style.display = 'none';
  }
}
