import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'alert-list',
  standalone: true,
  templateUrl: './alert-list.component.html',
  imports: [CommonModule],
})
export class AlertList {
  constructor(private alertService: AlertService) {}

  alerts = this.alertService.alerts;

  remove(name?: string) {
    if (name) {
      this.alertService.removeAlert(name);
    }
  }
}
