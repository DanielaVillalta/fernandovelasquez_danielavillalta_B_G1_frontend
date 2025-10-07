import {
    getPeliculas,
    newPelicula,
    updatePelicula,
    deletePelicula,
    createPelicula
} from "../service/peliculasService.js"

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#peliculasTable tbody");
    const form = document.getElementById("peliculaForm");
    const modal = new bootstrap.Modal(document.getElementById("peliculaModal"));
    const lbModal = document.getElementById("peliculaModalLabel");
    const btnAdd = document.getElementById("btnAddPelicula");

    loadPeliculas();

    btnAdd.addEventListener("click", () => {
        form.reset();
        form.peliculaId.value = "";
        lbModal.textContent = "Agregar Película";
        modal.show();
    })

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = form.peliculaId.value;

        const data = {
            peliculaTitulo: form.peliculaTitulo.value.trim(),
            peliculaDirector: form.peliculaDirector.value.trim(),
            peliculaGenero: form.peliculaGenero.value.trim(),
            peliculaEstreno: form.peliculaEstreno.value.trim(),
            peliculaDuracion: form.peliculaDuracion.value.trim(),
            peliculaCreacion: form.peliculaCreacion.value.trim()
        };

        try {
            if (id) {
                await updatePelicula(id, data);
            } else {
                await createPelicula(data);
            }
            modal.hide()
        } catch (err) {
            console.error("Error al guardar la película: ", err);
        }
    });

    async function loadPeliculas() {
        try {
            const peliculas = await getPeliculas();
            tableBody.innerHTML = "";

            if (!peliculas || peliculas.length == 0) {
                tableBody.innerHTML = '<td colspan = "5">Actualmente no hay registros</td>'
                return;
            }

            peliculas.forEach((pel) => {
                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = pel.idPelicula;

                const tdTitulo = document.createElement("td");
                tdId.textContent = pel.tituloPelicula;

                const tdDirector = document.createElement("td");
                tdId.textContent = pel.directorPelicula;

                const tdGenero = document.createElement("td");
                tdId.textContent = pel.generoPelicula;

                const tdEstreno = document.createElement("td");
                tdId.textContent = pel.estrenoPelicula;
                
                const tdDuracion = document.createElement("td");
                tdId.textContent = pel.duracionPelicula;

                const tdFecha = document.createElement("td");
                tdId.textContent = pel.fechaPelicula;

                const tdBtns = document.createElement("td");
                tdBtns.innerHTML = `
                    <button class="btn btn-sm btn-outline-secondary edit-btn">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn">
                        <i class="bi bi-trash"></i>
                    </button>
                `
            })
        }
    }
})