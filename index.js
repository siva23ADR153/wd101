
const retrieveEntries = () => {
    try {
        const entries = localStorage.getItem("user-entries");
        return entries ? JSON.parse(entries) : [];
    } catch (error) {
        console.error("Error parsing entries from localStorage:", error);
        return [];
    }
};

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => `
        <tr>
            <td class="border px-5 py-3">${entry.name}</td>
            <td class="border px-5 py-3">${entry.email}</td>
            <td class="border px-5 py-3">${entry.password}</td>
            <td class="border px-5 py-3">${entry.dob}</td>
            <td class="border px-5 py-3">${entry.acceptedTermsAndConditions ? 'true' : 'false'}</td>
        </tr>
    `).join("");

    document.getElementById("user-entries").innerHTML = tableEntries;
};

const validateDob = (dob) => {
    const dobDate = new Date(dob);
    const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (age < 18 || age > 55) {
        alert("Please enter the user date of birth between 18 and 55 years old.");
        return false;
    }
    return true;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validateDob(dob)) {
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions,
    };

    const userEntries = retrieveEntries();
    userEntries.push(entry);

    try {
        localStorage.setItem("user-entries", JSON.stringify(userEntries));
        displayEntries();
    } catch (error) {
        console.error("Error saving entries to localStorage:", error);
    }

    event.target.reset();
};

document.getElementById("user-form").addEventListener("submit", saveUserForm);

displayEntries();
