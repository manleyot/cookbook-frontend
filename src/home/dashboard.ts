import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

import {Pageable} from './pageable';
import {Notification} from './notification';
import { NotificationService } from '../services/NotificationService';

@Component({
  selector: 'dashboard'
})
@View({
  templateUrl: 'src/home/dashboard.html',
  styleUrls: ['src/home/dashboard.css'],
  directives: [CORE_DIRECTIVES, Notification]
})
export class Dashboard extends Pageable {

  notificationList:any[] = [];

  constructor(public notifications: NotificationService) {
    super();
    this.updateNotificationList();
  }

  updateNotificationList() {
    this.notifications.getNotifications (
        this.pageSize, this.currentPage * this.pageSize,
        (result) => {
          this.notificationList = result.notifications;
          this.enableNext = result.more;
          this.enablePrev = this.currentPage != 0;
        });
  }

  onPreviousPage() {
    this.updateNotificationList();
  }

  onNextPage() {
    this.updateNotificationList();
  }

}
