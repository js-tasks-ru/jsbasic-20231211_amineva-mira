function highlight(table) {
  let tbody = table.querySelectorAll('tr');

  for (let item of tbody) {
    let status=item.cells[3];
    if (status.dataset.available==='true') {
      item.classList.add('available');
    } else if (status.dataset.available==='false'){
      item.classList.add('unavailable');
    } else {
      item.hidden=true;
    }

    let gender=item.cells[2];
    gender.textContent=== "m" ? item.classList.add('male') : item.classList.add('female');

    let age=item.cells[1];
    age.textContent<18 ? item.style.textDecoration='line-through' : item;
  }
}
