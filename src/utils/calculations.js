// src/utils/calculations.js

export function obtenerParticipantesUnicos(gastos) {
  const participantes = new Set();
  gastos.forEach(gasto => {
    gasto.participantes.forEach(participante => participantes.add(participante));
    participantes.add(gasto.pagador);
  });
  return Array.from(participantes);
}

export function calcularBalances(gastos) {
  const participantes = obtenerParticipantesUnicos(gastos);
  const balances = {};

  participantes.forEach(participante => {
    const adeudado = calcularMontoAdeudadoPorParticipante(participante, gastos);
    const pagado = calcularMontoPagadoPorParticipante(participante, gastos);
    balances[participante] = {
      pagado,
      adeudado,
      balance: pagado - adeudado
    };
  });

  return balances;
}

function calcularMontoAdeudadoPorParticipante(participante, gastos) {
  return gastos.reduce((total, gasto) => {
    if (gasto.participantes.includes(participante)) {
      const montoPorPersona = gasto.monto / gasto.participantes.length;
      return total + montoPorPersona;
    }
    return total;
  }, 0);
}

function calcularMontoPagadoPorParticipante(participante, gastos) {
  return gastos.reduce((total, gasto) => {
    if (gasto.pagador === participante) {
      return total + parseFloat(gasto.monto);
    }
    return total;
  }, 0);
}

export function calcularDeudas(balances) {
  const deudas = [];
  const acreedores = [];
  const deudores = [];

  // Separar acreedores y deudores
  for (const [participante, data] of Object.entries(balances)) {
    const balance = data.balance;
    if (balance > 0.01) {
      acreedores.push({ participante, balance });
    } else if (balance < -0.01) {
      deudores.push({ participante, balance: -balance });
    }
  }

  // Ordenar acreedores y deudores por balance descendente
  acreedores.sort((a, b) => b.balance - a.balance);
  deudores.sort((a, b) => b.balance - a.balance);

  // Calcular las deudas
  let i = 0;
  let j = 0;

  while (i < deudores.length && j < acreedores.length) {
    const deudor = deudores[i];
    const acreedor = acreedores[j];
    const monto = Math.min(deudor.balance, acreedor.balance);

    if (monto > 0) {
      deudas.push({
        deudor: deudor.participante,
        acreedor: acreedor.participante,
        monto: parseFloat(monto.toFixed(2))
      });
      deudor.balance -= monto;
      acreedor.balance -= monto;
    }

    if (deudor.balance <= 0.01) i++;
    if (acreedor.balance <= 0.01) j++;
  }

  return deudas;
}
