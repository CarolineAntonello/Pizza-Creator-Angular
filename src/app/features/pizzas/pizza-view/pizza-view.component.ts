import { PizzaSizes } from './../shared/pizza.enum';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IPizzaPrices, PizzaPrices, Pizza } from '../shared/pizza.model';
import { PizzaValidators } from '../shared/pizza.validator';

@Component({
    selector: 'pizza-view',
    templateUrl: './pizza-view.component.html',
})
export class PizzaViewComponent implements OnInit, OnChanges{
    public static MIN_LENGTH: number = 9;
    public activePizza: number = 0;
    public total: string = '0';
    public prices: IPizzaPrices = PizzaPrices.ALL_PRICES;
    public form: FormGroup = this.fb.group({
        details: this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            confirm: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            address: ['', [Validators.required, Validators.minLength(PizzaViewComponent.MIN_LENGTH)]],
            postcode: ['', [Validators.required, Validators.minLength(PizzaViewComponent.MIN_LENGTH)]],
        }, { validator: PizzaValidators.checkEmailsMatch }),
        pizzas: this.fb.array([
            this.createPizza(),
        ]),
    });
    constructor(private fb: FormBuilder) { }
     public ngOnInit(): void {
        const control: FormArray = this.form.get('pizzas') as FormArray;
        this.calculateTotalValuePizza(control.value);
        this.ngOnChanges();
    }
     public ngOnChanges(): void {
        this.form.valueChanges.subscribe(() => {
            const control: FormArray = this.form.get('pizzas') as FormArray;
            this.calculateTotalValuePizza(control.value);
        });
    }
    public createPizza(): FormGroup {
        return this.fb.group({
            size: [PizzaSizes.Small, Validators.required],
            toppings: [[]],
        });
    }
    public addPizza(): void {
        const control: FormArray = this.form.get('pizzas') as FormArray;
        control.push(this.createPizza());
        this.activePizza = control.length -1;
    }
    public removePizza(index: number): void {
        const control: FormArray = this.form.get('pizzas') as FormArray;
        control.removeAt(index);
        this.activePizza = control.length -1;
    }

    public calculateTotalValuePizza(pizza: Pizza[]): void {
        this.total = Pizza.calculateTotal(pizza).toString();
    }

    public togglePizza(index: number): void {
        this.activePizza = index;
    }

    public createOrder(orderFormModel: FormGroup): void {
        //
    }

}
