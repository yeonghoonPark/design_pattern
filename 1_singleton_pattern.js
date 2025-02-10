/**
 * singleton pattern
 *
 * singleton pattern이란,
 * 하나의 클래스에 오직 하나의 인스턴스만 가지는 패턴이다.
 * 하나의 클래스를 기반으로 여러 개의 개별적인 인스턴스를 만드는 게 가능하다.
 * 하지만, 하나의 클래스를 기반으로 단 하나의 인스턴스를 만들어 이를 기반으로 로직을 구성하는 데 사용된다.
 *
 * singleton pattern은 특정 클래스의 인스턴스가 오직 하나만 존재해야 하는 경우(유일성)에 주로 사용되며,
 * 클래스 내부의 자원이 많지 않고 단순한 경우와 테스트가 어려운 경우에는 사용하지 않는 것이 좋다.
 * 보통 데이터베이스 연결 모듈, 로그 관리에 많이 사용한다.
 *
 * ✅ 장점: 하나의 인스턴스만 생성하여 공유하기 때문에 인스턴스를 생성하는 비용이 줄어든다.
 *
 * ❗️ 단점: 의존성이 높아진다.
 *
 */

{
  // 1️⃣. 객체 리터럴을 이용한 singleton pattern
  // - 자바스크립트의 객체 리터럴 또는 빌트인 객체인 `Object`를 이용하면 어떤 객체와도 같지 않기 때문에 이 자체만으로 구현이 가능하다.

  const obj = { a: 1 };
  const obj2 = { a: 1 };

  obj === obj2; // false

  // 🔑. 객체 리터럴이나 빌트인 객체인 `Object`를 이용해 객체를 생성하면 단 하나의 인스턴스니 singleton pattern이라 볼 수 있다.
  // 하지만 실제 singleton pattern은 `class` 키워드를 이용하여 사용한다.
}

{
  // 2️⃣. class 키워드를 이용한 singleton pattern

  class Singleton {
    // 클래스의 정적 변수로, 클래스로 생성된 모든 인스턴스가 공유하는 변수이다.
    static instance = null;

    constructor() {
      // `Singleton` 클래스를 통해 한 번이라도 생성된 인스턴스가 있다면 항상 처음에 생성된 인스턴스를 참조하도록 하여 참조 값을 동일하게 한다.
      if (Singleton.instance) {
        return Singleton.instance;
      }

      // `Singleton` 클래스를 통해 한 번이라도 생성된 인스턴스가 없다면 클래스의 정적 변수의 참조 값을 `this`로 고정한다.
      Singleton.instance = this;
    }

    getInstance() {
      return this;
    }
  }

  const a = new Singleton();
  const b = new Singleton();

  a === b; // true
}

{
  // 👉. 데이터베이스 연결 모듈
  // singleton pattern은 데이터베이스 연결 모듈에 많이 사용한다.

  // 자바스크립트
  const URL = "mongodb://localhost:8080/project";
  const createConnection = (url) => ({ url });

  class DB {
    static instance = null;

    constructor(url) {
      if (!DB.instance) {
        DB.instance = createConnection(url);
      }

      return DB.instance;
    }

    connect() {
      return this.instance;
    }
  }

  const a = new DB(URL);
  const b = new DB(URL);

  a === b; // true

  // mongoose (노드), connect 함수 구현 (현재 파일에서는 `Mongoose`는 존재하지 않는다.)
  // Mongoose.prototype.connect = function (uri, options, callback) {
  //   const _mongoose = this instanceof Mongoose ? this : mongoose;
  //   const conn = _mongoose.connection;

  //   return _mongoose.promiseOrCallback(callback, (cb) => {
  //     conn.openUri(uri, options, (err) => {
  //       if (err !== null) {
  //         return cb(err);
  //       }

  //       return cb(null, _mongoose);
  //     });
  //   });
  // };
}

{
  // 🚨. singleton pattern의 단점
  // 싱글톤 패턴은 TDD(Test Driven Development)를 할 때 걸림돌이 된다.
  // TDD를 할 때 단위 테스트를 주로 하는데, 단위 테스트는 테스트가 서로 독립적이어야 하며 테스트를 어떤 순서로든 실행할 수 있어야 한다.
  // 🔑 하지만, 싱글톤 패턴은 생성된 하나의 인스턴스를 기반으로 구현하는 패턴이므로 테스트마다 독립적인 인스턴스를 만들기가 어렵다.
}

{
  // 👉. 의존성 주입
  // 📖. 의존성이란, 종속성이라고도 하며 A가 B에 의존성이 있다는 것은 B의 변경 사항에 대해 A 또한 변해야 한다는 것을 의미한다.
  // 싱글톤 패턴은 사용하기가 쉽고 굉장히 실용적이지만 모듈간의 결합을 강하게 만들 수 있다는 단점이 있다.
  // 이때 의존성 주입(DI, Dependency Injection)을 통해 모듈간의 결합을 조금 느슨하게 만들어 해결할 수 있다.
  // 메인 모듈이 직접적으로 하위 모듈에 대한 의존성을 주기보다는 중간에 의존성 주입자(Dependency Injector)가 위치하여,
  // 메인 모듈이 중간 모듈을 거쳐 간접적으로 하위 모듈에게 의존성을 주입하는 방식이다.
  // 메인 모듈은 하위 모듈에 대한 의존성이 떨어지며 이를 `디커플링(decoupling)`이라 한다.
  // 1️⃣. 의존성 주입의 장점
  // - 의존성을 낮춰 비교적 쉽게 교체할 수 있고 테스트하기가 수월하다.
  // 2️⃣. 의존성 주입의 단점
  // - 모듈들이 더욱 분리되므로 클래스 수가 늘어나 복잡성이 증가할 수 있으며, 약간의 런타임 패널티가 생길 수 있다.
  // 3️⃣. 의존성 주입의 원칙
  // - 🔑 상위 모듈은 하위 모듈에서 어떠한 것도 가져오지 않아야 한다. 또한 둘 다 추상화에 의존해야 하며, 이때 추상화는 세부 사항에 의존하지 말아야 한다.
}
