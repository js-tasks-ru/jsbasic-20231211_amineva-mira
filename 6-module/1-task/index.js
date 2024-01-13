/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  
  constructor(rows) {
    this.rows = rows;
    this.table = elem; //заходит в сеттор elem
  }

  set elem (rows) {
    console.log('hhh')
    table= document.createElement('table'); 

    thead= document.createElement('thead');
    table.prepend(thead);

    tr= document.createElement('tr');
    thead.append(tr);

    for(let i=0; i<=this.rows.length; i++) {
      let keyObject=Object.keys(this.rows[i]).map(item => {
        th=document.createElement('th');
        th=item;
        thead.insertAdjacentElement('beforeEnd', th);
      }) 
    }

    let tbody=document.createElement('tbody');

    for (let i=0; i<=this.rows.length-1; i++) {
      let keyObject=Object.values(this.rows[i]).map(item => {
        th=document.createElement('th');
        th=item;
        tbody.insertAdjacentElement('beforeEnd', th);
        tbody.insertAdjacentElement('beforeend', `<td><button>X</button></td>`)
      }) 
    }

    return this.table=table; //приравниваем для передачи в геттер
  }

  get elem() {
    return this.table; 
  }
 
  
}

