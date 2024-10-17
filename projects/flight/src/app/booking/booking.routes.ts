import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { FlightSearchComponent, FlightEditComponent, FlightBookingComponent } from "./feature-flight";
import { flightsResolverConfig, resolveFlights } from "./logic-flight/data-access/flight.resolver";
import { initialFlight } from "./logic-flight";
import { provideHttpClient, withInterceptorsFromDi, withRequestsMadeViaParent } from "@angular/common/http";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
      provideHttpClient(
        withInterceptorsFromDi(),
        withRequestsMadeViaParent()
      ),
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            data: {
              flight: { ...initialFlight, id: 999 }
            },
            // resolve: {
            //   flight: resolveFlights
            // }
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
