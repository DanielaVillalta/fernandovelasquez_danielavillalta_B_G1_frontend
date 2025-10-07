const API_URL="http://10.10.3.211/apiPeliculas";

export async function getPeliculas() {
    const res = await fetch(`${API_URL}/consultarPeliculas`);
    return res.json();
}

export async function createPelicula(data) {
    await fetch(`${API_URL}/newPelicula`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function updatePelicula(id, data) {
    await fetch(`${API_URL}/updatePelicula/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function deletePelicula(id) {
    await fetch(`${API_URL}/deletePelicula/${id}`, {
        method: "DELETE"
    });
}