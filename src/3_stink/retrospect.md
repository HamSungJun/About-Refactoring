## Retrospect

### 이번 챕터의 리팩토링 기법

- 기이한 이름

    - [변수명을 잘 짓기 위한 몸부림](https://brunch.co.kr/@wapj2000/29)

    - [좋은 코드를 위한 자바 변수명 네이밍](https://tecoble.techcourse.co.kr/post/2020-04-24-variable_naming/)

    - [변수, 함수 이름 잘 짓기](https://makefortune2.tistory.com/266)

    ```js
    // 변수나 함수의 이름은 축약 표현을 통해 작성할 바에는 길고 디테일하지만 목적과 의도가 명확한것이 낫다.
    const acfs = 10 // Bad.
    const appleCountForSale = 10 // Good.

    const getData = () => {} // Bad.
    const fetchUserInfo = () => {} // Good.
    ```

- 중복 코드

    - [중복 코드가 발생하는 이유](https://effectiveprogramming.tistory.com/entry/%EC%BD%94%EB%93%9C-%EC%A4%91%EB%B3%B5-%EC%A4%91%EB%B3%B5-%EC%BD%94%EB%93%9C%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

    - [클래스 중복코드](https://underground2.tistory.com/54)

    - [코드의 구린내와 해결법](https://joont92.github.io/refactoring/%EC%BD%94%EB%93%9C%EC%9D%98-%EA%B5%AC%EB%A6%B0%EB%82%B4%EC%99%80-%ED%95%B4%EA%B2%B0%EB%B2%95/)

    ```js
    // 한 클래스 내에 중복되는 코드가 존재하는 경우, 메소드 추출 기법을 통해 제거한다.

    // [Before]
    class Person {

        constructor(){}

        moveToHere(x,y){
            /* ... */
            this.posX = x
            this.posY = y
            /* ... */
        }

        moveToThere(x,y) {
            /* ... */
            this.posX = x
            this.posY = y
            /* ... */
        }

    }

    // [After]
    class Person {

        constructor(){}

        moveTo(x,y) {
            this.posX = x
            this.posY = y
        }
        moveToHere(x,y){
            /* ... */
            this.moveTo(x,y)
            /* ... */
        }

        moveToThere(x,y) {
            /* ... */
            this.moveTo(x,y)
            /* ... */
        }

    }
    ```

    ```js
    // 여러 서브 클래스에서 동일한 소스코드가 하나의 메소드로 구현된 경우, 메소드 상향 기법을 통해 해당 문장을 슈퍼 클래스로 이전 할 수 있다.

    // [Before]
    class Animal {}
    class Person extends Animal {
        move(x,y){
            this.posX = x
            this.posY = y
        }
    }
    class Chicken extends Animal {
        move(x,y){
            this.posX = x
            this.posY = y
        }
    }

    // [After]
    class Animal {
        move(x,y){
            this.posX = x
            this.posY = y
        }
    }
    class Person extends Animal {}
    class Chicken extends Animal {}
    ```

    ```js
    // 상관관계가 없는 클래스에서 중복된 소스코드 로직이 사용되는 경우 클래스나 모듈로 떼어내어 사용할 수 있다.

    // [Before]
    class FruitMarket {
        getAverageAnnualSales () {
            return soldFruitCount / 365
        }
    }
    class ComicBook {
        getAveragePreference () {
            return totalPerferenceScore / totalVotedPersonCount
        }
    }

    // [After]
    import { avg } from 'utils/math'

    class FruitMarket {
        getAverageAnnualSales () {
            return avg(soldFruitCount,365)
        }
    }
    class ComicBook {
        getAveragePreference () {
            return avg(totalPerferenceScore,totalVotedPersonCount)
        }
    }
    ```

- 긴 함수

    - 함수 추출하기

    - [임시 변수를 질의 함수로 바꾸기](https://yujeongjeon.github.io/Chapter%2007%20-%20%EC%BA%A1%EC%8A%90%ED%99%94/pages/7-4.html)

    - 매개 변수를 객체로 만들어서 넘기기

        - [자바스크립트 객체 파라미터 예외 처리](https://creampuffy.tistory.com/118)

    - 함수를 명령으로 바꾸기

    - [조건문 분해하기](https://yujeongjeon.github.io/Chapter%2010%20-%20%EC%A1%B0%EA%B1%B4%EB%B6%80%20%EB%A1%9C%EC%A7%81%20%EA%B0%84%EC%86%8C%ED%99%94/pages/10-1.html)

    - [조건부 로직을 다형성으로 바꾸기](https://github.com/HamSungJun/About-Refactoring/blob/master/src/1_statement/book/step6.js#L65)

    - [반복문 쪼개기](https://yujeongjeon.github.io/Chapter%2008%20-%20%EA%B8%B0%EB%8A%A5%20%EC%9D%B4%EB%8F%99/pages/8-7.html)

- 긴 매개변수 목록

    - 매개변수 객체 만들기

    - [플래그 인수 제거하기](https://blog.daum.net/question0921/1106)

    - 공통적으로 사용되는 매개변수가 많은 경우, 클래스로 묶어 클래스 필드로 이용하기

- 전역 데이터

    - [MDN Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

    - [모듈 패턴](https://xzio.tistory.com/897)

- 가변 데이터

    - 변수 캡슐화하기

        - [Redux Dispatch](https://redux.js.org/api/store#dispatchaction)
        ```js
        // 정해놓은 함수를 거쳐야만 값을 수정할 수 있도록 하기
        import { createStore } from 'redux'
        const store = createStore(todos, ['Use Redux'])

        function addTodo(text) {
        return {
            type: 'ADD_TODO',
            text
        }
        }

        store.dispatch(addTodo('Read the docs'))
        store.dispatch(addTodo('Read about the middleware'))
        ```

        - [Vuex Dispatch](https://vuex.vuejs.org/kr/guide/actions.html#%E1%84%83%E1%85%B5%E1%84%89%E1%85%B3%E1%84%91%E1%85%A2%E1%84%8E%E1%85%B5-%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB)
        ```js
        store.dispatch('increment')
        ```

    - 변수 쪼개기

    - 문장 슬라이드하기

    - 함수 추출하기

    - 질의 함수와 변경 함수 분리하기

    - 세터 제거하기

    - 파생 변수를 질의 함수로 바꾸기

    - 여러 함수를 클래스로 묶기

    - 여러 함수를 변환 함수로 묶기

    - 참조를 값으로 바꾸기
    
        - https://eunjin3786.tistory.com/382

        - https://yujeongjeon.github.io/Chapter%2009%20-%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EC%A1%B0%EC%A7%81%ED%99%94/pages/9-4.html

- 뒤엉킨 변경

    - 단일 책임 원칙 (Single Responsibility Principle)

    - > 단일 책임 원칙은 SOLID 원칙의 첫번째, S를 담당합니다. 이 원칙의 정의는 모든 클래스는 단 한 가지의 책임만을 가지고, 클래스 안에 정의되어 있는 모든 기능은 하나의 책임을 수행하는데 집중되어 있어야 한다는 것입니다. 쉽게 말해, 하나의 클래스로 너무 많은 일을 하지 말고 딱 한 가지 책임만 수행하라는 뜻을 가지고 있습니다.
        
        - [단일 책임 원칙이란?](https://steady-coding.tistory.com/370)

        - [단일 책임 원칙](https://velog.io/@tataki26/%EB%8B%A8%EC%9D%BC-%EC%B1%85%EC%9E%84-%EC%9B%90%EC%B9%99)

- [산탄총 수술](https://wikidocs.net/597)

    - > 단일 책임 원칙과는 다르게 하나의 집중된 책임이 필요 이상으로 여러 클래스에 분산되어 있어서, 하나의 작은 수정에도 여러 클래스를 자잘하게 수정해야 하는 경우라고 볼 수 있다.

- 기능 편애

    - [리팩토링이 필요한 경우 - 기능 편애](https://kangraemin.github.io/general%20study/2021/04/06/need-to-refactor/)

- 데이터 뭉치

    - [긴 매개변수 목록을 클래스로 묶어 소스코드에서 데이터 뭉치가 여러곳에서 나타는 현상을 방지](http://dj6316.torchpad.com/%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%28refactoring%29/CH.03+%EC%BD%94%EB%93%9C%EC%9D%98+%EA%B5%AC%EB%A6%B0%EB%82%B4/4-1.%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%AD%89%EC%B9%98%28Data+Clumps%29)

- 기본형 집착

    - [기본형 집착 예시 및 해결](https://enterprisecraftsmanship.com/posts/functional-c-primitive-obsession/)

- 반복되는 switch 문

    > 다형성을 갖는 클래스로 대응하라는 내용이 있는데 사실 달성하고자 하는 목적은 비슷해서 왜 꼭 로직을 클래스로 빼내야 할까 한번 깊게 생각해봤다. 나름 클래스를 사용하지 않고 (다형성) Switch 로직이 담겨있는 추출된 함수만 하나 사용한다고 예를 들어보자, 조건부 로직에서 사용되는 공통 로직은(다형성에서는 부모 클래스) Swtich 문의 상단 혹은 하단에 공통적으로 처리될 것이며 Case 마다 적용되어야 할 로직은 각각의 케이스 블록에 위치할 것이다. 자 이미 코드의 중앙화 현상은 발생하기 시작했다. 다형성으로 작업하는 과정을 통해 Swtich 문을 감싼 함수블록의 소스 코드 중앙화를 각각의 클래스 파일에 코드 스플리팅 할 수 있으며 SRP 도 달성 가능해진다. 특정 케이스에 해당하는 로직은 해당 클래스 파일의 소스코드만 확인하면 되므로 이후 유지보수도 용이해진다.

- Loops

    - [선언형 프로그래밍과 명령형 프로그래밍](https://egas.tistory.com/2)

    - [명령형 프로그래밍 VS 선언형 프로그래밍](https://boxfoxs.tistory.com/430)

- Lazy Element

    - 프로그램을 리팩토링 하는 과정에서 함수 역할이 메인 코드를 일부 떼온 소스코드일 뿐이거나 클래스의 역할이 지나치게 작다면 이것을 계층 합치기를 통해 처리할 수 있다.

- 추측성 일반화

    - 마치 언젠가 사용될 것이라 판단되는 함수 파라미터, 분기 케이스 등을 실제로 사용되기 전에 미리 추가해놓은 행위를 의미한다. 미리 작성해놓은 로직이 추후 히트가 된다면 바람직한 일이겠지만 그렇지 않은 경우, 전체 로직에서 해당 문장이 왜 작성되었는지 추가적으로 판단해야 한다. 필요한 것은 그때 작성하면 된다. 사용하지 않는 코드는 깔끔하게 제거하도록 하자.

- 임시 필드

    - 추측성 일반화와 맥락을 같이하는 내용이라고 본다. 특정 클래스에서 값이 할당되거나 그렇지 않을 수 있는 필드가 있다고 하자. 일반적으로 클래스 인스턴스가 활성화 되었을 때 모든 클래스 필드가 활성화 되어있다는 것을 기본적으로 기대하기 때문에 이런 부분은 추후 로직 파악에서 어려움을 줄 가능성이 높다. 임시 필드만 특별하게 취급하는 클래스를 하나 작성하고 그 클래스에 임시 필드와 연관된 함수들을 모아두는게 좋다.

- 메시지 체인

    - 클래스가 어떤 특정한 다른 클래스의 값을 얻기 위해서 `A.B.C.name` 처럼 연쇄적으로 타고 들어가는 상황을 의미한다. 이때 중간 단계의 어떤 클래스이든지 원하는 프로퍼티에 접근하는 별도의 메소드를 만들어서 구성된 엑세스 체인의 식별자를 생략할 수 있는 기법을 의미한다.

- 중개자

    - 기본 관념은 클래스 내부적으로 처리하는 일은 해당 클래스의 관심사이며 해당 클래스를 가져다 쓰는 입장에서는 필요한 작업을 요청 및 반환 받는 것 뿐이다. 클래스간의 책임과 역할 구조를 잘 판단하여 중개자가 필요한 경우와 클래스 자신이 직접 처리해야 하는 경우를 잘 판단하여 나누도록 하자.

- 내부자 거래

    - `High Cohesion, Loose Coupling` 의 이야기다. 특정 작업에 참여하는 다양한 모듈을 개발할 때 모듈간에 무언가를 주고받는 상호작용은 최소화하고 모듈 스스로 무언가 처리할 수 있는 부분은 최대화한다.

- 거대한 클래스

    - 하나의 클래스가 클라이언트의 너무 많은 일을 담당하고 있는 상황이다. 내부 로직을 살펴보면서 그룹화 할 수 있는 부분, 작업의 성격들을 차분히 살펴보면서 공통적인 부분과 일부 다른 내용을 추려낸다면 상속을 이용할 수 있다. 순수하게 동일한 문장이 중복적으로 사용되고 있다면 하나의 함수로써 추출할 수 있다.

- 서로 다른 인터페이스의 대안 클래스들

    - 필요에 따라 클래스를 교체하는 상황에서도 인터페이스만 동일하다면 이것은 제법 간단한 작업이 된다. 인터페이스를 맞추기 위해서 관련 로직을 주어진 인터페이스 안에 몰아 넣게 되는데 이때 발견되는 중복적인 로직과 소스코드는 상속, 함수화를 통해 해결가능하다.

- 데이터 클래스

    - `VO`로도 표현되는 것 같다. 되도록 `Getter`, `Setter` 를 통해 데이터의 입출력을 관리하는 것이 좋고 `Public` 필드 대신 별도의 접근 제어자를 두도록 하자.

- 상속 포기

    - 서브 클래스가 부모 클래스가 내려주는 필드와 메소드 대비 독립적인 성향이 너무 강한 경우이다. 부모 클래스의 메소드와 필드중 상속 받지 않으려는 요소를 모두 서브클래스로 내리는 것이 하나의 대안이 된다.

- 주석

    - 주석을 달기전에 함수를 추출하거나 네이밍을 변경해서 최대한을 시맨틱을 제공한 후 그래도 주석이 필요하면 작성하도록 하자.

### 느낀점

> 공통 로직을 클래스로 묶는 부분에 대해서, 작성하는 클래스는 프로그래밍을 통해 도메인을 녹여내는 과정에서 독립적인 엔티티를 부여하기 위한 용도라고만 생각했는데 리팩토링을 위해 사용되는 스코핑 도구로도 활용해 볼만 하다고 생각했다. 클래스 필드를 통해 스코프를 갖는 전역변수를 사용할 수 있기 때문이다.

> 참조를 값으로 바꾸기 파트에서 참조를 통한 데이터 핸들링과 참조를 항상 새 값으로 덮어씌우는 데이터 핸들링의 장단점을 엿볼 수 있는 기회가 되었다. 참조를 통해 데이터를 핸들링하게 되면 소스코드의 모든 로직에서 오직 하나의 데이터 저장소를 수정하게 되므로 별도의 동기화 과정은 필요하지 않지만 프로그래머가 데이터가 변경되는 부분을 주의해서 짜야할 필요가 있다. 프로그램의 규모가 커질 수록 이 부분을 다루기가 어려워질 것이다. 하지만 항상 새로운 값으로 덮어씌우는 방식은 원본 데이터 저장소가 변경될 경우 해당 데이터와 연결 관계가 있는 부분마다 같은 값을 갖도록 동기화해줄 필요가 생긴다. 그러나 이 동기화 작업을 잘 수행해두면 어느 한 부분의 데이터 수정이 다른 모든 로직에서 사용되는 데이터를 수정하지 않으므로 프로그래머 입장에서 부담이 덜해진다.

