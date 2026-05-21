'use server';

import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'database.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading db:", error);
    return { registros: [], premios: [], fechas: [] };
  }
}

async function writeDb(data: any) {
  const dirPath = path.dirname(dbPath);
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (e) {}
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Automático: Revisa si pasamos a una nueva semana en horario de Venezuela
 * Si pasamos a un nuevo Lunes, resetea todos los contadores a 0.
 */
async function revisarReinicioSemanal(db: any) {
  const caracasStr = new Date().toLocaleString("en-US", { timeZone: "America/Caracas" });
  const caracasDate = new Date(caracasStr);
  
  caracasDate.setHours(0,0,0,0);
  const diaSemana = caracasDate.getDay(); // 0 = Dom, 1 = Lun ... 6 = Sab
  const diff = caracasDate.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
  const lunesActual = new Date(caracasDate.setDate(diff)).getTime();

  if (!db.ultimoLunes || db.ultimoLunes !== lunesActual) {
    if (db.registros) {
       db.registros.forEach((r: any) => { r.compras = 0; });
    }
    db.ultimoLunes = lunesActual;
    return true; // Hubo reseteo
  }
  return false;
}

// Envuelve la lectura para asegurar que los datos nunca estén vencidos de semana
async function getDbSegura() {
  const db = await readDb();
  const huboReinicio = await revisarReinicioSemanal(db);
  if (huboReinicio) {
    await writeDb(db);
  }
  return db;
}

export async function registrarUsuario(prevState: any, formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const cedula = formData.get('cedula') as string;
  const telefono = formData.get('telefono') as string;
  const palabra = formData.get('palabra') as string;

  if (!nombre || !cedula || !telefono || !palabra) {
    return { success: false, message: 'Todos los campos son requeridos para tu registro.' };
  }

  const db = await getDbSegura();

  const existeCedula = db.registros.find((r: any) => r.cedula === cedula);
  if (existeCedula) {
    return { success: false, message: '❌ Error: Esa Cédula de Identidad ya está registrada.' };
  }
  
  const nuevoRegistro = {
    id: Date.now().toString(),
    cedula,
    nombre,
    telefono,
    palabra,
    fechaRegistro: new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' }),
    compras: 0
  };

  db.registros.push(nuevoRegistro);
  await writeDb(db);

  return { success: true, message: '¡Registro exitoso! Ya eres parte de Aguas Claras.' };
}

export async function getPremios() {
  const db = await getDbSegura();
  return db.premios || [];
}

export async function getRegistros() {
  const db = await getDbSegura();
  return (db.registros || []).map((r: any) => ({
    ...r,
    compras: r.compras || 0
  })).reverse();
}

export async function sumarCompra(id: string) {
  const db = await getDbSegura();
  const user = db.registros.find((r: any) => r.id === id);
  if (user) {
    user.compras = (user.compras || 0) + 1;
    await writeDb(db);
    return true;
  }
  return false;
}

export async function resetearCompra(id: string) {
  const db = await getDbSegura();
  const user = db.registros.find((r: any) => r.id === id);
  if (user) {
    user.compras = 0;
    await writeDb(db);
    return true;
  }
  return false;
}

export async function resetearTodos() {
  const db = await readDb(); // Leemos la cruda
  if (db.registros) {
    db.registros.forEach((user: any) => {
      user.compras = 0;
    });
    // Validamos y forzamos que quede firmada la semana actual
    await revisarReinicioSemanal(db);
    await writeDb(db);
    return true;
  }
  return false;
}

export async function verificarClave(claveIngresada: string) {
  const claveReal = process.env.ADMIN_PASSWORD || 'agua123';
  return claveIngresada === claveReal;
}
