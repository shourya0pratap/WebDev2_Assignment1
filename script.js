// Fetch
const eventForm = document.getElementById("eventForm");
const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventCategoryInput = document.getElementById("eventCategory");
const eventDescriptionInput = document.getElementById("eventDescription");

const clearAllBtn = document.getElementById("clear-btn");
const addSampleBtn = document.getElementById("sample-btn");
const eventContainer = document.getElementById("eventContainer");

// Sample Events
const sampleEvents = [
  {
    title: "Birthday",
    date: "2026-02-26",
    category: "Social",
    description: "Happy Birthday!",
  },
  {
    title: "Hack KRMU",
    date: "2026-02-18",
    category: "Social",
    description: "Hackathon",
  },
];

function updateEmptyState() {
  const emptyMsg = eventContainer.querySelector(".empty-msg");

  if (eventContainer.querySelectorAll(".event-item").length > 0 && emptyMsg) {
    emptyMsg.remove();
  } else if (
    eventContainer.querySelectorAll(".event-item").length === 0 &&
    !emptyMsg
  ) {
    eventContainer.innerHTML = `<p class="empty-msg">No events yet. Add your first event!</p>`;
  }
}

// Create Card
function createEventCard(eventData) {
  const card = document.createElement("div");
  card.className = "event-item";

  card.innerHTML = `
    <div class="event-header">
        <h3>${eventData.title}</h3>
        <button class="delete-btn" title="Delete Event">X</button>
    </div>
    <div class="event-date">📅 ${eventData.date}</div>
    <div class="event-category">${eventData.category}</div>
    <p class="event-desc">${eventData.description}</p>
  `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.style.opacity = "0";
    setTimeout(() => {
      card.remove();
      updateEmptyState();
    }, 200);
  });

  return card;
}

// Submit Form
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const eventData = {
    title: eventNameInput.value,
    date: eventDateInput.value,
    category: eventCategoryInput.value,
    description: eventDescriptionInput.value,
  };

  const newCard = createEventCard(eventData);

  const emptyMsg = eventContainer.querySelector(".empty-msg");
  if (emptyMsg) emptyMsg.remove();

  eventContainer.appendChild(newCard);
  eventForm.reset();
});

addSampleBtn.addEventListener("click", () => {
  sampleEvents.forEach((data) => {
    const emptyMsg = eventContainer.querySelector(".empty-msg");
    if (emptyMsg) emptyMsg.remove();
    eventContainer.appendChild(createEventCard(data));
  });
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete all events?")) {
    eventContainer.innerHTML = "";
    updateEmptyState();
  }
});

// Target DOM Demo Box
const demoBox = document.querySelector(".demo-box");

// Update DOM Tracker
function updateTracker(type, value) {
  demoBox.innerHTML = `
    <div class="tracker-line">
      <span>Last Event:</span>
      <span class="key-badge">${type}</span>
    </div>
    <div class="tracker-line">
      <span>Value/Button:</span>
      <span style="color: #fbbf24">${value}</span>
    </div>
  `;
}

// Mouse Events
window.addEventListener("mousedown", (e) => {
  const buttons = ["Left Click", "Middle Click", "Right Click"];
  updateTracker("Mouse Pressed", buttons[e.button] || `Button ${e.button}`);
});

// Keyboard Events
window.addEventListener("keydown", (e) => {
  if (e.key === " ") e.preventDefault();

  const keyName = e.key === " " ? "Space" : e.key;
  updateTracker("Key Pressed", keyName);
});
