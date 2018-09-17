import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
    selector: 'pizza-creator',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pizza-creator.component.html',
  })

  export class PizzaCreatorComponent{
    @Input() public pizzas: FormArray;

    @Output() public add: EventEmitter<void> = new EventEmitter<void>();
    @Output() public remove: EventEmitter<number> = new EventEmitter<number>();
    @Output() public toggle: EventEmitter<number> = new EventEmitter<number>();

    public activePizza: number = 0;

    get openPizza(): number {
      return this.activePizza;
    }
    set openPizza(index: number) {
      this.activePizza = index;
      if (index >= 0) {
        this.toggle.emit(index);
      }
    }
    public onAdd(): void {
      this.add.emit();
      this.openPizza = this.pizzas.length - 1;
    }
    public onRemove(index: number): void {
      this.remove.emit(index);
      this.openPizza = this.pizzas.length - 1;
    }

    public onToggle(index: number): void {
      this.toggle.emit(index);
      if (index === this.activePizza) {
        this.activePizza = -1;
      }else {
        this.activePizza = index;
      }
    }
  }
