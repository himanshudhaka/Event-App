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
  allEvents: any[] = [];
  events: any[] = [];
  dateEvents: any[] = [];
  type: string = 'club';
  dates: any[] = [new Date().toISOString().split('T')[0]];

  constructor(private dataService: DataService) {
    this.dataService
      .getEvents()
      .valueChanges()
      .subscribe((res) => {
        this.allEvents = res;
        this.events = this.allEvents.filter((eve) => {
          const da = this.formattedDate();
          return eve.date == da;
        });
      });
    this.dataService
      .getEventOnDate()
      .valueChanges()
      .subscribe((res) => {
        this.dateEvents = res;
      });
  }

  dateTimeUpdated($event: any) {
    console.log($event.detail.value);
    this.dataService
      .getEventOnDate($event.detail.value)
      .valueChanges()
      .subscribe((res) => {
        this.dateEvents = res;
      });
  }

  triggerEvent($event: any) {
    if ($event.detail.value === 'today') {
      this.events = this.allEvents.filter((eve) => {
        const da = this.formattedDate();
        return eve.date == da;
      });
    } else if ($event.detail.value === 'week') {
      this.events = this.allEvents.filter((eve) => {
        const da = this.formattedDate();
        return this.filterDatesByWeek(eve.date, da);
      });
    } else {
      this.events = this.allEvents.filter((eve) => {
        const da = this.formattedDate();
        // console.log(da + ' ===' + eve.date);
        return this.filterDatesByMonth(eve.date, da);
      });
    }
  }

  isDateInWeek(date: any, weekStart: any, weekEnd: any) {
    return date >= weekStart && date <= weekEnd;
  }

  filterDatesByWeek(dates: any, targetDate: any) {
    dates = new Date(dates);
    targetDate = new Date(targetDate);
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const currentDay = targetDate.getDay(); // Day of the week (0-6, where 0 is Sunday)
    const weekStart = new Date(targetDate - currentDay * oneDay); // Calculate week start date
    const weekEnd = new Date(weekStart.getTime() + 6 * oneDay); // Calculate week end date

    return this.isDateInWeek(dates, weekStart, weekEnd);
  }

  filterDatesByMonth(datesArray: any, targetDate: any) {
    datesArray = new Date(datesArray);
    targetDate = new Date(targetDate);

    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    return (
      datesArray.getFullYear() === targetYear &&
      datesArray.getMonth() === targetMonth
    );
  }

  filterDatesByToday(datesArray: any, targetDate: any) {
    const currentDate = targetDate.toDateString();

    return datesArray.filter(
      (date: any) => date.toDateString() === currentDate
    );
  }

  formattedDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
  }
}
