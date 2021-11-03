//Inheritance, polymorphism, encapsulation 중 상속과 polymorphism에 대한 이해
//상속은 상위클래스에 프로토타입에 연결된 메소드와 상위클래스에 의해 형성된 인스턴스가 갖게되는 초기 프로퍼티를 하위 클래스가 물려받는 것이고 이것이 Parnet와 그것을 상속받는 Child클래스에 나타난다. 그리고 만약 하위 클래스에 중복적으로 인스턴스 초기 프로퍼티를 설정해 주면 하위클래 자신의 프로퍼티가 적용된다. ex) this.age in Child class 이것이 바로 polymorphism이다
class Parent {
  constructor(age, sex) {
    this.age = age;
    this.sex = sex;
  }

  changeSex() {
    if (this.sex === 'male') this.sex = 'female';
    else this.sex = 'male';
  }
}

class Child extends Parent {
  constructor(page, psex) {
    super(page, psex);
    this.age = page - 30;
  }
}
let parent1 = new Parent(50, 'male');
let child1 = new Child(49, 'female');
// child1.changeSex();
// console.log(child1.sex);


console.log(Object.getPrototypeOf(parent1) === Parent.prototype);
console.log(Object.getPrototypeOf(child1.prototype) === Parent.prototype);
