import { Component, Input, OnChanges, SimpleChanges, inject, input, numberAttribute } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnChanges {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  id = input<number, string>(0, { transform: numberAttribute })

  @Input() flight = initialFlight;

  protected editForm = inject(FormBuilder).nonNullable.group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor() {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    /* this.route.data.subscribe(data => {
      const flight = data['flight'];

      if (flight) {
        this.editForm.patchValue(flight);
      }
    }); */
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
