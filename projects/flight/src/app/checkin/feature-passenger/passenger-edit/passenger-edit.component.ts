import { NgIf } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation';
import { initialPassenger } from '../../logic-passenger';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  destroyRef = inject(DestroyRef);
  passengerService = inject(PassengerService);

  id = input.required<number>();
  passenger = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.passengerService.findById(id)),
      // takeUntilDestroyed(this.destroyRef)
    ), { initialValue: initialPassenger }
  );

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  constructor() {
    effect(
      () => this.editForm.patchValue(this.passenger())
    );
    this.destroyRef.onDestroy(
      () => console.log('DESTROY Passenger Edit')
    );
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
