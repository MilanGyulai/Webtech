

function loadNavigation() {
    fetch('nav.html')
        .then(res => res.text())
        .then(navHtml => {
            const body = document.querySelector('body');
            body.insertAdjacentHTML('afterbegin', navHtml);
        })
        .catch(err => console.error(err));
}

loadNavigation();


function searchUser() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Kérlek, add meg a felhasználónevet!');
        return;
    }

    fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Eredmények törlése

            if (data.items && data.items.length > 0) {
                data.items.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.innerHTML = `
                        <img src="${user.avatar_url}" width="50">
                        <p>${user.login}</p>
                    `;
                    resultsDiv.appendChild(userDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>Nincs találat.</p>';
            }
        })
        .catch(error => {
            console.error('Hiba történt:', error);
            alert('Hiba történt a keresés során.');
        });
}