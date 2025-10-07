const API_URL="http://localhost:8080/apiPeliculas";

export async function getPeliculas() {
    const res = await fetch(`${API_URL}/consultarPeliculas`);
    return res.json();
}

export async function createPelicula(data) {
    await fetch(`${API_URL}/registrarPeliculas`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function updatePelicula(id, data) {
    await fetch(`${API_URL}/editarPelicula/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function deletePelicula(id) {
    await fetch(`${API_URL}/eliminarPelicula/${id}`, {
        method: "DELETE"
    });
}