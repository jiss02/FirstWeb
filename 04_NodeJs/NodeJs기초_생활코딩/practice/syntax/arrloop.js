var num = [44,2,6,7,34,76];
var i = 0;
var sum = 0;

while (i < num.length) {

  console.log(num[i]);
  sum += num[i];
  i += 1;

}

// template literal
console.log(`total: ${sum}`);
