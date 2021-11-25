import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '../../+state';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
  id: string | undefined;
  showDetails: string | undefined;
  showWarning = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    this.store.select(selectRouteParams).subscribe(console.log);
  }

  decide(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    answer: boolean
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}
}
