import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IPizzaPrice, Pizza, Toppings } from '../../shared/pizza.model';
import { PizzaSizes } from '../../shared/pizza.enum';

@Component({
    selector: 'pizza-summary',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pizza-summary.component.html',
  })

  export class PizzaSummaryComponent{
    @Input() public pizzas: FormArray;
    @Input() public total: string;

    public getPrices(size: PizzaSizes): IPizzaPrice {
        return Pizza.getPizzaPrices(size);
    }

  }
