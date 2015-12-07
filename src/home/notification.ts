import {Component, View, Input, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'notification'
})
@View({
  directives: [CORE_DIRECTIVES],
  templateUrl: 'src/home/notification.html',
  styleUrls: ['src/home/notification.css']
})
export class Notification {

  @Input()
  model;

  getDate() {

    if (!this.model.date) {

      //TODO: use momentjs library to get local, nicely formatted date/time
      //var datetime = moment.tz(this.model.time);

      this.model.date = this.model.time;
    } else {
      return this.model.date;
    }

  }

  notificationIconMap = {
    "user": "glyphicon-user",
    "add": "glyphicon-plus-sign",
    "remove": "glyphicon-minus-sign",
    "meal": "glyphicon-cutlery",
    "note": "glyphicon-comment"
  };

  getIconClass(t: string) {
    var iconName = this.notificationIconMap[t];
    
    var classes = {};
    classes[iconName] = true;
    classes['nt-' + t] = true;

    return classes;
  }

}
