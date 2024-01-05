function showSalary(users, age) {
  let arr=users.filter(item=> item.age<=age).map(item=>`${item.name}, ${item.balance}`).join('\n')
  return arr;
}
