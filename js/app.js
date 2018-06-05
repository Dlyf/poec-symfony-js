// I. Variables globales + Accès aux éléments du DOM
var title = 'Formation JS';
var l = console.log;
var nodeTitle = document.getElementById('title');
var nodeImg  = document.getElementById('image');
var divStudents = document.getElementById('students');
var divFilters = document.getElementById('filters');
var divMessage = document.getElementById('message');
var selectCourse = divFilters.children[0]; // enfant d'indice 0
var checkMajor = divFilters.children[2];
var textSearch = divFilters.children[3]; // enfant d'indice 3

var config = {
  appVersion: 1,
  animation: false,
  afficheMessage: function(message) {
     l(message);
   },
  students: [
   {name: 'Dominique', age:14, attendedCourses: ['PHP', 'javascript']},
   {name: 'Antonio', age: 25, attendedCourses: ['PHP']},
   {name: 'Othman', status: 'CDI', attendedCourses: ['']},
   {name: 'tristan', age: 23, attendedCourses: ['Symfony', 'javascript', ]},
   {name: 'Nakkib', age: 30, attendedCourses: ['PHP', 'javascript', 'Angular', 'Nodejs']}
 ],
 studentsFiltered: null,
 ageMajority:18
};

// 2. FONCTIONS
function init() {
  nodeTitle.innerText = title;

  // on copie le tableau des étudiants non filtrés
  // celui des étudiants filtrés
  config.studentsFiltered = config.students;

  divStudents.innerHTML = buildStudentTable();
 }


function displayImg() {
//   let display = nodeImg.style.display;
//   console.log(display);
//   if ( display === 'none' ) {
//     // display = 'inline'; Problème, modifie la copie
//     // de l'image pas l'original
//     nodeImg.style.display = 'inline';
//   } else {
//     nodeImg.style.display = 'none';
//   }
  if (config.animation) {
    let display = nodeImg.style.display;
    nodeImg.style.display = (display === 'none')
    ? 'inline' : 'none';
  }

};



function buildStudentList() {
  let s = '<ul>'; // Variable contenant balisage html

  // boucle sur le tableau des étudiants
  for (let i = 0; i < config.students.length; i++) {
    s += '<li>' ;
    s += config.students[i].name;

    // si l'objet student dispose d'une propriété age
    if (config.students[i].age) {
      s += ' (' + config.students[i].age + ' ans)'
    }

    s += '</li>';
  }

  s += '</ul>'

  return s; // retourne le balisage HTML
}

function buildStudentTable() {
  let header = '<tr><th>Nom</th><th>Age</th><th>Cours Suivi</th></tr>';
  let s = '<table class = "table table-bordered table-striped">'; // Variable contenant balisage html

  // boucle sur le tableau des étudiants
  s += header;
  for (let i = 0; i < config.studentsFiltered.length; i++) {
    s += '<tr>' ;
    // Colonne Nom
    s += '<td>';
    s += config.studentsFiltered[i].name;
    s += '</td>';

    //Colonne Age
    s += '<td>';

    // if syntaxe rapide (valable pour une seule instruction)
    if(config.studentsFiltered[i].age)
      s += config.studentsFiltered[i].age;

    s += '</td>';

    // Colonnes cours suivi
    // if syntaxe rapide (valable pour une seule instruction)

    s += '<td>';
    s += config.studentsFiltered[i].attendedCourses;

    s += '</td>';

    s += '</tr>';
  }

  s += '</table>'

  return s; // retourne le balisage HTML
}

// function afficheOk() {
//   console.log('OK');
// }

// 3. Evenements

// nodeTitle.addEventListener('click', function() {
//   console.log('OK');
// })

nodeTitle.addEventListener('mouseover', displayImg);

selectCourse.addEventListener('change', function() {
  let selectedCourse = this.value;


  if (selectedCourse == '0') {
    config.studentsFiltered = config.students;
    //affichage du message
    divMessage.innerText = '';
  } else {
    // modifier la source de données par rapport
    // à l'option choisie
    let studentsFiltered = config.students.filter(function(student) {
      return student.attendedCourses.indexOf(selectedCourse) != -1;
    })
    config.studentsFiltered = studentsFiltered;

    //affichage du divMessage
    divMessage.innerText = config.studentsFiltered.length + ' étudiant(s) trouvé(s)';
  }

  // on recrée DOM
  divStudents.innerHTML = buildStudentTable();

})

checkMajor.addEventListener('click', function() {
  if(this.checked) {
      let studentsFiltered = config.students.filter(student => student.age >  config.ageMajority);

      //mise à jour du DOM
      config.studentsFiltered = studentsFiltered;

  } else {
    config.studentsFiltered = config.students;
  }

  //mise à jour du DOM
  divStudents.innerHTML = buildStudentTable();
})

textSearch.addEventListener('keyup', function() {
  if (this.value.length > 2) {
    let studentsFiltered =
      config.students.filter(student => student.name.toLowerCase().indexOf(this.value.toLowerCase()) != -1);
  config.studentsFiltered = studentsFiltered;
} else {
  config.studentsFiltered = config.students;
  }

  // Mise à jour de DOM
  divStudents.innerHTML = buildStudentTable();
})
// Initialisation
init();
