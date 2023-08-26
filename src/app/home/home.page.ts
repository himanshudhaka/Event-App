import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { DataService } from '../services/data.service';
import { Timestamp } from '@firebase/firestore';

// import {subscribe} from
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events: any[] = [];
  dateEvents: any[] = [];
  type: string = 'club';
  dates: any[] = [new Date().toISOString().split('T')[0]];
  viewMonth = '';
  @ViewChild(CalendarComponent) cal!: CalendarComponent;
  public multiSelect: Boolean = true;
  constructor(private dataService: DataService) {
    this.dataService
      .getEvents()
      .valueChanges()
      .subscribe((res) => {
        this.events = res;
      });
    this.dataService
      .getEventOnDate()
      .valueChanges()
      .subscribe((res) => {
        this.dateEvents = res;
      });
  }
  onChange($event: any) {
    console.log($event);
  }

  dateTimeUpdated($event: any) {
    this.dataService
      .getEventOnDate($event.detail.value)
      .valueChanges()
      .subscribe((res) => {
        this.dateEvents = res;
      });
  }

  preMonth() {
    console.log('jnvd');
    this.cal.slidePrev();
  }
  nextMonth() {
    this.cal.slideNext();
  }

  onCurrentChanged(ev: Date) {
    console.log('Currently viewed date: ' + ev);
  }
}
