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
    this.elem=document.createElement('table');

    this.elem.innerHTML=`
    <thead>
        <tr>
            <td>Имя</td>
            <td>Возраст</td>
            <td>Зарплата</td>
            <td>Город</td>
            <td></td>
        </tr>
    </thead>
    <tbody class='rows'>
       
    </tbody>`

    this.tbodyTable=this.elem.querySelector('.rows');

    let cellsWithData=rows.map(obj => Object.values(obj).map(item => `<td>${item}</td>`).join(' '))


    for(let item of cellsWithData) {
        this.trTable=document.createElement('tr');
        this.trTable.insertAdjacentHTML('beforeend', item);
        this.trTable.insertAdjacentHTML('beforeend', `<td><button>X</button></td>`);
        this.tbodyTable.append(this.trTable)
    }

    this.elem.addEventListener('click', (event)=> this.clickRemove(event))
    }

 clickRemove(event) {
    if(event.target.tagName==='BUTTON') {
        event.target.closest('tr').remove();
    }
 }
  
}

