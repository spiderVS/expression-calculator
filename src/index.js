function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

  operPriortity = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  }

  operations = {
    '+': function (a, b) { return b + a },
    '-': function (a, b) { return b - a },
    '*': function (a, b) { return b * a },
    '/': function (a, b) { return b / a },
  }

  let inputArr = expr.split('').filter(el => el != ' ');

  // console.log('Входной массив:', inputArr);

  for (let i = 1; i < inputArr.length; i++) {
    if ((+inputArr[i] >= 0) && (+inputArr[i-1]>=0)) {
      inputArr[i-1] = inputArr[i-1] + inputArr[i];
      inputArr.splice(i , 1);
      i -= 1;
    }
  }

  // console.log('Входной массив после склейки цифр, если числа содержат более одной цифры:', inputArr);

  let exprToRpn = [];
  let stack = [];

  for (let i = 0; i < inputArr.length; i++) {
    if (+inputArr[i] >= 0) exprToRpn.push(+inputArr[i]);
    else if (inputArr[i] === '(') stack.push(inputArr[i]);
    else if (inputArr[i] === ')') {
      while (stack[stack.length - 1] != '(') {
        if (stack.length < 1) throw new Error ('ExpressionError: Brackets must be paired');
        exprToRpn.push(stack.pop());
      }
      stack.pop();
    } else if ((inputArr[i] === '+') || (inputArr[i] === '-') || (inputArr[i] === '*') || (inputArr[i] === '/')) {
        while (operPriortity[[stack[stack.length - 1]]] >= operPriortity[inputArr[i]]) exprToRpn.push(stack.pop());
        stack.push(inputArr[i]);
      }
  }

  while (stack.length > 0) exprToRpn.push(stack.pop());
  if (exprToRpn.includes('(')) throw new Error ('ExpressionError: Brackets must be paired');

  // console.log('Массив, преобразованный в обратную польскую нотацию, готовый к вычислениям \n', exprToRpn);

  for (let i = 0; i < exprToRpn.length; i++) {
    if (typeof(exprToRpn[i]) == 'number') stack.push(exprToRpn[i]);
    else {
      stack.push(operations[exprToRpn[i]](stack.pop(), stack.pop()));
      if (stack[stack.length - 1] === Infinity) throw new Error('TypeError: Division by zero.');
    }
  }
  return stack[0];
}

module.exports = {
    expressionCalculator
}
