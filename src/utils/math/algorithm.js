import { numberTypeValidation } from "../validations/numberTypeValidation";

// Función para calcular el MCD (Máximo Común Divisor) usando el algoritmo de Euclides
const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Función para resolver el problema del Water Jug Challenge usando BFS
export const solveWaterJug = (x, y, z) => {
  // Valida que los valores de X, Y y Z sean números enteros positivos
  if (
    !numberTypeValidation(x) ||
    !numberTypeValidation(y) ||
    !numberTypeValidation(z)
  ) {
    return "Invalid Input";
  }

  // Convierte los valores a números enteros
  x = parseInt(x, 10);
  y = parseInt(y, 10);
  z = parseInt(z, 10);

  // Si Z es mayor que la capacidad de ambas jarras, no hay solución posible
  if (z > x && z > y) return "No Solution";

  // Si Z no es un múltiplo del MCD de X e Y, no hay solución posible
  if (z % gcd(x, y) !== 0) return "No Solution";

  // Conjunto para almacenar los estados visitados
  const visited = new Set();

  // Cola para almacenar los estados a explorar, comenzando con ambas jarras vacías
  const queue = [{ currentX: 0, currentY: 0, steps: [] }];

  // Mientras haya estados en la cola
  while (queue.length > 0) {
    // Extrae el primer estado de la cola
    const { currentX, currentY, steps } = queue.shift();

    // Si una de las jarras contiene exactamente Z galones, devuelve los pasos
    if (currentX === z || currentY === z) {
      return [...steps, { x: currentX, y: currentY }];
    }

    // Genera una cadena única para el estado actual
    const state = `${currentX},${currentY}`;

    // Si el estado ya ha sido visitado, continúa con el siguiente
    if (visited.has(state)) continue;

    // Marca el estado actual como visitado
    visited.add(state);

    // Genera todos los posibles movimientos desde el estado actual
    const possibleMoves = [
      { x, y: currentY }, // Llenar la jarra X
      { x: currentX, y }, // Llenar la jarra Y
      { x: 0, y: currentY }, // Vaciar la jarra X
      { x: currentX, y: 0 }, // Vaciar la jarra Y
      { x: Math.min(x, currentX + currentY), y: currentX + currentY - Math.min(x, currentX + currentY) }, // Transferir de Y a X
      { x: currentX + currentY - Math.min(y, currentX + currentY), y: Math.min(y, currentX + currentY) }, // Transferir de X a Y
    ];

    // Añade los nuevos estados a la cola
    for (const move of possibleMoves) {
      queue.push({ currentX: move.x, currentY: move.y, steps: [...steps, { x: currentX, y: currentY }] });
    }
  }

  // Si no se encuentra una solución, devuelve "No Solution"
  return "No Solution";
};