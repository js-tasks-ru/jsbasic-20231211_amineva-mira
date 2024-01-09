function makeFriendsList(friends) {
  let list = document.createElement("ul");
    document.body.append(list);
    
    for (let friend of friends) {
        list.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`)
    }
    return list;
}
