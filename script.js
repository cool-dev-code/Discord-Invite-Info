
let darkMode = false;

// Detect dark mode preference in the system
function detectDarkMode() {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  darkMode = prefersDarkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  document.querySelector(".container").classList.toggle("dark-mode", darkMode);
  document.querySelector(".response").classList.toggle("dark-mode", darkMode);
  document.querySelector(".raw-response").classList.toggle("dark-mode", darkMode);
  document.querySelector(".more-details").classList.toggle("dark-mode", darkMode);
  document.querySelector("input[type='text']").classList.toggle("dark-mode", darkMode);
}

// Function to toggle dark mode manually
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  document.querySelector(".container").classList.toggle("dark-mode", darkMode);
  document.querySelector(".response").classList.toggle("dark-mode", darkMode);
  document.querySelector(".raw-response").classList.toggle("dark-mode", darkMode);
  document.querySelector(".more-details").classList.toggle("dark-mode", darkMode);
  document.querySelector("input[type='text']").classList.toggle("dark-mode", darkMode);
}

// Call dark mode detection on page load
window.addEventListener('load', detectDarkMode);

function fetchInviteData() {
  const inviteURL = document.getElementById("inviteURL").value;
  const inviteCode = inviteURL.split("/").pop();
  const apiURL = `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      document.getElementById("responseData").style.display = "block";

      // Invite code
      document.getElementById("inviteCode").textContent = data.code;

      // Guild info
      document.getElementById("serverName").textContent = data.guild.name;
      document.getElementById("guildDescription").textContent = data.guild.description;
      document.getElementById("membersServer").textContent = data.approximate_member_count;
      document.getElementById("membersOnline").textContent = data.approximate_presence_count;
      document.getElementById("expirationTime").textContent = new Date(data.expires_at).toLocaleString();

      // Inviter info
      document.getElementById("inviterUsername").textContent = `${data.inviter.username}#${data.inviter.discriminator}`;
      document.getElementById("inviterDisplayName").textContent = data.inviter.global_name || "N/A";
      document.getElementById("inviterpfp").src = `https://cdn.discordapp.com/avatars/${data.inviter.id}/${data.inviter.avatar}.png`;

      // Show raw response
      document.getElementById("prettyRawResponse").textContent = JSON.stringify(data, null, 2);

      // More Details
      document.getElementById("verificationLevel").textContent = data.guild.verification_level;
      document.getElementById("guildFeatures").textContent = data.guild.features.join(", ");
      document.getElementById("nsfwLevel").textContent = data.guild.nsfw_level;
    })
    .catch(err => {
      alert("Error fetching data. Please check the invite URL.");
    });
}

function toggleRawResponse() {
  const rawResponse = document.getElementById("rawResponse");
  rawResponse.style.display = rawResponse.style.display === "block" ? "none" : "block";
}

function toggleMoreDetails() {
  const moreDetails = document.getElementById("moreDetails");
  moreDetails.style.display = moreDetails.style.display === "block" ? "none" : "block";
}