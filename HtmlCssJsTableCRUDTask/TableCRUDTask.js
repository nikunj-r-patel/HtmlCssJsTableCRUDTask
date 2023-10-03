
const hobbies = [];
function addEmployee() {
    const formTag = document.getElementById("empForm");
    formTag.addEventListener("keyup", inputValidation);
    // const isInputValid = inputValidation();
    if (inputValidation) {
        let hobs = document.querySelectorAll("input[type='checkbox']:checked")
        for (let i = 0; i < hobs.length; i++) {
            hobbies.push(hobs[i].value);
        }
        const name = formTag.elements.name.value;
        const gender = formTag.elements.gender.value;
        const dob = formTag.elements.dob.value;
        const email = formTag.elements.email.value;
        const mobile = formTag.elements.mobile.value;
        const hobby = hobbies;
        const employeeObj = {
            name: name,
            gender: gender,
            dob: dob,
            email: email,
            mobile: mobile,
            hobbies: hobby,
        };
        const employeeList = JSON.parse(localStorage.getItem("empList")) || [];
        employeeList.push(employeeObj);
        localStorage.setItem("empList", JSON.stringify(employeeList));
        const basicTable = document.getElementById("empListInRow");
        const newLine = basicTable.insertRow();
        const cells = [name, gender, dob, email, mobile, hobbies];
        for (let i = 0; i < cells.length; i++) {
            const cell = newLine.insertCell(i); // create a row
            cell.innerHTML = cells[i]; // insert data
        }
        updateColumnInAdvanced();
        formTag.reset();
        window.location.reload();
        hobbies.splice(0, hobbies.length);
    }
}
var columnNo = 0;
function updateColumnInAdvanced() {
    columnNo++;
    cell1 = document.getElementById("nameColumn").insertCell(columnNo);
    cell1.innerHTML = document.getElementById("name").value;
    cell2 = document.getElementById("genderColumn").insertCell(columnNo);
    cell2.innerHTML = document.querySelector("input[name='gender']:checked").value;
    cell3 = document.getElementById("dobColumn").insertCell(columnNo);
    cell3.innerHTML = document.getElementById("dob").value;
    cell4 = document.getElementById("emailColumn").insertCell(columnNo);
    cell4.innerHTML = document.getElementById("email").value;
    cell5 = document.getElementById("mobileColumn").insertCell(columnNo);
    cell5.innerHTML = document.getElementById("mobile").value;
    cell6 = document.getElementById("hobbyColumn").insertCell(columnNo);
    cell6.innerHTML = hobbies;
}
function inputValidation() {
    const formTag = document.getElementById("empForm");
    const name = formTag.elements.name.value;
    const dob = formTag.elements.dob.value;
    const email = formTag.elements.email.value;
    const mobile = formTag.elements.mobile.value;
    let isInputValid = true;
    if (name.trim() === "") {
        document.getElementById("nameValidate").innerHTML = "Please enter Name here";
        isInputValid = false;
    } else if (name.length < 4 || name.length > 20) {
        document.getElementById("nameValidate").innerHTML = "Please enter Name between  min 4 and max 20 characters";
        isInputValid = false;
    } else {
        document.getElementById("nameValidate").style.display = "none";
    }
    const dateToday = new Date();
    const dateInput = new Date(dob);
    if (!dateInput >= dateToday) {
        document.getElementById("dateValidate").innerHTML = "Please enter valid date here, future date not allowed";
        isInputValid = false;
    } else {
        document.getElementById("dateValidate").style.display = "none";
    }
    if (!emailValidation(email)) {
        document.getElementById("emailValidate").innerHTML = "Please enter valid email format here";
        isInputValid = false;
    } else {
        document.getElementById("emailValidate").style.display = "none";
    }
    const mobileNoPatern = /^[0-9]{10}$/;
    if (!mobile.match(mobileNoPatern)) {
        document.getElementById("mobileValidate").innerHTML = "Please enter 10 digit mobile number";
        isInputValid = false;
    } else {
        document.getElementById("mobileValidate").style.display = "none";
    }
    return isInputValid;
}
function emailValidation() {
    const emailIdPatern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    return email.match(emailIdPatern);
}
window.addEventListener("load", function () {
    let employeeList = JSON.parse(localStorage.getItem("empList")) || [];
    const basicTable = document.getElementById("empListInRow");
    employeeList.forEach(function (employeeObj, index) {
        const newLine = basicTable.insertRow();
        const cells = [
            employeeObj.name,
            employeeObj.gender,
            employeeObj.dob,
            employeeObj.email,
            employeeObj.mobile,
            employeeObj.hobbies.join(","),
            `<button class="editEmp" onclick="editEmployee(${index})" >Edit</button>`,
            `<button class="deleteEmp" onclick="deleteEmployee(${index})" >Delete</button>`,
        ];
        for (let i = 0; i < cells.length; i++) {
            const cell = newLine.insertCell(i);
            cell.innerHTML = cells[i];
        }
    });
    employeeList.forEach(function (employeeObj, index) {
        addColumnInAdvanced(employeeObj, index);
    });
});
var columnNo = 0;
function addColumnInAdvanced(employeeObj, index) {
    columnNo++;
    cell1 = document.getElementById("nameColumn").insertCell(columnNo);
    cell1.innerHTML = employeeObj.name;
    cell2 = document.getElementById("genderColumn").insertCell(columnNo);
    cell2.innerHTML = employeeObj.gender;
    cell3 = document.getElementById("dobColumn").insertCell(columnNo);
    cell3.innerHTML = employeeObj.dob;
    cell4 = document.getElementById("emailColumn").insertCell(columnNo);
    cell4.innerHTML = employeeObj.email;
    cell5 = document.getElementById("mobileColumn").insertCell(columnNo);
    cell5.innerHTML = employeeObj.mobile;
    cell6 = document.getElementById("hobbyColumn").insertCell(columnNo);
    cell6.innerHTML = employeeObj.hobbies.join(",");
    cell7 = document.getElementById("editColumn").insertCell(columnNo);
    cell7.innerHTML = `<button class="editEmp" onclick="editEmployee(${index})" >Edit</button>`;
    cell8 = document.getElementById("deleteColumn").insertCell(columnNo);
    cell8.innerHTML = `<button class="deleteEmp" onclick="deleteEmployee(${index})" >Delete</button>`;
}
function editEmployee(index) {
    const employeeList = JSON.parse(localStorage.getItem("empList")) || [];
    const emplyeeToBeEdited = employeeList[index];
    const formTag = document.getElementById("empForm");
    formTag.elements.name.value = emplyeeToBeEdited.name;
    formTag.elements.gender.value = emplyeeToBeEdited.gender;
    formTag.elements.dob.value = emplyeeToBeEdited.dob;
    formTag.elements.email.value = emplyeeToBeEdited.email;
    formTag.elements.mobile.value = emplyeeToBeEdited.mobile;
    const hobs = emplyeeToBeEdited.hobbies;

    let hobbiesSelected = document.querySelectorAll('input[name="hobby"]');
    hobbiesSelected.forEach((checkbox) => {
        checkbox.checked = hobs.includes(checkbox.value);
    });
    const submitButton = formTag.querySelector("#submitButton");
    submitButton.value = "Update";
    submitButton.innerHTML = "Update";
    submitButton.onclick = function () {
        updateEmployee(index);
    };
    const resetButton = formTag.querySelector("#resetButton");
    resetButton.style.display = "inline-block";
    resetButton.onclick = function () {
        cancelEdit();
    };
}
function updateEmployee(index) {
    console.log("update employee");
    const formTag = document.getElementById("empForm");
    const employeeList = JSON.parse(localStorage.getItem("empList")) || [];
    const emplyeeToBeUpdated = employeeList[index];
    formTag.addEventListener("keyup", inputValidation);
    // const isInputValid = inputValidation();
    if (inputValidation) {
        emplyeeToBeUpdated.name = formTag.elements.name.value;
        emplyeeToBeUpdated.gender = formTag.elements.gender.value;
        emplyeeToBeUpdated.dob = formTag.elements.dob.value;
        emplyeeToBeUpdated.email = formTag.elements.email.value;
        emplyeeToBeUpdated.mobile = formTag.elements.mobile.value;
        emplyeeToBeUpdated.hobbies = [];
        let hobs = document.querySelectorAll("input[type='checkbox']:checked")
        for (let i = 0; i < hobs.length; i++) {
            emplyeeToBeUpdated.hobbies.push(hobs[i].value);
        }
        addEmployee();
        updateColumnInAdvanced();
        localStorage.setItem("empList", JSON.stringify(employeeList));
        formTag.reset();
    }
}
function deleteEmployee(index) {
    const employeeList = JSON.parse(localStorage.getItem("empList"));
    employeeList.splice(index, 1);
    window.location.reload();
    localStorage.setItem("empList", JSON.stringify(employeeList));
}
function cancelEdit() {
    const formTag = document.getElementById("empForm");
    const submitButton = formTag.querySelector("#submitButton");
    submitButton.value = "submit";
    submitButton.innerHTML = "Submit";
    submitButton.onClick = function () {
        addEmployee();
        updateColumnInAdvanced();
        return false;
    };
    formTag.reset();
    const resetButton = formTag.querySelector("#resetButton");
    resetButton.style.display = "none";
}

