let cl = console.log;
const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const stdContainer = document.getElementById("stdContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");



let stdArray = JSON.parse(localStorage.getItem("stdInfo")) || []

const onEdit = (ele) => {
    cl(ele)
    let getId = ele.closest("tr").id;
    cl(getId);
    localStorage.setItem("editId", getId)
    let getObj = stdArray.find(std => std.stdId === getId)
    cl(getObj)
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    fnameControl.value = getObj.fname;
    lnameControl.value = getObj.lname;
    emailControl.value = getObj.email;
    contactControl.value = getObj.contact;
}
const onDelete = (ele) => {
    //cl("delete");
    cl(ele.closest("tr").id)
    let getId = ele.closest("tr").id;
    let getIndex = stdArray.findIndex(std => {
        return std.stdId === getId;
    })
    cl(getIndex)
    stdArray.splice(getIndex, 1);
    localStorage.setItem("stdInfo", JSON.stringify(stdArray));
    document.getElementById(getId).remove();
}
const templating = (arr) => {
    let result = ``;
    arr.forEach((std, i) => {
        result += `
             <tr id="${std.stdId}">
                   <td>${i+1}</td>
                   <td>${std.fname}</td>
                   <td>${std.lname}</td>
                   <td>${std.email}</td>
                   <td>${std.contact}</td>    
                   <td>
                        <button class="btn btn-primary"onclick="onEdit(this)">Edit</button> 
                   </td> 
                   <td>
                       <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                   </td>
             </tr>
        `
    })
    stdContainer.innerHTML = result;
}
templating(stdArray);

const onstdAdd = (eve) => {
    eve.preventDefault();
    //cl("submitted...")
    let stdObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: generateUUID()
    }
    stdArray.push(stdObj)
    localStorage.setItem("stdInfo", JSON.stringify(stdArray))
    templating(stdArray);
    stdForm.reset();
    cl(stdArray);
}
const onStdUpdate = () => {
    //cl("updated");
    let getId = localStorage.getItem("editId");
    cl(getId)
    stdArray.forEach(std => {
        if (std.stdId === getId) {
            std.fname = fnameControl.value;
            std.lname = lnameControl.value;
            std.email = emailControl.value;
            std.contact = contactControl.value;
        }
    })
    localStorage.setItem("stdInfo", JSON.stringify(stdArray));
    templating(stdArray);
    let getTr = [...document.getElementById(getId).children];
    cl(getTr)
    getTr[1] = fnameControl.value;
    getTr[2] = lnameControl.value;
    getTr[3] = emailControl.value;
    getTr[4] = contactControl.value;
    stdForm.reset();
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");

}
stdForm.addEventListener("submit", onstdAdd);
updateBtn.addEventListener("click", onStdUpdate);

function generateUUID() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}