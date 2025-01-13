class ChatBotComponent extends HTMLElement {
  chatArray = [];
  agentId = "";
  sessionId = "";
  apiToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ`;
  interactApi = "https://ig.gov-cloud.ai/mobius-gpt-service/interact";
  adhocUrl = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc"
  historySchemaId =  `6780ec8b2028154e85126321`//`677f8ae42028154e8512622c`//`677e9d662028154e8512607a`// `67728644af1fd173800878f3`;
  toolschemaId = `6780f2a82028154e85126342`
  // pollingInterval = 10000; // For managing polling
  
  constructor() {
    super();
    this.render();
    this.recognition = null; // Web Speech API recognition instance
    this.isListening = false; // Track if recognition is active
    this.initializeSpeechRecognition();
  }
  connectedCallback() {
    console.log("ChatBotComponent connected.");
    this.fetchPreviousMessages();
    // this.startPolling();
    this.addEventListeners();
  }
  clearChatHistory() {
    this.chatArray = []; // Assuming chatArray holds the chat messages
    this.render(); // Re-render to show an empty chat display
    console.log("Chat history cleared.");
  }
  initializeSpeechRecognition() {
    // Check if the browser supports the Web Speech API
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Web Speech API is not supported in this browser.");
      return;
    }
   const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  this.recognition = new SpeechRecognition();
  this.recognition.lang = "en-US"; // Set language to English
  this.recognition.continuous = false; // Stop listening after speech ends
  this.recognition.interimResults = false; // Only final results

   // Handle recognition results
   this.recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Recognized speech:", transcript);
    const userInput = this.querySelector("#user-input");
    if (userInput) {
      userInput.value = transcript; // Populate the input box with the transcript
    }
  };

  // Handle recognition errors
  this.recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  // Reset `isListening` when recognition ends
  this.recognition.onend = () => {
    console.log("Speech recognition ended.");
    this.isListening = false;
  };
}

  render() {
    this.innerHTML = `
    <div class="chatContainer">
      <div class="chatDisplay">
        ${this.chatArray.map((msg, index) => `
          <div class="messageCont ${msg.type === "user" ? "user-side" : "bot-side"}">
            <div class="message ${msg.type}-message ${msg.isTyping ? "typing-indicator" : ""}">
               <div class="${msg.type === "user" ? "userText" : "botText"}">
                ${msg.isTyping 
                  ? `<span class="typing">Typing<span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` 
                  : `${msg.content}
                     ${msg.type === "bot" 
                       ? `<img src="./volume.png" alt="Speaker Icon" class="speakerIcon" data-msg="${msg.content}" data-index="${index-1}" />` 
                       : ""}`}
              </div>
              <div class="messageMeta">
                ${msg.createdAt 
                  ? `<span>${this.formatCreatedAt(msg.createdAt.split(".")[0])}</span>` 
                  : ""}
                ${msg.type === "user" 
                  ? `<img src="./pinUnmarked.png" alt="User Avatar" class="favIcon" data-index="${index}" data-chat-id="${msg.chatId || ""}" />` 
                  : ""}
                ${msg.type === "user" && msg.caller 
                  ? `<img src="${msg.caller !== "null" ? "./robot.png" : "./humanIcon.svg"}" alt="Icon" class="humanAgentIcon" />` 
                  : ""}

              </div>
            </div>
            ${msg.parentAgent ? `
              <div class="${msg.type === "user" ? "userArtifact" : "botArtifact"}">
                ${msg.parentAgent  && msg.type==="user"?
                 `<section class="${msg.type === "user" ? "userArtifactCont" : "botArtifactCont"}">
                     ${msg.toolName !== "null" ? `
                      <div class="innerDataCont">
                        <p class="keyName">${msg.type === "user" ? "Tools" : "UsedTools"}</p>
                        <p class="valueName">${msg.toolName}</p>
                      </div>` : ""}
                 </section>`
                : `
                  <section class="${msg.type === "user" ? "userArtifactCont" : "botArtifactCont"}">
                    ${msg.agentData.status ? `
                      <div class="innerDataCont">
                        ${msg.agentData.status != "null" 
                          ? `<p class="keyName">Artifact Status:</p><p class="valueName">${msg.agentData.status}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.agentData.msg ? `
                      <div class="innerDataCont">
                        ${msg.agentData.msg != "null" 
                          ? `<p class="keyName">Artifact msg:</p><p class="valueName">${msg.agentData.msg}</p>` 
                          : ""}
                      </div>` : `<div class="noartifactData"></div>`}
                    ${msg.agentData.schemaId ? `
                      <div class="innerDataCont">
                        ${msg.agentData.schemaId != "null" 
                          ? `<p class="keyName">Artifact:</p><p class="valueName">${msg.agentData.schemaId}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.agentData.entitySchemaName ? `
                      <div class="innerDataCont">
                        ${msg.agentData.entitySchemaName != "null" 
                          ? `<p class="keyName">Artifact name:</p><p class="valueName">${msg.agentData.entitySchemaName}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.toolName !== "null" ? `
                      <div class="innerDataCont">
                        <p class="keyName">${msg.type === "user" ? "Tool" : "Tool"}</p>
                        <p class="valueName">${msg.toolName}</p>
                      </div>` : ""}
                 
                    ${msg.agentData.error ? `
                      <div class="innerDataCont">
                        ${msg.agentData.error != "null" 
                          ? `<p class="keyName">Error:</p><p class="valueName">${msg.agentData.error}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.agentData.workflowName ? `
                      <div class="innerDataCont">
                        ${msg.agentData.workflowName != "null" 
                          ? `<p class="keyName">workflowName:</p><p class="valueName">${msg.agentData.workflowName}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.nameVal ? `
                      <div class="innerDataCont">
                        ${msg.nameVal != "null" 
                          ? `<p class="keyName">${msg.type === "user" ? "Call from" : "Response to"}</p><p class="valueName">${msg.nameVal}</p>` 
                          : ""}
                      </div>` : ""}
                  </section>` }
              </div>` 
              : 
                `${msg.subagent ? 
                `
              <div class="${msg.type === "user" ? "userArtifact" : "botArtifact"}">
                ${msg.subagent  && msg.type==="user"?
                 `<section class="${msg.type === "user" ? "userArtifactCont" : "botArtifactCont"}">
                     ${msg.toolName !== "null" ? `
                      <div class="innerDataCont">
                        <p class="keyName">${msg.type === "user" ? "Tools" : "UsedTools"}</p>
                        <p class="valueName">${msg.toolName}</p>
                      </div>` : ""}
                 </section>`
                : `
                  <section class="${msg.type === "user" ? "userArtifactCont" : "botArtifactCont"}">
                    ${msg.agentData.status ? `
                      <div class="innerDataCont">
                        ${msg.agentData.status != "null" 
                          ? `<p class="keyName">Artifact Status:</p><p class="valueName">${msg.agentData.status}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.agentData.msg ? `
                      <div class="innerDataCont">
                        ${msg.agentData.msg != "null" 
                          ? `<p class="keyName">Artifact msg:</p><p class="valueName">${msg.agentData.msg}</p>` 
                          : ""}
                      </div>` : `<div class="noartifactData"></div>`}
                    ${msg.agentData.schemaId ? `
                      <div class="innerDataCont">
                        ${msg.agentData.schemaId != "null" 
                          ? `<p class="keyName">Artifact:</p><p class="valueName">${msg.agentData.schemaId}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.agentData.entitySchemaName ? `
                      <div class="innerDataCont">
                        ${msg.agentData.entitySchemaName != "null" 
                          ? `<p class="keyName">Artifact name:</p><p class="valueName">${msg.agentData.entitySchemaName}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.toolName !== "null" ? `
                      <div class="innerDataCont">
                        <p class="keyName">${msg.type === "user" ? "Tool" : "Tool"}</p>
                        <p class="valueName">${msg.toolName}</p>
                      </div>` : ""}
                 
                    ${msg.agentData.error ? `
                      <div class="innerDataCont">
                        ${msg.agentData.error != "null" 
                          ? `<p class="keyName">Error:</p><p class="valueName">${msg.agentData.error}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.agentData.workflowName ? `
                      <div class="innerDataCont">
                        ${msg.agentData.workflowName != "null" 
                          ? `<p class="keyName">workflowName:</p><p class="valueName">${msg.agentData.workflowName}</p>` 
                          : ""}
                      </div>` : ""}
                    ${msg.nameVal ? `
                      <div class="innerDataCont">
                        ${msg.nameVal != "null" 
                          ? `<p class="keyName">${msg.type === "user" ? "Call from" : "Response to"}</p><p class="valueName">${msg.nameVal}</p>` 
                          : ""}
                      </div>` : ""}
                  </section>` }
              </div>`  : 
               `<div class="noartifactData"></div>`}` 
              }
          </div>
        `).join("")}
      </div>
      <div class="inputContainer">
        <label for="file-upload"><img src="./attach-file.png" alt="Attach File Icon" class="fileIcon" /></label>
        <input type="file" id="file-upload" />
        <input type="text" id="user-input" placeholder="Type your message..." />
        <div id="send-btn"><img src="./sendIcon.png" class="sendIcon" /></div>
        <div id="audio"><img src="./sound-waves.png" class="audioIcon"/></div>
      </div>
    </div>
  `;  

// Add event listener to all speaker icons
const speakerIcons = this.querySelectorAll(".speakerIcon");
speakerIcons.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    const message = event.target.getAttribute("data-msg");
    const index = event.target.getAttribute("data-index");
    this.toggleMessagePlayback(message, index);
  });
});
}

// Variable to track if speech is playing and the current icon
isSpeaking = false;
currentSpeakingIcon = null;

// Method to toggle message playback
toggleMessagePlayback(message, index) {
if ('speechSynthesis' in window) {
  const allIcons = this.querySelectorAll(".speakerIcon");

  // If speech is playing, stop it and reset the icon
  if (this.isSpeaking) {
    window.speechSynthesis.cancel();
    this.resetIcon(this.currentSpeakingIcon);
    this.isSpeaking = false;
  } else {
    // Start speaking the message
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US'; // Optional: Set language
    utterance.rate = 1; // Optional: Adjust speech rate
    utterance.pitch = 1; // Optional: Adjust pitch

    // Identify the current icon
    this.currentSpeakingIcon = allIcons[index];

    // Change the icon to indicate speech
    this.changeIconToActive(this.currentSpeakingIcon);

    // Mark speaking as true
    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    // Reset icon once speech ends
    utterance.onend = () => {
      this.isSpeaking = false;
      this.resetIcon(this.currentSpeakingIcon);
      this.currentSpeakingIcon = null;
    };

    // Speak the message
    window.speechSynthesis.speak(utterance);
  }
} else {
  console.error("Speech Synthesis API is not supported in this browser.");
}
}

// Change the icon to active state
changeIconToActive(icon) {
if (icon) {
  icon.src = "./music.png"; // Path to the "playing" icon
  icon.classList.add("active"); // Optional: Add a class for styling
}
}

// Reset the icon to its default state
resetIcon(icon) {
if (icon) {
  icon.src = "./volume.png"; // Path to the default icon
  icon.classList.remove("active"); // Remove the "active" class
}
}
  addMessage(
    content, type = "user", chatId = null, createdAt, caller, nameVal,toolUse, toolName, sessionId,
    parentAgent,
    subagent,
    msg,
    entityName,agentData,sourceAgent, artifactObj, resAgent
  ) {
    this.chatArray.push({
      content, type,chatId,createdAt: createdAt, caller,nameVal, toolUse, toolName, sessionId,
      parentAgent,
      subagent,
      msg,
  entityName,agentData,sourceAgent,artifactObj,resAgent,
    });
    console.log("Updated chat array:", JSON.stringify(this.chatArray));
    this.render();
    this.addEventListeners();
    this.scrollToBottom();
  }
  
  showTypingIndicator() {
    this.chatArray.push({ content: "Typing...", type: "bot", isTyping: true });
    this.render();
    this.scrollToBottom();
  }

  formatCreatedAt(timestamp) {
    if (!timestamp) return null;

    try {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";

      hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      return `${year}-${month}-${day}T${hours}:${minutes}${ampm}`;
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return null;
    }
  }

  removeTypingIndicator() {
    this.chatArray = this.chatArray.filter((msg) => !msg.isTyping);
    this.render();
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatDisplay = this.querySelector(".chatDisplay");
    chatDisplay?.scrollTo(0, chatDisplay.scrollHeight);
  }
  async makeApiCall(caller) {
    console.log("cid:", caller);

    const apiEndpoint =
      "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
    const apiToken = `Bearer ${this.apiToken}`; // Replace this with your actual token

    const requestBody = {
      type: "TIDB",
      definition: `SELECT \`entity.name\` FROM t_67641332f0cb545c5134cfdf_t WHERE \`entity.agentId\` = '${caller}';`,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        console.log("Data fetched successfully:", data);
        console.log("nameIDB", data.model?.data[0]?.entity?.name);
        var nameVal = data.model?.data[0].entity.name;
        return nameVal;
      } else {
        console.error("Failed to fetch data:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


async getToolData(promptId) {
  const apiEndpoint = this.adhocUrl;

  const requestBody = {
    type: "TIDB",
    definition: `SELECT \`entity.agentId\` as agentId, \`entity.toolOutput\` as toolOutput, \`entity.callingOrder\` as callingOrder, \`entity.promptId\` as promptId, \`entity.sessionId\` as sessionId, \`entity.id\` as id, \`entity.toolInput\` as toolInput, \`entity.toolName\` as toolName FROM t_${this.toolschemaId}_t WHERE \`entity.promptId\`= '${promptId}' ORDER BY \`entity.callingOrder\` ASC;`
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("ToolData:", data);

    const toolNames = [];
    let status = "null"; // Default value for status
    let msg = "null";
    let schemaId = "null";
    let entitySchemaName = "null";
    let error = null;
    let workflowName = "null"; // Default workflow name

    if (data && data.model && data.model.data) {
      // Extract tool names into an array
      data.model.data.forEach((item) => {
        toolNames.push(item.toolName);

        // Extract workflow name from toolOutput
        const toolOutput = item.toolOutput || "";
        const workflowMatch = toolOutput.match(/workflow\s*["'`]?([\w\s-]+)["'`]?/i);
        if (workflowMatch) {
          workflowName = workflowMatch[1].trim();
        }
      });

      // Extract status and msg from response
      status = data.status || "null";
      msg = data.msg || "null";

      // Extract schemaId and entitySchemaName if available
      schemaId = data.schemaId || "null";
      entitySchemaName = data.entitySchema?.name || "null";

      // Handle error from the response (if any)
      if (data.error) {
        error = data.error;
        console.error("Error from API response:", error);
      }
    }

    // Prepare the final result object
    const parsedOutput = {
      toolNames: toolNames,
      status: status,
      msg: msg,
      schemaId: schemaId,
      entitySchemaName: entitySchemaName,
      workflowName: workflowName, // Include extracted workflow name
      error: error // Include error in the result
    };

    console.log("Parsed Outputs:", parsedOutput);
    return parsedOutput;

  } catch (error) {
    console.error("Error processing toolOutput:", error); // Debugging line
    // Handle the error gracefully and return it
    return {
      toolNames: [],
      status: "error",
      msg: error.message,
      schemaId: "null",
      entitySchemaName: "null",
      workflowName: "null", // Default value on error
      error: error.message, // Return the error message
    };
  }
}


async fetchPreviousMessages() {
  const apiEndpoint = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
  const requestBody = {
    type: "TIDB",
    definition: `SELECT * FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\`='${this.agentId}' AND \`entity.sessionId\`='${this.sessionId}' ORDER BY \`entity.createdAt\` ASC;`,
  };

  try {
    this.chatArray = [];
    this.render(); // Re-render to show an empty chat display

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.status === "success" && data.model?.data?.length > 0) {
      const items = data.model.data;

      for (const item of items) {
        const {
          prompt,
          response: botResponse,
          createdAt,
          promptId,
          caller,
          toolUses = "[]",
          sessionId,
        } = item.entity;

        console.log("ToolUses:", typeof toolUses, toolUses);
        console.log("promptId:", typeof promptId, promptId);

        // Initialize parsedToolUses as an empty array by default
        let parsedToolUses = [];
        let parentAgent = false;
        let subagent = false
        let toolUsedNames  ;
        if(caller =="null"){

          if (
            toolUses !== null && // Check if toolUses is not null
            toolUses !== "null" && // Check if toolUses is not the string "null"
            typeof toolUses === "string" && // Ensure toolUses is a string
            toolUses.length > 2 // Check that the string has more than just "[]"
          ) {
            parentAgent = true;
          }
          
        }
        if(caller){
          if (
            toolUses !== null && // Check if toolUses is not null
            toolUses !== "null" && // Check if toolUses is not the string "null"
            typeof toolUses === "string" && // Ensure toolUses is a string
            toolUses.length > 2 // Check that the string has more than just "[]"
          ) {
            subagent = true;
          }
          
          
        }
        if (toolUses !== null && toolUses !== "null") {
          try {
            // Only fetch tool data if toolUses is not null
            parsedToolUses = await this.getToolData(promptId);
           toolUsedNames = parsedToolUses.toolNames
           toolUsedNames.join(", ")
            console.log("ParsedToolUsesOut:", parsedToolUses);
          } catch (error) {
            console.error("Failed to fetch toolUses:", error.message, toolUses);
          }
        } else {
          console.warn("ToolUses is null, skipping API call for getToolData.");
        }

        const nameVal = caller !== "null" ? await this.makeApiCall(caller) : "null";

        // Add user and bot messages
        console.log("parent",parentAgent)
        this.addMessage(prompt, "user", promptId, createdAt, caller, nameVal, "",toolUsedNames , sessionId, parentAgent,subagent, "msg", "entityName", parsedToolUses);
        this.addMessage(botResponse, "bot", promptId, createdAt, caller, nameVal, "toolUsed", toolUsedNames, sessionId,parentAgent, subagent, "msg", "entityName", parsedToolUses);
      }
    } else {
      console.log("No previous history available for this session ID.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


async getBotResponse(userMessage) {
    const apiEndpoint = this.interactApi;
    const apiToken = `${this.apiToken}`;

    const requestBody = {
      agentId: this.agentId,
      query: userMessage,
      // sessionId: this.sessionId,
      sessionId: this.sessionId,

      streaming: false,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: apiToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("dataViewResponse", JSON.stringify(data));

      // Safely handle potential issues in the response structure
      const agentReasoning =
        data?.agentReasoning?.[0]?.messages?.[0] ||
        "Sorry, I couldn't understand that.";
      const chatMessageId = data?.chatMessageId || null; // Safely extract chatMessageId
      console.log("agentReasoning", agentReasoning);
      console.log("chatMessageId", chatMessageId);

      return { agentReasoning, chatMessageId };
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return {
        agentReasoning: "Error: Unable to connect to the server.",
        chatId: null,
      };
    }
  }

async handleFavIconClick(chatId) {
    console.log("chatIdprm",chatId)
    const apiEndpoint =
      "https://ig.aidtaas.com/bob-camunda-quarkus/v1.0/camunda/execute/0193ed66-9799-77e5-b16e-04ecaa8a30e5?env=TEST";
    const apiToken = "your-api-token-here"; // Replace with actual token

    const formData = new FormData();
    formData.append("ownerId", "3037df6b-a4a5-4156-a128-d0e7da39c078");
    formData.append("promptId", chatId);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Favorite action response:", data);
    } catch (error) {
      console.error("Error in favorite action:", error);
    }
  }
  setAgentSession(agentId, sessionId) {
    this.agentId = agentId;
    this.sessionId = sessionId;
    console.log("Updated agent and session ID:", { agentId, sessionId });
    // this.stopPolling(); // Stop polling before switching session
    this.fetchPreviousMessages();
    // this.startPolling(); // Restart polling for the new session
    // this.fetchPreviousMessages();
  }

  addEventListeners() {
    const sendBtn = this.querySelector("#send-btn");
    const userInput = this.querySelector("#user-input");
    const fileUpload = this.querySelector("#file-upload");
    const favIcons = this.querySelectorAll(".favIcon");
    const audioIcon = this.querySelector("#audio");

    if (audioIcon) {
      audioIcon.addEventListener("click", () => {
        if (!this.recognition) {
          alert("Speech recognition is not supported in this browser.");
          return;
        }

        if (this.isListening) {
          console.log("Stopping speech recognition...");
          this.recognition.stop();
          this.isListening = false;
        } else {
          console.log("Starting speech recognition...");
          this.recognition.start();
          this.isListening = true;
        }
      });
    }
    sendBtn?.addEventListener("click", async () => {
      const message = userInput.value.trim();
      if (message) {
        userInput.value = "";
        await this.handleSendMessage(message);
      }
    });

    userInput?.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const message = userInput.value.trim();
        if (message) {
          userInput.value = "";
          await this.handleSendMessage(message);
        }
      }
    });

    fileUpload?.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("File uploaded:", file.name);
        this.addMessage(`Uploaded file: ${file.name}`, "user");
      }
    });
    favIcons.forEach((icon) => {
      icon.addEventListener("click", async (event) => {
        const chatId = event.target.dataset.chatId;
        if (chatId) {
          console.log("Chat ID for this user message:", chatId);
          event.target.src = "./markedPin.png"; // Change the image to indicate selection
          await this.handleFavIconClick(chatId);
        } else {
          console.log("No chatId associated with this user message.");
        }
      });
    });
  }

  async handleSendMessage(userMessage) {
    // console.log("Sending user message:", userMessage);
    // this.addMessage(userMessage, "user", `temp-${Date.now()}`);
    const tempChatId = `temp-${Date.now()}`; // Temporary ID for immediate rendering
    this.addMessage(userMessage, "user", tempChatId);

    
    this.showTypingIndicator();
    // const botResponse = await this.getBotResponse(userMessage);
    const { agentReasoning, chatId } = await this.getBotResponse(userMessage);

    this.removeTypingIndicator();
    // Update user message with correct chatId
    const userMessageIndex = this.chatArray.findIndex(
      (msg) => msg.chatId === tempChatId
    );
    if (userMessageIndex !== -1) {
      this.chatArray[userMessageIndex].chatId = chatId;
    }

    // Add bot response
    if (agentReasoning) {
      this.addMessage(agentReasoning, "bot", chatId);
    }
    // this.addMessage(botResponse, "bot");
  }
}
class FileChatBotComponent extends ChatBotComponent {
  async getBotResponse(userMessage) {
    return await super.getBotResponse(userMessage);
  }
}
customElements.define("chat-bot", ChatBotComponent);
customElements.define("file-chat-bot", FileChatBotComponent);
