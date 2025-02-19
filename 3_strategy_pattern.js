"use strict";

/**
 * strategy pattern
 *
 * strategy pattern이란 policy pattern이라고도 하며,
 * 객체의 행위를 바꾸고 싶은 경우,
 * '직접' 수정하지 않고 전략이라고 부르는 '캡슐화한 알고리즘'을 컨텍스트 안에서 바꿔주면서 상호 교체가 가능하게 만드는 패턴이다.
 *
 * ✅ 장점
 *  1. 유연성 및 확장성: 새로운 알고리즘을 추가하기 위해 기존 코드를 수정하지 않고, 새로운 전략 클래스를 추가하면 된다.
 *  2. 재사용성: 다양한 컨텍스트에서 동일한 전략을 재사용할 수 있다.
 *  3. 교체 용이성: 컨텍스트는 필요에 따라 전략을 바꿀 수 있다. 특히 사용자의 설정이나 환경에 따라 동작을 변경해야 하는 경우 유용하다.
 *  4. 가독성 및 유지보수: 코드가 모듈화되어 있어 가독성과 유지보수성이 향상된다.
 *  5. 테스트 용이성: 각 전략 클래스는 독립적으로 테스트할 수 있다.
 *
 * ❗️ 단점
 *  1. 클래스 증가: 많은 알고리즘을 지원해야 하는 경우 클래스의 수가 급증할 수 있다.
 *  2. 클라이언트 코드의 복잡성: 클라이언트는 다양한 전략의 존재를 이해하고 있어야 한다. 팩토리 패턴과 함께 사용하면 해당 문제를 완화할 수 있다.
 *  3. 과도한 사용: 모든 상황에서 전략 패턴을 사용할 필요는 없다. 단순한 if-else 또는 switch 문으로 해결할 수 있는 경우 전략 패턴을 사용하지 않는 것이 좋다.
 *
 * 🔑 strategy pattern은
 * 객체의 행위를 해당 인스턴스에서 직접 수정하지 않고 행위(알고리즘)를 별도로 캡슐화하여 객체의 행위를 유연하게 수정하고 확장하는 유용한 도구이다.
 * 하지만, 클래스 수 증가 및 클라이언트 코드 복잡성과 같은 단점을 고려해야한다.
 *
 */

// 행동(날기) 인터페이스 (전략)
class FlyBehavior {
  fly() {
    throw new Error("fly() 메서드를 구현해야 합니다.");
  }
}

// 행동(꽥꽥거리기) 인터페이스 (전략)
class QuackBehavior {
  quack() {
    throw new Error("quack() 메서드를 구현해야 합니다.");
  }
}

// 구체적인 행동(날개로 날기) 캡슐화 (구체적인 전략)
class FlyWithWings extends FlyBehavior {
  fly() {
    console.log("나는 날개로 납니다!");
  }
}

// 구체적인 행동(날 수 없음) 캡슐화 (구체적인 전략)
class FlyNoWay extends FlyBehavior {
  fly() {
    console.log("나는 날 수 없습니다.");
  }
}

// 구체적인 행동(꽥꽥) 캡슐화 (구체적인 전략)
class Quack extends QuackBehavior {
  quack() {
    console.log("꽥꽥");
  }
}

// 구체적인 행동(울지 않음) 캡슐화 (구체적인 전략)
class MuteQuack extends QuackBehavior {
  quack() {
    console.log(".....");
  }
}

// 오리 클래스 (컨텍스트)
class Duck {
  constructor(flyBehavior, quackBehavior) {
    this.flyBehavior = flyBehavior;
    this.quackBehavior = quackBehavior;
  }

  display() {
    console.log("오리 등장!!");
  }

  hide() {
    console.log("오리 퇴장..");
  }

  performFly() {
    this.flyBehavior.fly();
  }

  performQuack() {
    this.quackBehavior.quack();
  }

  swim() {
    console.log("수영 중");
  }
}

// 오리 종류 생성 (청둥오리, 고무오리)
const mallard = new Duck(new FlyWithWings(), new Quack());
const rubberDuck = new Duck(new FlyNoWay(), new MuteQuack());

// 청둥오리 동작 실행
mallard.display();
mallard.performFly();
mallard.performQuack();
mallard.swim();
mallard.hide();

// 고무오리 동작 실행
rubberDuck.display();
rubberDuck.performFly();
rubberDuck.performQuack();
rubberDuck.swim();
rubberDuck.hide();

// 🔑 `Duck` 클래스로 생성된 인스턴스의 행위(날기, 꽥꽥거리기)를 직접 수정하지 않고,
// `FlyBehavior`와 `QuackBehavior` 인터페이스를 구현한 구체적인 전략 클래스들(`FlyWithWings`, FlyNoWay`, `Quack`, `MuteQuack`)을
// 변경하거나 교체함으로써 `Duck` 인스턴스의 행위를 간접적으로 변경하여 상호작용을 하는 것이 핵심이다.
// `Duck` 인스턴스 자체는 `FlyBehavior`와 `QuackBehavior`를 참조하고 있을 뿐, 그 객체의 내부에는 관여하지 않는다.
// 따라서 `Duck` 인스턴스를 생성한 후에도 언제든지 인자로 전달되는 `flyBehavior`와 `quackBehavior` 속성에 다른 구체적인 전략 객체를 할당한다면
// `Duck` 인스턴스의 행위 자체를 변경하는 유연성을 가지며 이는 유지보수와 테스트에 용이하다.
