// Declaration des variables
let create = document.querySelector("#create");
let modal = document.querySelector("#create-staff");
let exit = document.querySelector("#close");
let insert = document.querySelector("#save");
let edit = document.querySelector("#edit-staff");
let update = document.querySelector("#update");
let exit1 = document.querySelector("#close-edit");

// afficher le popup
create.addEventListener("click", () =>{
    modal.style.display = "flex";
})

// fermer le popup
exit.addEventListener("click", () =>{
    modal.style.display = "none";
})
// fermer le popup edit
exit1.addEventListener("click", () =>{
    edit.style.display = "none";
})

// insertion des données
insert.addEventListener("click", async () =>{
    try {
        let name = document.querySelector("#name").value;
        let age = document.querySelector("#age").value;
        let country = document.querySelector("#country").value;

        const res = await fetch("backend/insert-data.php", {
            method: "POST",
            body: JSON.stringify({"name":name,"age":age,"country":country}),
            headers: {
                "Content-Type":"application/json"
            }
        });
        const output = await res.json();
        if (output.success) {
            alert(output.message);
            document.querySelector("#name").value = "";
            document.querySelector("#age").value = "";
            document.querySelector("#country").value = "";
            modal.style.display = "none";
            afficherData();

        } else {
            alert(output.message);
        }
    } catch (error) {
        console.log(error)
    }
})

// affichage de données dans la table
const afficherData = async () =>{
    try {
        let tbody = document.querySelector("#tbody");
        let tr = "";

        const res = await fetch("backend/select-data.php", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        });
        
        const output = await res.json();
        if (output.empty != "empty") {
            for (var i in output){ 
                tr += `
                    <tr>
                        <td>${parseInt(i) + 1}</td>
                        <td>${output[i].name}</td>
                        <td>${output[i].age}</td>
                        <td>${output[i].country}</td>
                        <td>
                            <button class="btn btn-primary" onclick="editData(${output[i].id})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteData(${output[i].id})">Delete</button>
                        </td>
                    </tr>
                `;
            }
        } else {
            tr = "<tr> No data Found</tr>";
        }
        tbody.innerHTML = tr;
    } catch (error) {
        console.log(error)
    }
}

afficherData();

// modification
// etape 01: affichage au niveau popup
const editData = async (id) =>{
    edit.style.display = "flex";

    const res = await fetch("backend/edit-data.php?id=" + id, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });

    const output = await res.json();
    if (output.empty != "empty") {
        for (var i in output){
            document.querySelector("#id").value = output[i].id;
            document.querySelector("#edit-name").value = output[i].name;
            document.querySelector("#edit-age").value = output[i].age;
            document.querySelector("#edit-country").value = output[i].country;
        }
    } 
}
// etape 02: update
update.addEventListener("click", async () =>{
    try {
        let id = document.querySelector("#id").value;
        let name = document.querySelector("#edit-name").value;
        let age = document.querySelector("#edit-age").value;
        let country = document.querySelector("#edit-country").value;

        const res = await fetch("backend/update-data.php", {
            method: "POST",
            body: JSON.stringify({"id":id,"name":name,"age":age,"country":country}),
            headers: {
                "Content-Type":"application/json"
            }
        });
        const output = await res.json();
        if (output.success) {
            alert(output.message);
            edit.style.display = "none";
            afficherData();
        } else {
            alert(output.message);
        }
    } catch (error) {
        console.log("Error: " + error)
    }
})

// suppression des données
const deleteData = async (id) =>{
    const res = await fetch("backend/delete-data.php?id=" + id, {
        method: "GET",
    });

    const output = await res.json();
    if (output.success) {
        alert(output.message);
        afficherData();
    } else {
        alert(output.message);
    }
}