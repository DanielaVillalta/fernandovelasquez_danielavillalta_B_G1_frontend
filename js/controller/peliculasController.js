import {
    getPeliculas,
    createPelicula,
    updatePelicula,
    deletePelicula
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
            titulo: form.peliculaTitulo.value.trim(),
            director: form.peliculaDirector.value.trim(),
            genero: form.peliculaGenero.value.trim(),
            anioEstreno: form.peliculaEstreno.value.trim(),
            duracion: form.peliculaDuracion.value.trim(),
            fecha_creacion: form.peliculaFecha.value
        };


        try {
            if (id) {
                await updatePelicula(id, data);
                loadPeliculas();
            } else {
                await createPelicula(data);
                console.log("hola");
                loadPeliculas();
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
                const fecha = new Date(pel.fecha_creacion);
                const fechaFormateada = fecha.toISOString().split("T")[0];

                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = pel.id;

                const tdTitulo = document.createElement("td");
                tdTitulo.textContent = pel.titulo;

                const tdDirector = document.createElement("td");
                tdDirector.textContent = pel.director;

                const tdGenero = document.createElement("td");
                tdGenero.textContent = pel.genero;

                const tdEstreno = document.createElement("td");
                tdEstreno.textContent = pel.anioEstreno;

                const tdDuracion = document.createElement("td");
                tdDuracion.textContent = pel.duracion;

                const tdFecha = document.createElement("td");
                tdFecha.textContent = fechaFormateada;

                const tdBtns = document.createElement("td");
                tdBtns.innerHTML = `
                    <button class="btn btn-sm btn-outline-secondary edit-btn">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn">
                        <i class="bi bi-trash"></i>
                    </button>
                `;

                tdBtns.querySelector(".edit-btn").addEventListener("click", async () => {
                    //Convertir tipo de fecha para que lo pueda leer el update
                    const fecha = new Date(pel.fecha_creacion);
                    const fechaFormateada = fecha.toISOString().split("T")[0];

                    form.peliculaId.value = pel.id;
                    form.peliculaTitulo.value = pel.titulo;
                    form.peliculaDirector.value = pel.director;
                    form.peliculaGenero.value = pel.genero;
                    form.peliculaEstreno.value = pel.anioEstreno;
                    form.peliculaDuracion.value = pel.duracion;
                    form.peliculaFecha.value = fechaFormateada;
                    lbModal.textContent = "Editar Película";
                    await loadPeliculas();
                    modal.show();
                });

                tdBtns.querySelector(".delete-btn").addEventListener("click", async () => {
                    if (confirm("¿Desea eliminar la película?")) {
                        await deletePelicula(pel.id);
                        await loadPeliculas();
                    }
                })

                tr.appendChild(tdId);
                tr.appendChild(tdTitulo);
                tr.appendChild(tdDirector);
                tr.appendChild(tdGenero);
                tr.appendChild(tdEstreno);
                tr.appendChild(tdDuracion);
                tr.appendChild(tdFecha);
                tr.appendChild(tdBtns);

                tableBody.appendChild(tr);
            });
        } catch (err) {
            console.error("Error cargando las películas: ", err);
        }
    }
});