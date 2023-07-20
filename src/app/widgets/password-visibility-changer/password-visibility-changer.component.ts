import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-password-visibility-changer',
  templateUrl: './password-visibility-changer.component.html',
  styleUrls: ['./password-visibility-changer.component.scss'],
  standalone: true,
  imports: [CommonModule, InputComponent],
})
export class PasswordVisibilityChangerComponent {
  public passwordIsVisible = signal(false);

  private input = inject(InputComponent);

  public constructor() {
    this.input.type = 'password';
  }

  @HostListener('click')
  public changeVisibility(): void {
    this.passwordIsVisible.set(!this.passwordIsVisible());
    this.input.type = this.passwordIsVisible() ? 'text' : 'password';
  }
}
