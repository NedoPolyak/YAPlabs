const passwordList = document.getElementById("password-list");
const form = document.getElementById("add-password-form");
const generateBtn = document.getElementById("generate-password");
const complexitySlider = document.getElementById("complexity");
const complexityLabel = document.getElementById("complexity-label");

const updateComplexityLabel = () => {
    const level = parseInt(complexitySlider.value);
    const labels = ["Low", "Medium", "Hard"];
    complexityLabel.textContent = labels[level - 1];
};

complexitySlider.addEventListener("input", updateComplexityLabel);

function loadPasswords() {
    const passwordList = document.getElementById('password-list');
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    passwordList.innerHTML = '';

    //Если пароли есть
    if (passwords.length > 0) {
        passwords.forEach((password, index) => {

            const li = document.createElement('li');
            li.innerHTML = `
                <div><strong>Login:</strong> ${password.login}</div>
                <div><strong>URL:</strong> ${password.url}</div>
                <div><strong>Password:</strong>${password.password}</div>
            `;
            

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deletePassword(index);
            li.appendChild(deleteButton);
            
            passwordList.appendChild(li);
        });
    } else {
        //Если нет сохраненных паролей
        passwordList.textContent = "No passwords";
    }
}

function deletePassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1);  //Удалить пароль
    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords();
}

const generatePassword = (complexity) => {
    const charSets = {
        1: "abcdefghijklmnopqrstuvwxyz", //Низкая слоджность пароля
        2: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", //Средняя слоджность пароля
        3: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+<>?" //Высокая слоджность пароля
    };

    const chars = charSets[complexity];
    return Array.from({ length: 12 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join("");
};

generateBtn.addEventListener("click", () => {
    const complexity = parseInt(complexitySlider.value);
    const password = generatePassword(complexity);
    document.getElementById("password").value = password;
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const url = document.getElementById('url').value;

    const newPassword = { login, password, url };
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push(newPassword);

    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords();
});

window.onload = loadPasswords;
updateComplexityLabel();

/*
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}*/