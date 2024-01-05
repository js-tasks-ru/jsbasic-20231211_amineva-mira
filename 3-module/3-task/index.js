function camelize(str) {
  let arr=str.split('-').map((item, i)=> i!=0 ? item[0].toUpperCase ()+item.slice(1) : item).join("");
  return arr;
}
