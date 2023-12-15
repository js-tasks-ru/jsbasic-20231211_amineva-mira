function factorial(n) {
  let res=1;
  for(let i=1; i<=n; i++) {
    res+=res*(n-i);
  }
  return res;
}
