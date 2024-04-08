import { Injectable } from '@angular/core';
import { Alert } from '../interfaces/alert';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: Alert[] = [];

  findAlertIndex(name: string | undefined) {
    return this.alerts.findIndex((e) => e.name === name);
  }

  addAlert(alert: Alert) {
    if (this.findAlertIndex(alert.name) === -1) {
      this.alerts.push(alert);
    }
  }

  removeAlert(name: string) {
    let index = this.findAlertIndex(name);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }
}
