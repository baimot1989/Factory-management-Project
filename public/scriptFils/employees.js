const userName = JSON.parse(localStorage.getItem('userName'));
document.querySelector('.user').textContent = userName;

const logout = document.querySelector('.logout');

logout.addEventListener('click', async (e) => {
    e.preventDefault();
    localStorage.removeItem('userName');
    const res = await fetch("http://localhost:3000/login/logout");
    if (res.redirected) {
        window.location.href = res.url;
    }

});

const employeesUrl = 'http://localhost:3000/employees';
const shiftsUrl = 'http://localhost:3000/shifts';
const departmentUrl = 'http://localhost:3000/departments';
const tbody = document.getElementById('tbody');
const departmentsSelector = document.getElementById('departments-select');
const newEmployee = document.getElementById('new-employee');

const getAllEmployees = async (departmentId) => {
    const resDep = await fetch(departmentUrl);
    const dataDep = await resDep.json();
    const resEmp = await fetch(employeesUrl);
    const dataEmp = await resEmp.json();
    const resShifts = await fetch(shiftsUrl);
    const dataShifts = await resShifts.json();

    return {
        employees: dataEmp,
        departments: dataDep,
        shifts: dataShifts,
        departmentId
    }
}
getAllEmployees().then(value => filTable(value))

const filTable = (dataObj) => {
    const { employees, departments, shifts } = dataObj;
    tbody.innerHTML = '';
    console.log(shifts)
    employees.forEach(item => {
        const tr = document.createElement('tr');
        const fullName = document.createElement('td');
        const department = document.createElement('td');
        const shiftss = document.createElement('td');
        const shiftsList = document.createElement('ul');
        const fullNameLink = document.createElement('a');
        const departmentLink = document.createElement('a');

        const { _id: id, name: departmentName } = departments.find(dep => dep._id === item.departmentId)

        fullNameLink.href = `http://localhost:3000/authusers/employees/edit/?id=${item._id}`
        departmentLink.href = `http://localhost:3000/authusers/departments/edit/?id=${id}`
        fullNameLink.textContent = `${item.firstName} ${item.lastName}`;
        fullName.classList.add('text-dark')
        fullNameLink.classList.add('link-dark')
        department.classList.add('text-dark')
        departmentLink.classList.add('link-dark')
        departmentLink.textContent = departmentName;
        
        item.shiftsId.forEach(element => {
            const shiftDit = shifts.find(shi => shi._id === element)
            
            const shift = document.createElement('li');

            shift.textContent = `${shiftDit.date}-${shiftDit.startingHour}-${shiftDit.endingHour}`;
            shift.classList.add('text-decoration-none')
            shiftsList.appendChild(shift);
            

        });
        fullName.appendChild(fullNameLink);
        department.appendChild(departmentLink)
        shiftss.appendChild(shiftsList)
        tr.appendChild(fullName);
        tr.appendChild(department);
        tr.appendChild(shiftss);
        tbody.appendChild(tr);
    });

    departments.forEach(dep => {
        const optionTag = document.createElement('option');
        optionTag.value = dep._id;
        optionTag.textContent = dep.name;
        departmentsSelector.appendChild(optionTag);
    });
}


const filTableByDepartment = (dataObj) => {
    const { employees, departments, shifts, departmentId } = dataObj;
    const emp = employees.filter(empl => empl.departmentId === departmentId);

    emp.forEach(item => {
        const tr = document.createElement('tr');
        const fullName = document.createElement('td');
        const department = document.createElement('td');
        const shiftss = document.createElement('td');
        const shiftsList = document.createElement('ul');
        const fullNameLink = document.createElement('a');
        const departmentLink = document.createElement('a');


        fullNameLink.textContent = `${item.firstName} ${item.lastName}`;
        const { name: departmentName, _id: id } = departments.find(dep => dep._id === item.departmentId)
        departmentLink.textContent = departmentName;
        fullNameLink.href = `http://localhost:3000/authusers/employees/edit/?id=${item._id}`
        departmentLink.href = `http://localhost:3000/authusers/departments/edit/?id=${id}`

        fullName.classList.add('text-dark')
        fullNameLink.classList.add('link-dark')
        department.classList.add('text-dark')
        departmentLink.classList.add('link-dark')
        
        item.shiftsId.forEach(element => {
            const shiftDit = shifts.find(shi => shi._id === element)
            
            const shift = document.createElement('li');

            shift.textContent = `${shiftDit.date}-${shiftDit.startingHour}-${shiftDit.endingHour}`;
            shift.classList.add('text-decoration-none')
            shiftsList.appendChild(shift);
            

        });

        fullName.appendChild(fullNameLink)
        department.appendChild(departmentLink)
        shiftss.appendChild(shiftsList)
        tr.appendChild(fullName);
        tr.appendChild(department);
        tr.appendChild(shiftss);
        tbody.appendChild(tr);
    });
}
departmentsSelector.addEventListener('change', (e) => {
    if (departmentsSelector.value !== '') {
        tbody.innerHTML = '';
        getAllEmployees(departmentsSelector.value).then(value => filTableByDepartment(value))

        console.log('hello')
    } else {
        tbody.innerHTML = '';
        getAllEmployees().then(value => filTable(value))
    }
})
newEmployee.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/authusers/employees/create';
})