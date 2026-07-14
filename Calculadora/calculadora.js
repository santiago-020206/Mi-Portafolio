function calcular(operacion) {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const campoResultado = document.getElementById('resultado');

  if (isNaN(num1) || isNaN(num2)) {
    campoResultado.value = 'Ingresa dos números válidos';
    return;
  }

  let resultado;

  switch (operacion) {
    case 'suma':
      resultado = num1 + num2;
      break;
    case 'resta':
      resultado = num1 - num2;
      break;
    case 'multiplicacion':
      resultado = num1 * num2;
      break;
    case 'division':
      if (num2 === 0) {
        campoResultado.value = 'Error: No se puede dividir entre 0';
        return;
      }
      resultado = num1 / num2;
      break;
  }

  campoResultado.value = resultado;
}