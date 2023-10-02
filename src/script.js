const loginLock = document.querySelector(".bi-lock");
const loginSection = document.querySelector(".login_section");
const loginTime = document.querySelector("#loginTime");
const headerDate = document.querySelector("#headerDate");
const footerTime = document.querySelector("#footerTime");
const enterBtn = document.querySelector("#enterBtn");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginErrorMessage = document.querySelector("#loginErrorMessage");
const body = document.querySelector("body");
const topPersonIcon = document.querySelector(".bi-person-circle");
const mainElement = document.querySelector("main");

//  ➡️ Screen variables 
const LockScreen = document.querySelector("#LockScreen");
const homeScreenHTML = `<section id="HomeScreen">
<div class="folders">
	<div class="folder hover" id="bioFolder">
		<img src="img/folderIcon.png" alt="a folder icon">
		<span>Biography</span>
	</div>
	<div class="folder hover">
		<img src="img/folderIcon.png" alt="a folder icon">
		<span>Works</span>
	</div>
	<div class="folder hover">
		<img src="img/folderIcon.png" alt="a folder icon">
		<span>Feast Day</span>
	</div>
	<div class="folder hover">
		<img src="img/folderIcon.png" alt="a folder icon">
		<span>Legacy</span>
	</div>
	<div class="folder hover">
		<img src="img/folderIcon.png" alt="a folder icon">
		<span>The Lion</span>
	</div>
	<div class="folder hover">
		<img src="img/chestIcon.png" alt="a folder icon">
		<span>Treasure</span>
	</div>
</div>
</section>`;
const biographyHTML = `<section class="overlay">
<div class="myModal" data-modal="location">
	<div class="popup-header">
		<p class="title"><i class="bi bi-star-fill"></i> Biography</p>
		<i class="bi bi-x-lg"></i>
	</div>
	<div class="popup-body">
		<h1>St. Jerome's Biography</h1>
		<hr class="topBorder">
		<img
			src="https://www.nationalgallery.org.uk/media/33514/n-2093-00-000010-hd.jpg?cc=0.036224384185468785,0.0036690661339997925,0.058166011177811547,0.67528764714101841&width=350&height=350&rnd=132385865740500000"
			alt="Painting of Saint Jerome by Moretto de Brescia"
			class="myFloatLeft" />
		<p>
			St. Jerome, Latin in full Eusebius Hieronymus, pseudonym Sophronius, (born c. 347, Stridon, Dalmatia—died 419/420, Bethlehem, Palestine; feast day September 30), biblical translator
			and monastic leader, traditionally regarded as the most learned of the Latin Fathers.
		</p>
		<p>
			St. Jerome, Latin in full Eusebius Hieronymus, pseudonym Sophronius, (born c. 347, Stridon, Dalmatia—died 419/420, Bethlehem, Palestine; feast day September 30), biblical translator
			and monastic leader, traditionally regarded as the most learned of the Latin Fathers.
		</p>
		<p>
			St. Jerome, Latin in full Eusebius Hieronymus, pseudonym Sophronius, (born c. 347, Stridon, Dalmatia—died 419/420, Bethlehem, Palestine; feast day September 30), biblical translator
			and monastic leader, traditionally regarded as the most learned of the Latin Fathers.
		</p>
		<p>
			St. Jerome, Latin in full Eusebius Hieronymus, pseudonym Sophronius, (born c. 347, Stridon, Dalmatia—died 419/420, Bethlehem, Palestine; feast day September 30), biblical translator
			and monastic leader, traditionally regarded as the most learned of the Latin Fathers.
		</p>
	</div>
</div>
</section>`;

loginSection.style.display = "none";

// >> Lock Icon at the taskbar/footer
loginLock.addEventListener("click", function () {
	const sectionElements = mainElement.querySelectorAll("section");
	var display = loginSection.dataset.display;

	if (display == "false") {
		loginSection.style.display = "flex";
		loginSection.dataset.display = "true";
		loginLock.title = "Lock screen";
	} else {
		if (display == "true") {
			loginLock.title = "View login popup";
		}
		loginSection.style.display = "none";
		loginSection.dataset.display = "false";
	}

	// if not on the locked screen mode, hide the other interfaces and show the locked screen
	if (body.dataset.current !== "LockedScreen") {
		sectionElements.forEach(function (section) {
			if (section.id === "LockScreen") {
				// Show LockScreen and update styles
				section.style.display = "flex";
				topPersonIcon.title = "You have not logged in yet.";
				topPersonIcon.style.color = "#8b1010";
				section.style.backgroundColor = "rgba(255, 255, 255, 0.249)";
			} else {
				// Hide other sections
				section.remove();
			}
		});

		// Update body's data-current attribute
		body.dataset.current = "LockedScreen";
	}
});

//  >> Login Section's Enter Button
enterBtn.addEventListener("click", function (e) {
	e.preventDefault();
	if (loginUsername.value === "stjerome" && loginPassword.value === "1") {
		loginSection.style.display = "none";
		loginSection.dataset.display = "true";
		LockScreen.style.backgroundColor = "rgba(255, 255, 255, 0 )";

		topPersonIcon.title = "Logged In";
		topPersonIcon.style.color = "#999C75";

		loginUsername.value = "";
		loginPassword.value = "";

		LockScreen.style.display = "none";

		body.dataset.current = "HomeScreen";

		addHomeScreen();

		loginErrorMessage.textContent = "";
	} else {
		loginErrorMessage.textContent = "- error: incorrect details";
	}
});

function addSection(html, container) {
	// Create a temporary <div> element to hold the parsed HTML
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = html;

	// Append the first child of the tempDiv to the container
	if (tempDiv.firstChild) {
		container.appendChild(tempDiv.firstChild);
	}
}

function searchScreenHTML() {
	const HomeScreen = mainElement.querySelector("#HomeScreen");
	if (HomeScreen !== null) {
		const folders = HomeScreen.querySelectorAll(".folder");

		folders.forEach(function (folder) {
			folder.addEventListener("click", function () {
				// if the folder class also has the hover class


				let id = folder.id;
				if (id == "bioFolder") {
					// Check if the biography section is already added
					const biographySection = HomeScreen.querySelector("#BiographySection");
					setInterval(() => {
						closeModal();
					}, 100);
					if (!biographySection) {
						// Add the biographyHTML if it's not already added
						addSection(biographyHTML, HomeScreen);
					}
				}
			});
		});
	}
}

function addHomeScreen() {
	addSection(homeScreenHTML, mainElement);

	searchScreenHTML();
}

function closeModal() {
	let closeBtn = mainElement.querySelector("#closeBtn");
	let myModal = mainElement.querySelector(".myModal");

	if (closeBtn && myModal) {
		closeBtn.addEventListener("click", function () {
			myModal.remove();
		});
	}
}

// >> Updates the time and date
function updateTime() {
	let now = new Date();
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let hours = now.getHours();
	let date = now.getDate();
	let period = "AM";
	let ordinal = "th";

	if (hours >= 12) {
		period = "PM";
		if (hours > 12) {
			hours -= 12;
		}
	}
	if (date == 1) {
		ordinal = "st";
	} else if (date == 2) {
		ordinal = "nd";
	} else if (date == 3) {
		ordinal = "rd";
	} else if (date >= 4 && date <= 20) {
		ordinal = "th";
	} else if (date % 10 == 1) {
		ordinal = "st";
	} else if (date % 10 == 2) {
		ordinal = "nd";
	} else if (date % 10 == 3) {
		ordinal = "rd";
	} else {
		ordinal = "th";
	}

	//  Set the time
	loginTime.textContent = `${hours.toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${period}`;
	footerTime.textContent = `${hours.toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${period}`;

	// Set date in header
	headerDate.textContent = `${days[now.getDay()]} ${date}${ordinal} ${months[now.getMonth()]} ${now.getFullYear()}`;

	//
	footerTime.title = headerDate.textContent;
}

searchScreenHTML();

setInterval(updateTime, 100);
