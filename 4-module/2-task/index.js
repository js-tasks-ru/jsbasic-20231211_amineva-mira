function makeDiagonalRed(table) {
  for (let i = 0, row; row = table.rows[i]; i++) {
    for (let j = 0, col; col = row.cells[j]; j++) {
      if(i===j) {
        table.rows[i].cells[j].style.backgroundColor='red';
      }
    }
  }
}
