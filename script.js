class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }
}

async function loadData() {
  const res = await fetch('./data/students.json');
  const data = await res.json();

  displayStudents(data.students);
  displayCourses(data.courses);
  displayInstructors(data.instructors);
  displayRelations(data);
}

function displayStudents(students) {
  const container = document.getElementById('students');
  container.innerHTML = '<h2 style="grid-column:1/-1;">Students</h2>';
  students.forEach(s => {
    const badge = s.age > 21 ? `<span class="badge">21+</span>` : '';
    container.innerHTML += `
      <div class="card">
        <h3>${s.name} ${badge}</h3>
        <p>Age: ${s.age}</p>
        <p>Course: ${s.course}</p>
      </div>
    `;
  });
}

function displayCourses(courses) {
  const container = document.getElementById('courses');
  container.innerHTML = '<h2 style="grid-column:1/-1;">Courses</h2>';
  courses.forEach(c => {
    container.innerHTML += `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
      </div>
    `;
  });
}

function displayInstructors(instructors) {
  const container = document.getElementById('instructors');
  container.innerHTML = '<h2 style="grid-column:1/-1;">Instructors</h2>';
  instructors.forEach(i => {
    container.innerHTML += `
      <div class="card">
        <h3>${i.name}</h3>
        <p>Teaches: ${i.subject}</p>
      </div>
    `;
  });
}

function displayRelations(data) {
  const container = document.getElementById('relations');
  let html = `<h2>Data Relationships</h2><ul>`;

  data.students.forEach(s => {
    const course = data.courses.find(c => c.title === s.course);
    html += `<li><strong>${s.name}</strong> → ${s.course} → ${course.description}</li>`;
  });

  data.courses.forEach(c => {
    const instructor = data.instructors.find(i =>
      i.subject.toLowerCase().includes(c.title.toLowerCase().split(' ')[0])
    );
    html += `<li><strong>${c.title}</strong> → Taught by ${instructor?.name || 'Unknown'}</li>`;
  });

  html += `</ul>`;
  container.innerHTML = html;
}

loadData();
