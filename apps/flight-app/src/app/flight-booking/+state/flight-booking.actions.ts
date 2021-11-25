import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';


export const flightsLoad = createAction(
  '[FlightBooking] Flights load',
  props<{ from: string, to: string, urgent: boolean }>()
);

export const flightUpdate = createAction(
  '[FlightBooking] Flight update',
  props<{ flight: Flight }>()
);

export const flightsLoadedSuccess = createAction(
  '[FlightBooking] Flights loaded success',
  props<{ flights: Flight[] }>()
);

export const flightsLoadedFailure = createAction(
  '[FlightBooking] Flights loaded failure',
  props<{ error: any }>()
);
