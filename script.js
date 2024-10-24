document.addEventListener('DOMContentLoaded', function () {
    const studentList = document.getElementById('studentList');
    const modal = document.getElementById('studentModal');
    const modalName = document.getElementById('modalName');
    const modalAge = document.getElementById('modalAge');
    const modalMatricule = document.getElementById('modalMatricule');
    const modalGender = document.getElementById('modalGender');
    const modalEmail = document.getElementById('modalEmail');
    const modifyBtn = document.getElementById('modifyBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    let currentStudent = null;
    let currentLi = null;

    // Remplir la liste déroulante pour l'âge
    const ageSelect = document.getElementById('age');
    for (let i = 18; i <= 100; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        ageSelect.appendChild(option);
    }

    // Charger les étudiants du localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addStudentToList(student));

    // Soumettre le formulaire
    document.getElementById('studentForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const matricule = document.getElementById('matricule').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const email = document.getElementById('email').value;

        // Si nous sommes en mode modification
        if (currentStudent && currentLi) {
            currentStudent.name = name;
            currentStudent.age = age;
            currentStudent.matricule = matricule;
            currentStudent.gender = gender;
            currentStudent.email = email;
            currentStudent.dob = dob;

            // Mettre à jour le texte de l'élément de la liste
            currentLi.textContent = currentStudent.name;

            // Sauvegarder dans le localStorage
            saveToLocalStorage();

            // Réinitialiser currentStudent et currentLi
            currentStudent = null;
            currentLi = null;
        } else {
            // Créer un nouvel étudiant si nous ne sommes pas en mode modification
            const student = {
                name: name,
                age: age,
                matricule: matricule,
                gender: gender,
                email: email,
            };

            students.push(student);
            addStudentToList(student);

            // Sauvegarder dans le localStorage
            saveToLocalStorage();
        }

        // Réinitialiser le formulaire
        document.getElementById('studentForm').reset();
    });

    function addStudentToList(student) {
        const li = document.createElement('li');
        li.textContent = student.name;
        li.addEventListener('click', function () {
            showStudentDetails(student, li);
        });

        studentList.appendChild(li);
    }

    function showStudentDetails(student, li) {
        currentStudent = student;
        currentLi = li;

        modalName.textContent = `Nom: ${student.name}`;
        modalAge.textContent = `Âge: ${student.age}`;
        modalMatricule.textContent = `Matricule: ${student.matricule}`;
        modalGender.textContent = `Sexe: ${student.gender}`;
        modalEmail.textContent = `Email: ${student.email}`;
        modal.style.display = 'block';
    }

    // Fermer la fenêtre modale
    document.querySelector('.close').addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Supprimer l'étudiant
    deleteBtn.addEventListener('click', function () {
        if (currentStudent && currentLi) {
            // Retirer l'étudiant de la liste et du tableau
            const index = students.indexOf(currentStudent);
            if (index !== -1) {
                students.splice(index, 1);
            }

            // Mettre à jour l'interface
            studentList.removeChild(currentLi);

            // Sauvegarder dans le localStorage
            saveToLocalStorage();

            modal.style.display = 'none';
            currentStudent = null;
            currentLi = null;
        }
    });

    // Modifier l'étudiant
    modifyBtn.addEventListener('click', function () {
        if (currentStudent) {
            document.getElementById('name').value = currentStudent.name;
            document.getElementById('age').value = currentStudent.age;
            document.getElementById('matricule').value = currentStudent.matricule;
            document.querySelector(`input[name="gender"][value="${currentStudent.gender}"]`).checked = true;
            document.getElementById('email').value = currentStudent.email;

            modal.style.display = 'none';
        }
    });

    // Fonction pour sauvegarder les étudiants dans le localStorage
    function saveToLocalStorage() {
        localStorage.setItem('students', JSON.stringify(students));
    }
});
