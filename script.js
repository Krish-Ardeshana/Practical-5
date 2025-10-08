// Constants
const studentList = document.getElementById("studentList");
const eventList = document.getElementById("eventList");
const pagination = document.getElementById("pagination");

const studentsPerPage = 3;
let currentPage = 1;
let studentData = [];

// Fetch JSON Data
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    renderEvents(data.events);
    studentData = data.students;
    renderStudents(studentData, currentPage);
    setupPagination(studentData);
  })
  .catch(err => console.error("Error loading data:", err));

// Render Events
function renderEvents(events) {
  eventList.innerHTML = '';
  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${event.title}</h3>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
    `;
    eventList.appendChild(card);
  });
}

// Render Students with Pagination
function renderStudents(students, page) {
  studentList.innerHTML = '';
  const start = (page - 1) * studentsPerPage;
  const end = start + studentsPerPage;
  const currentStudents = students.slice(start, end);

  currentStudents.forEach(student => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p>Roll: ${student.roll}</p>
      <p>Branch: ${student.branch}</p>
    `;
    studentList.appendChild(card);
  });
}

// Setup Pagination
function setupPagination(data) {
  pagination.innerHTML = '';
  const pageCount = Math.ceil(data.length / studentsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderStudents(data, currentPage);
      setupPagination(data);
    });

    pagination.appendChild(btn);
  }
}
