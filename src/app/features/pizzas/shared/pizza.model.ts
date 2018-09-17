import { Topping, PizzaSizes } from './pizza.enum';

export class Toppings {
  public static readonly ALL_TOPPINGS: Topping[] = [
    Topping.Anchovy,
    Topping.Bacon,
    Topping.Basil,
    Topping.Chili,
    Topping.Mozzarella,
    Topping.Mushroom,
    Topping.Olive,
    Topping.Onion,
    Topping.Pepper,
    Topping.Pepperoni,
    Topping.Sweetcorn,
    Topping.Tomato,
  ];
}

export interface IPizzaPrice{
  base: number,
  toppings: number,
}

export interface IPizzaPrices{
  small: IPizzaPrice,
  medium: IPizzaPrice,
  large: IPizzaPrice,
}

export class PizzaPrices{
  public static readonly SMALL: IPizzaPrice = {base: 9.99, toppings: 0.69};
  public static readonly MEDIUM: IPizzaPrice = {base: 12.99, toppings: 0.99};
  public static readonly LARGE: IPizzaPrice = {base: 16.99, toppings: 1.29};
  public static readonly ALL_PRICES: IPizzaPrices = {
    small: PizzaPrices.SMALL,
    medium: PizzaPrices.MEDIUM,
    large: PizzaPrices.LARGE,
  };
}

export class Pizza {
  public size: PizzaSizes;
  public toppings: Topping[];

  public static getPizzaPrices(size: PizzaSizes): IPizzaPrice {
    switch (size) {
      case PizzaSizes.Small: {
        return PizzaPrices.SMALL;
      }
      case PizzaSizes.Medium: {
        return PizzaPrices.MEDIUM;
      }
      case PizzaSizes.Large: {
        return PizzaPrices.LARGE;
      }
      default: {
        return PizzaPrices.SMALL;
      }
    }
  }

  public static getPizzaPizzaValue(size: PizzaSizes, toppings: Toppings[]): number {
    const price: IPizzaPrice = PizzaPrices.ALL_PRICES[size];

    return price.base + (price.toppings * toppings.length);
  }

  public static calculateTotal(pizzas: Pizza[]): number {
    let total: number = 0;
    for (const pizza of pizzas) {
      total += this.getPizzaPizzaValue(pizza.size, pizza.toppings);
    }

    return total;
  }
}
