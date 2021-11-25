import { Flight } from '@flight-workspace/flight-lib';
import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  passenger: Record<
    number,
    {
      id: number,
      name: string,
      firstName: string
    }>;
  bookings: {
    passengerId: number,
    flightId: number
  }[];
  user: {
    name: string,
    passengerId: number
  };
}

export interface FlightBookingRootState {
  flightBooking: State;
}

export const initialState: State = {
  flights: [],
  passenger: {
    1: { id: 1, name: 'Smith', firstName: 'Anne' }
  },
  bookings: [
    { passengerId: 1, flightId: 3 },
    { passengerId: 1, flightId: 5 }
  ],
  user: { name: 'anne.smith', passengerId: 1 }
};


export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoadedSuccess, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),
  on(FlightBookingActions.flightUpdate, (state, action) => {
    const flights = state.flights.map(
      f => f.id === action.flight.id ? action.flight : f
    );
    return { ...state, flights };
  })
);
