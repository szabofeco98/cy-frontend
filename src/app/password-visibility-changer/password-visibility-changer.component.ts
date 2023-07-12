import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-password-visibility-changer',
  templateUrl: './password-visibility-changer.component.html',
  styleUrls: ['./password-visibility-changer.component.scss'],
})
export class PasswordVisibilityChangerComponent implements OnInit {
  public passwordIsVisible = signal(false);

  private matFormField = inject(MatFormField);

  private inputRef!: HTMLInputElement;

  public ngOnInit(): void {
    this.inputRef =
      this.matFormField._elementRef.nativeElement.querySelector('input');
  }

  @HostListener('click')
  public changeVisibility(): void {
    this.passwordIsVisible.set(!this.passwordIsVisible());
    this.inputRef.type = this.passwordIsVisible() ? 'text' : 'password';
  }
}
