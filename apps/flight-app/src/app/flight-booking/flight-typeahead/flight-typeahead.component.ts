import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  flights$: Observable<Flight[]> = EMPTY;
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Stream 3: Result stream to render flights
    this.flights$ =
      // Stream 1: Changes to the input control
      // Trigger
      // Data Provider
      this.control.valueChanges.pipe(
        // Filtering STARTS
        filter(city => city.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        // Filtering END
        // Side Effect
        tap(() => this.loading = true),
        // Stream 2: HTTP call to get flights
        switchMap(city => this.load(city).pipe(
          catchError(() => of([]))
        )),
        // Side Effect
        tap(() => this.loading = false)
      );
  }

  load(from: string): Observable<Flight[]> {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

}
