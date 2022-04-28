const agregarCancion = async (datos, pool) => {
  const query = {
    text: "INSERT INTO repertorio (cancion, artista, tono) VALUES ($1, $2, $3)",
    values: datos,
  };
  try {
    const result = await pool.query(query);
    return result;
  } catch (e) {
    console.log(e.code);
    return e;
  }
};
const consultar = async (pool) => {
  const consulta = "SELECT * FROM repertorio";
  try {
    const res = await pool.query(consulta);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

const editar = async (datos, pool) => {
  const consulta = {
    text: `UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id =$1 RETURNING *`,
    values: datos,
  };
  try {
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const eliminarRepertorio = async (datos, pool) => {
  const consulta = {
    text: "DELETE from repertorio where id=$1",
    values: [datos],
    name: "eliminar-repertorio",
  };
  try {
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.log(error.code);
    console.log(error);
  }
};

module.exports = { agregarCancion, consultar, editar, eliminarRepertorio };
