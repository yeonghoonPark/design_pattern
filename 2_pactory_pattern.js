"use strict";

/**
 * factory pattern
 *
 * factory pattern이란,
 * 객체를 사용하는 코드에서 객체의 뼈대를 결정하는 부분과 객체 생성 시 구체적인 사항을 결정하는 패턴이다.
 * 즉, 상속 관계에 있는 두 클래스에서 상위 클래스와 하위 클래스를 나눈다.
 * 상위 클래스가 객체의 뼈대를 결정하고,
 * 하위 클래스가 객체 생성에 관한 구체적인 내용을 결정한다.
 *
 * 예를 들어 상위 클래스가 커피 공장이라고 가정한다면,
 * 아메리카노 레시피, 라떼 레시피, 우유 레시피와 같은 구체적인 내용은 하위 클래스가 담당하여
 * 상위 클래스인 커피 공장에서 각 레시피에 대한 정보를 전달 받아 커피를 생산하는 공정이라고 할 수 있다.
 *
 * 객체 생성 방식을 추상화하여, 클라이언트 코드의 유연성을 높이는 이점이 있다.
 *
 * ✅ 장점: 상위 클래스와 하위 클래스가 분리되기 때문에 느슨한 결합을 가져 유연성을 갖고 유지 보수성이 증가한다.
 *
 * ❗️ 단점: ??
 *
 */

{
  // 1️⃣. new Object()를 이용한 factory pattern
  // - new Object()는 하나의 공장이다, 전달되는 인자의 타입에 따라 다른 타입의 객체를 생성한다.
  // 즉, 전달받는 값에 따라 다른 객체를 생성하며 인스턴스의 타입을 결정한다.

  const num = new Object(1);
  const str = new Object("a");

  num.constructor.name; // Number
  str.constructor.name; // String
}

{
  // 2️⃣. class 키워드를 이용한 factory pattern

  // 상위 클래스, 인스턴스의 뼈대를 결정
  class CoffeeFactory {
    // 정적 메서드를 사용하면 객체를 만들지 않고 클래스 자체에서 호출이 가능하며, 해당 메서드의 대한 메모리 할당을 한 번만 할 수 있다.
    static createCoffeeFactory(type) {
      const factory = factoryList[type]; // type에 따른 class
      return factory.createCoffee(); // 선택된 class의 메서드 호출
    }
  }

  class Latte {
    constructor() {
      this.name = "latte";
    }
  }

  class Espresso {
    constructor() {
      this.name = "espresso";
    }
  }

  // 하위 클래스, 인스턴스의 구체적인 내용을 결정
  class LatteFactory extends CoffeeFactory {
    // 객체 생성의 구체적인 방식을 캡슐화하여 클라이언트 코드에서 숨기는 역할 (추상화)
    static createCoffee() {
      return new Latte(); // Latte 인스턴스 생성
    }
  }

  // 하위 클래스, 인스턴스의 구체적인 내용을 결정
  class EspressoFactory extends CoffeeFactory {
    // 객체 생성의 구체적인 방식을 캡슐화하여 클라이언트 코드에서 숨기는 역할 (추상화)
    static createCoffee() {
      return new Espresso(); // Espresso 인스턴스 생성
    }
  }

  const factoryList = { LatteFactory, EspressoFactory };

  const main = () => {
    // 정적 메서드인 `createCoffeeFactory`는 객체를 생성하지 않고 클래스를 통해 바로 호출할 수 있다.
    const coffee = CoffeeFactory.createCoffeeFactory("EspressoFactory");

    console.log(coffee); // espresso
  };

  main();
}
