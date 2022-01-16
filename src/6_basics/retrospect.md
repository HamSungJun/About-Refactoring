## Retrospect

### `Extract Function`

- 목적과 구현을 분리하자.

- 함수 네이밍은 `어떻게` 보다는 `무엇을` 하는지로 작성하자.

- 하나의 함수는 한가지 값을 반환하도록 작성하자.

### `Inline Function`

- 과도한 간접호출이 존재한다면 간접 함수를 호출하는 호출자 함수의 본문에 간접 함수의 본문을 삽입하자.

- 함수의 본문이 이미 충분히 명료하고 다중의 목적을 가지고 있지 않다면 추출된 함수본문을 다시 인라인하는 것도 방법이다.

### `Extract Variable`

- 때로는 계산식이 너무 복잡할 때 변수 추출하기를 사용할 수 있다.

- `Class` 선언을 통해 시맨틱과 문맥을 갖는 메소드와 변수를 추출할 수 있다.

### `Inline Variable`

- 새로운 지역변수로 생성 및 할당하여 사용하던 로직에서 더이상 필요성이 없다고 판단될 때 진행한다.

### `Change Function Declaration`

- 함수의 이름, 파라미터의 이름을 네이밍 할때 최대한 독립적으로 생각될 수 있는 것으로 지정하자. 결합도를 낮추는 효과를 갖는다.

- 공개 API를 변경할 계획이라면 `Deprecated` 태그를 부여하고 사용하던 클라이언트가 기존의 것에서 다 이전하였다고 판단되면 해당 태그가 붙여진 리소스를 제거한다.

- 요구사항의 변경으로 인해 클래스 메소드의 동작을 점진적으로 변경해야 한다면 아래의 조치를 취해볼 수 있다.

```js
// 기존에는 큐 자료구조의 예약 목록 리스트를 이용했다. 다른 관계를 갖는 많은 클래스에서 Restaurant.addReservation() 함수를 호출한다.
class Restaurant {
  constructor() {}
  addReservation(order) {
    this.reservations.push(order);
  }
}
// 추후 우선순위를 갖는 예약 목록 리스트로 동작하도록 요구사항이 변경되었다.
class Restaurant {
  constructor() {}
  addReservation(order) {
    this.__REFACTORING__addReservation(order);
  }
  __REFACTORING__addReservation(order) {
    /* ... */
  }
}
// 다른 관계 클래스에서 요구사항의 변경을 인식하였고 이전할 준비가 되었다면 기존의 메소드를 걷어내고 새로운 메소드를 사용하기 시작한다.
class Restaurant {
  constructor() {}
  addReservation(order) {
    /* Priority Queue Implementation */
  }
}
```

### `Encapsulate Variable`

- 변수가 참조되는 유효범위를 최대한 좁힐 수 있도록 노력한다.

- 변수를 접근하고 변경할 수 있는 수단을 특정 함수를 통해서만 가능하도록 만드는 것도 방법이다. (`Redux`, `Vuex`)

- `불변성`을 갖는 데이터를 활용하는 것도 좋은 방법이다. (`ImmutableJS`, `ImmerJS`)

### `Rename Variable`

- `무엇`, `목적`이 명확히 드러나는 변수 네이밍을 사용한다.
