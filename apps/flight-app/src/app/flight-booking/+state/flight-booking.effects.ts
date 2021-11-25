import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';



@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() =>
    // Stream 1: actions
    // Trigger
    // Data Provider
    this.actions$.pipe(
      // Filtering
      ofType(FlightBookingActions.flightsLoad),
      // Stream 2: load Flights -> HTTP
      switchMap(action => this.flightService.find(action.from, action.to, action.urgent).pipe(
        // Transformation: new action to be dispatched
        map(flights => FlightBookingActions.flightsLoadedSuccess({ flights })),
        // Error Handlung: dispatch failure action
        catchError(err => of(FlightBookingActions.flightsLoadedFailure({ error: err })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
