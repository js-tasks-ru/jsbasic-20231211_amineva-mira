function sumSalary(salaries) {
  let sum=0;
  for (let key in salaries) {
    // if((salaries[key] ^ 0)===salaries[key] && isFinite(salaries[key])) {
    if((typeof salaries[key]) === 'number' && isFinite(salaries[key])) {
      sum+=salaries[key];
    }
  }
  return sum;
}
