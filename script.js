// Track attendance
let attendeeList = [];
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let count = 0;
const maxCount = 50;

// Load saved counts from local storage
function loadCounts() {
  const savedCount = localStorage.getItem("totalCount");
  const savedWaterCount = localStorage.getItem("waterCount");
  const savedZeroCount = localStorage.getItem("zeroCount");
  const savedPowerCount = localStorage.getItem("powerCount");

  if (savedCount) {
    count = parseInt(savedCount);
    document.getElementById("attendeeCount").textContent = count;

    // Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage;
  }

  if (savedWaterCount) {
    document.getElementById("waterCount").textContent = savedWaterCount;
  }

  if (savedZeroCount) {
    document.getElementById("zeroCount").textContent = savedZeroCount;
  }

  if (savedPowerCount) {
    document.getElementById("powerCount").textContent = savedPowerCount;
  }

  // Load attendee list
  const savedAttendeeList = localStorage.getItem("attendeeList");
  if (savedAttendeeList) {
    attendeeList = JSON.parse(savedAttendeeList);
    updateAttendeeListDisplay();
  }
}

// Save counts to local storage
function saveCounts() {
  localStorage.setItem("totalCount", count);
  localStorage.setItem(
    "waterCount",
    document.getElementById("waterCount").textContent
  );
  localStorage.setItem(
    "zeroCount",
    document.getElementById("zeroCount").textContent
  );
  localStorage.setItem(
    "powerCount",
    document.getElementById("powerCount").textContent
  );
  localStorage.setItem("attendeeList", JSON.stringify(attendeeList));
}

// Update attendee list display
function updateAttendeeListDisplay() {
  const container = document.getElementById("attendeeListContainer");

  if (attendeeList.length === 0) {
    container.innerHTML =
      '<p class="no-attendees">No attendees checked in yet.</p>';
    return;
  }

  let listHTML = "";
  for (let i = 0; i < attendeeList.length; i++) {
    const attendee = attendeeList[i];
    listHTML =
      listHTML +
      `
      <div class="attendee-item">
        <span class="attendee-name">${attendee.name}</span>
        <span class="attendee-team">${attendee.teamName}</span>
      </div>
    `;
  }

  container.innerHTML = listHTML;
}

// Load counts when page loads
loadCounts();

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  //Increment count
  count++;
  const attendeeCount = document.getElementById("attendeeCount");
  // Max amount of attendees
  if (attendeeCount.textContent < 50) {
    attendeeCount.textContent = parseInt(attendeeCount.textContent) + 1;
    console.log("check ins: ", count);
  }

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;

  //Update teamCounter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Add attendee to list
  attendeeList.push({
    name: name,
    teamName: teamName,
  });

  // Update attendee list display
  updateAttendeeListDisplay();

  //show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  const messageOutput = document.getElementById("greeting");
  messageOutput.textContent = message;
  messageOutput.classList.add("active", "success-message");
  messageOutput.style.display = "block";

  // Save all counts to local storage
  saveCounts();

  form.reset();
});
