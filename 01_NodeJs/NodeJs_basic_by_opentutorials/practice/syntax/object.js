var members = ['egoing','k8805','hoya'];

var i = 0;
while(i < members.length){

  console.log(members[i]);
  i += 1;
}

var roles={
  'programmer':'egoing',
  'designer':'k8805',
  'manager':'hoya'
}

console.log(roles.manager);

for(var name in roles){

  console.log('object =>', name);
}
