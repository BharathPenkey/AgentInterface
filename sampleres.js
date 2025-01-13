// class ChatBotComponent extends HTMLElement {
//   chatArray = [];
//   agentId = "";
//   sessionId = "";
//   apiToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ`;
//   interactApi = "https://ig.gov-cloud.ai/mobius-gpt-service/interact";
//   historySchemaId = `677f8ae42028154e8512622c`//`677e9d662028154e8512607a`// `67728644af1fd173800878f3`;
//   // pollingInterval = 10000; // For managing polling
  
//   constructor() {
//     super();
//     this.render();
//     this.recognition = null; // Web Speech API recognition instance
//     this.isListening = false; // Track if recognition is active
//     this.initializeSpeechRecognition();
//   }
//   connectedCallback() {
//     console.log("ChatBotComponent connected.");
//     this.fetchPreviousMessages();
//     // this.startPolling();
//     this.addEventListeners();
//   }
//   clearChatHistory() {
//     this.chatArray = []; // Assuming chatArray holds the chat messages
//     this.render(); // Re-render to show an empty chat display
//     console.log("Chat history cleared.");
//   }
//   initializeSpeechRecognition() {
//     // Check if the browser supports the Web Speech API
//     if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
//       console.error("Web Speech API is not supported in this browser.");
//       return;
//     }
//     const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;
//   this.recognition = new SpeechRecognition();
//   this.recognition.lang = "en-US"; // Set language to English
//   this.recognition.continuous = false; // Stop listening after speech ends
//   this.recognition.interimResults = false; // Only final results

//    // Handle recognition results
//    this.recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     console.log("Recognized speech:", transcript);
//     const userInput = this.querySelector("#user-input");
//     if (userInput) {
//       userInput.value = transcript; // Populate the input box with the transcript
//     }
//   };

//   // Handle recognition errors
//   this.recognition.onerror = (event) => {
//     console.error("Speech recognition error:", event.error);
//   };

//   // Reset `isListening` when recognition ends
//   this.recognition.onend = () => {
//     console.log("Speech recognition ended.");
//     this.isListening = false;
//   };
// }

//   render() {
//     this.innerHTML = `
//     <div class="chatContainer">
//       <div class="chatDisplay">
//         ${this.chatArray.map((msg, index) => `
//           <div class="messageCont ${msg.type === "user" ? "user-side" : "bot-side"}">
//             <div class="message ${msg.type}-message ${msg.isTyping ? "typing-indicator" : ""}">
//                <div class="${msg.type === "user" ? "userText" : "botText"}">
//                 ${msg.isTyping 
//                   ? `<span class="typing">Typing<span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` 
//                   : `${msg.content}
//                      ${msg.type === "bot" 
//                        ? `<img src="./volume.png" alt="Speaker Icon" class="speakerIcon" data-msg="${msg.content}" data-index="${index-1}" />` 
//                        : ""}`}
//               </div>
//               <div class="messageMeta">
//                 ${msg.createdAt 
//                   ? `<span>${this.formatCreatedAt(msg.createdAt.split(".")[0])}</span>` 
//                   : ""}
//                 ${msg.type === "user" 
//                   ? `<img src="./pinUnmarked.png" alt="User Avatar" class="favIcon" data-index="${index}" data-chat-id="${msg.chatId || ""}" />` 
//                   : ""}
//                 ${msg.type === "user" && msg.caller 
//                   ? `<img src="${msg.caller !== "null" ? "./robot.png" : "./humanIcon.svg"}" alt="Icon" class="humanAgentIcon" />` 
//                   : ""}

//               </div>
//             </div>
//             ${msg.agentData != "null" ? `
//               <div class="${msg.type === "user" ? "userArtifact" : "botArtifact"}">
//                 ${msg.sourceAgent ? `
//                   <section class="${msg.type === "user" ? "userArtifactCont" : "botArtifactCont"}">
//                     ${msg.artifactObj.status ? `
//                       <div class="innerDataCont">
//                         ${msg.artifactObj.status != "null" 
//                           ? `<p class="keyName">Artifact Status:</p><p class="valueName">${msg.artifactObj.status}</p>` 
//                           : ""}
//                       </div>` : ""}
//                     ${msg.artifactObj.msg ? `
//                       <div class="innerDataCont">
//                         ${msg.artifactObj.msg != "null" 
//                           ? `<p class="keyName">Artifact msg:</p><p class="valueName">${msg.artifactObj.msg}</p>` 
//                           : ""}
//                       </div>` : `<div class="noartifactData"></div>`}
//                     ${msg.artifactObj.schemaId ? `
//                       <div class="innerDataCont">
//                         ${msg.artifactObj.schemaId != "null" 
//                           ? `<p class="keyName">Artifact:</p><p class="valueName">${msg.artifactObj.schemaId}</p>` 
//                           : ""}
//                       </div>` : ""}
//                     ${msg.artifactObj.entitySchemaName ? `
//                       <div class="innerDataCont">
//                         ${msg.artifactObj.entitySchemaName != "null" 
//                           ? `<p class="keyName">Artifact name:</p><p class="valueName">${msg.artifactObj.entitySchemaName}</p>` 
//                           : ""}
//                       </div>` : ""}
//                     ${msg.toolUse !== "null" ? `
//                       <div class="innerDataCont">
//                         <p class="keyName">${msg.type === "user" ? "Tool" : "Tool"}</p>
//                         <p class="valueName">${msg.toolUse}</p>
//                       </div>` : ""}
//                     ${msg.artifactObj.agentName !== "null" ? `
//                       <div class="innerDataCont">
//                         <p class="keyName">${msg.type === "user" ? "Calling" : "Response from"}</p>
//                         <p class="valueName">${msg.artifactObj.agentName}</p>
//                       </div>` : ""}
//                     ${msg.artifactObj.error ? `
//                       <div class="innerDataCont">
//                         ${msg.artifactObj.error != "null" 
//                           ? `<p class="keyName">Error:</p><p class="valueName">${msg.artifactObj.error}</p>` 
//                           : ""}
//                       </div>` : ""}
//                     ${msg.nameVal ? `
//                       <div class="innerDataCont">
//                         ${msg.nameVal != "null" 
//                           ? `<p class="keyName">${msg.type === "user" ? "Call from" : "Response to"}</p><p class="valueName">${msg.nameVal}</p>` 
//                           : ""}
//                       </div>` : ""}
//                   </section>` : ""}
//               </div>` : `<div class="noartifactData"></div>`}
//           </div>
//         `).join("")}
//       </div>
//       <div class="inputContainer">
//         <label for="file-upload"><img src="./attach-file.png" alt="Attach File Icon" class="fileIcon" /></label>
//         <input type="file" id="file-upload" />
//         <input type="text" id="user-input" placeholder="Type your message..." />
//         <div id="send-btn"><img src="./sendIcon.png" class="sendIcon" /></div>
//         <div id="audio"><img src="./sound-waves.png" class="audioIcon"/></div>
//       </div>
//     </div>
//   `;  

// // Add event listener to all speaker icons
// const speakerIcons = this.querySelectorAll(".speakerIcon");
// speakerIcons.forEach((icon) => {
//   icon.addEventListener("click", (event) => {
//     const message = event.target.getAttribute("data-msg");
//     const index = event.target.getAttribute("data-index");
//     this.toggleMessagePlayback(message, index);
//   });
// });
// }

// // Variable to track if speech is playing and the current icon
// isSpeaking = false;
// currentSpeakingIcon = null;

// // Method to toggle message playback
// toggleMessagePlayback(message, index) {
// if ('speechSynthesis' in window) {
//   const allIcons = this.querySelectorAll(".speakerIcon");

//   // If speech is playing, stop it and reset the icon
//   if (this.isSpeaking) {
//     window.speechSynthesis.cancel();
//     this.resetIcon(this.currentSpeakingIcon);
//     this.isSpeaking = false;
//   } else {
//     // Start speaking the message
//     const utterance = new SpeechSynthesisUtterance(message);
//     utterance.lang = 'en-US'; // Optional: Set language
//     utterance.rate = 1; // Optional: Adjust speech rate
//     utterance.pitch = 1; // Optional: Adjust pitch

//     // Identify the current icon
//     this.currentSpeakingIcon = allIcons[index];

//     // Change the icon to indicate speech
//     this.changeIconToActive(this.currentSpeakingIcon);

//     // Mark speaking as true
//     utterance.onstart = () => {
//       this.isSpeaking = true;
//     };

//     // Reset icon once speech ends
//     utterance.onend = () => {
//       this.isSpeaking = false;
//       this.resetIcon(this.currentSpeakingIcon);
//       this.currentSpeakingIcon = null;
//     };

//     // Speak the message
//     window.speechSynthesis.speak(utterance);
//   }
// } else {
//   console.error("Speech Synthesis API is not supported in this browser.");
// }
// }

// // Change the icon to active state
// changeIconToActive(icon) {
// if (icon) {
//   icon.src = "./music.png"; // Path to the "playing" icon
//   icon.classList.add("active"); // Optional: Add a class for styling
// }
// }

// // Reset the icon to its default state
// resetIcon(icon) {
// if (icon) {
//   icon.src = "./volume.png"; // Path to the default icon
//   icon.classList.remove("active"); // Remove the "active" class
// }


// }
 
//   addMessage(
//     content, type = "user", chatId = null, createdAt, caller, nameVal,toolUse, toolName, sessionId,
//     // parentAgent,
//     // status,
//     // msg,
//     entityName,agentData,sourceAgent, artifactObj, resAgent
//   ) {
//     this.chatArray.push({
//       content, type,chatId,createdAt: createdAt, caller,nameVal, toolUse, toolName, sessionId,
 
//   entityName,agentData,sourceAgent,artifactObj,resAgent,
//     });
//     console.log("Updated chat array:", JSON.stringify(this.chatArray));
//     this.render();
//     this.addEventListeners();
//     this.scrollToBottom();
//   }
  
//   showTypingIndicator() {
//     this.chatArray.push({ content: "Typing...", type: "bot", isTyping: true });
//     this.render();
//     this.scrollToBottom();
//   }

//   formatCreatedAt(timestamp) {
//     if (!timestamp) return null;

//     try {
//       const date = new Date(timestamp);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       let hours = date.getHours();
//       const minutes = String(date.getMinutes()).padStart(2, "0");
//       const ampm = hours >= 12 ? "pm" : "am";

//       hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
//       return `${year}-${month}-${day}T${hours}:${minutes}${ampm}`;
//     } catch (error) {
//       console.error("Error formatting timestamp:", error);
//       return null;
//     }
//   }

//   removeTypingIndicator() {
//     this.chatArray = this.chatArray.filter((msg) => !msg.isTyping);
//     this.render();
//     this.scrollToBottom();
//   }

//   scrollToBottom() {
//     const chatDisplay = this.querySelector(".chatDisplay");
//     chatDisplay?.scrollTo(0, chatDisplay.scrollHeight);
//   }
//   async makeApiCall(caller) {
//     console.log("cid:", caller);

//     const apiEndpoint =
//       "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
//     const apiToken = `Bearer ${this.apiToken}`; // Replace this with your actual token

//     const requestBody = {
//       type: "TIDB",
//       definition: `SELECT \`entity.name\` FROM t_67641332f0cb545c5134cfdf_t WHERE \`entity.agentId\` = '${caller}';`,
//     };

//     try {
//       const response = await fetch(apiEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: apiToken,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.status === "success") {
//         console.log("Data fetched successfully:", data);
//         console.log("nameIDB", data.model?.data[0]?.entity?.name);
//         var nameVal = data.model?.data[0].entity.name;
//         return nameVal;
//       } else {
//         console.error("Failed to fetch data:", data.msg);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// async extractToolData(data) {
//   const result = {
//     toolUsed: data.toolUsed ,
//     status: "null",
//     msg: "null",
//     schemaId: "null",
//     entitySchemaName: "null",
//     primaryKey: [],
//     attributes: [],
//     toolInput: data.toolInput || "null",
//     error: null,
//   };

//   console.log("Starting to process tool dataType:", typeof(data));  // Debugging line

//   console.log("Starting to process tool data:", data);  // Debugging line

//   if (data.toolOutput && data.toolOutput !== "null") {
//     try {
//       // Replace backticks with double quotes for valid JSON
//       const output = data.toolOutput.replace(/`/g, '"');
//       console.log("Processing toolOutput:", output);  // Debugging line

//       // Parse the toolOutput as JSON
//       const parsedOutput = JSON.parse(output);

//       // Extract relevant fields
//       result.status = parsedOutput.status || "null";
//       result.msg = parsedOutput.msg || "null";
//       result.schemaId = parsedOutput.schemaId || "null";
//       result.entitySchemaName = parsedOutput.entitySchema?.name || "null";

//       // Extract primaryKey if available
//       result.primaryKey = parsedOutput.entitySchema?.primaryKey || [];

//       // Extract attributes
//       result.attributes = parsedOutput.entitySchema?.attributes?.map(attr => attr.name) || [];

//     } catch (error) {
//       result.error = `Error processing toolOutput: ${error.message}`;
//       console.error("Error processing toolOutput:", error);  // Debugging line
//     }
//   }

//   if (data.toolInput && data.toolInput !== "null") {
//     try {
//       // Replace backticks with double quotes for valid JSON
//       const input = data.toolInput.replace(/`/g, '"');
//       console.log("Processing toolInput:", input);  // Debugging line

//       // Parse the toolInput as JSON
//       const parsedInput = JSON.parse(input);

//       // Extract relevant fields
//       result.schemaName = parsedInput.schemaName || "null";
//       result.description = parsedInput.description || "null";
//       result.universes = parsedInput.universes?.split(",") || [];
//       result.attributesDescription = parsedInput.attributes || "null";
//       result.primaryKeyDescription = parsedInput.primaryKey || "null";
//     } catch (error) {
//       result.error = `Error processing toolInput: ${error.message}`;
//       console.error("Error processing toolInput:", error);  // Debugging line
//     }
//   }
//   console.log("Processed tool data:", result);  // Debugging line
//   return result;
// }
// async fetchPreviousMessages() {
//   const apiEndpoint = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
//   const requestBody = {
//     type: "TIDB",
//     definition: `SELECT * FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\`='${this.agentId}' AND \`entity.sessionId\`='${this.sessionId}' ORDER BY \`entity.createdAt\` ASC;`,
//   };

//   try {
//     this.chatArray = [];
//     this.render(); // Re-render to show an empty chat display

//     const response = await fetch(apiEndpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${this.apiToken}`,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();

//     if (data.status === "success" && data.model?.data?.length > 0) {
//       const items = data.model.data;

//       for (const item of items) {
//         const {
//           prompt,
//           response: botResponse,
//           createdAt,
//           promptId,
//           caller,
//           toolUses = "[]",
//           sessionId,
//         } = item.entity;

//         // Clean the toolUses stringx`x`
//         console.log("ToolUses", typeof(toolUses),toolUses)
//         // console.log("jsonTooluses",JSON.parse(toolUses))
//         // const decoded = atob(toolUses); // Decodes the Base64 string
//         // const toolUsesJson = JSON.parse(decoded);
//         // console.log("toolUsesJson",toolUsesJson);

//         // console.log("Decoded JSON:", toolUsesJson);
//         // console.log("decoded",typeof(decoded),decoded)

//         // const cleanedToolUses = toolUses
//         // .replace(/\\/g, '\\\\')   // Escape backslashes
//         // .replace(/"/g, '\\"')     // Escape double quotes
//         // .replace(/\\\\"/g, '\\"') // Fix over-escaped quotes
//         // .replace(/`/g, '"'); // Fix over-escaped quotes
    
    
//           // .replace(/`/g, '"') // Replace backticks with double quotes
//           // .replace(/,\s*}/g, "}") // Remove trailing commas before closing braces
//           // // .replace(/,\s*]/g, "]"); // Remove trailing commas before closing brackets
 

//           // console.log("cleanedToolUses", typeof(cleanedToolUses),cleanedToolUses)
//           // const parsedArray = JSON.parse(cleanedToolUses);
//           // console.log("parsedArray",parsedArray,typeof(parsedArray))
//         let toolUseArray = [];
//         // try {
//         //   toolUseArray = JSON.parse(cleanedToolUses); // Parse the cleaned string
//         // } catch (error) {
//         //   console.error("Error parsing toolUses:", error);
//         // }

//         // console.log("Parsed toolUses:", toolUseArray);

//         // Process each tool in the toolUseArray
//         // for (const tool of toolUseArray) {
//         //   const toolName = tool.tool || "null";
//         //   const detailedTaskDescription = tool.toolInput?.detailed_task_description || "null";
//         //   const agentId = tool.toolOutput?.agentId || "null";
//         //   const agentName =
//         //     tool.toolOutput?.agentReasoning?.[0]?.agentName || "null";

//         //   console.log(
//         //     "Tool Details:",
//         //     toolName,
//         //     detailedTaskDescription,
//         //     agentId,
//         //     agentName
//         //   );
//         // }

//         const nameVal = caller !== "null" ? await this.makeApiCall(caller) : "null";

//         this.addMessage(prompt, "user", promptId, createdAt, caller, nameVal, "", "", sessionId, "parentAgent", "", "msg", "entityName", "subAgent");
//         this.addMessage(botResponse, "bot", promptId, createdAt, caller, nameVal, "toolUsed", "toolName", sessionId, "parentAgent", "", "msg", "entityName", "subAgent");
//       }
//     } else {
//       console.log("No previous history available for this session ID.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// async getBotResponse(userMessage) {
//     const apiEndpoint = this.interactApi;
//     const apiToken = `${this.apiToken}`;

//     const requestBody = {
//       agentId: this.agentId,
//       query: userMessage,
//       // sessionId: this.sessionId,
//       sessionId: this.sessionId,

//       streaming: false,
//     };

//     try {
//       const response = await fetch(apiEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: apiToken,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("dataViewResponse", JSON.stringify(data));

//       // Safely handle potential issues in the response structure
//       const agentReasoning =
//         data?.agentReasoning?.[0]?.messages?.[0] ||
//         "Sorry, I couldn't understand that.";
//       const chatMessageId = data?.chatMessageId || null; // Safely extract chatMessageId
//       console.log("agentReasoning", agentReasoning);
//       console.log("chatMessageId", chatMessageId);

//       return { agentReasoning, chatMessageId };
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       return {
//         agentReasoning: "Error: Unable to connect to the server.",
//         chatId: null,
//       };
//     }
//   }

// async handleFavIconClick(chatId) {
//     console.log("chatIdprm",chatId)
//     const apiEndpoint =
//       "https://ig.aidtaas.com/bob-camunda-quarkus/v1.0/camunda/execute/0193ed66-9799-77e5-b16e-04ecaa8a30e5?env=TEST";
//     const apiToken = "your-api-token-here"; // Replace with actual token

//     const formData = new FormData();
//     formData.append("ownerId", "3037df6b-a4a5-4156-a128-d0e7da39c078");
//     formData.append("promptId", chatId);

//     try {
//       const response = await fetch(apiEndpoint, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${apiToken}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Favorite action response:", data);
//     } catch (error) {
//       console.error("Error in favorite action:", error);
//     }
//   }
//   setAgentSession(agentId, sessionId) {
//     this.agentId = agentId;
//     this.sessionId = sessionId;
//     console.log("Updated agent and session ID:", { agentId, sessionId });
//     // this.stopPolling(); // Stop polling before switching session
//     this.fetchPreviousMessages();
//     // this.startPolling(); // Restart polling for the new session
//     // this.fetchPreviousMessages();
//   }

//   addEventListeners() {
//     const sendBtn = this.querySelector("#send-btn");
//     const userInput = this.querySelector("#user-input");
//     const fileUpload = this.querySelector("#file-upload");
//     const favIcons = this.querySelectorAll(".favIcon");
//     const audioIcon = this.querySelector("#audio");

//     if (audioIcon) {
//       audioIcon.addEventListener("click", () => {
//         if (!this.recognition) {
//           alert("Speech recognition is not supported in this browser.");
//           return;
//         }

//         if (this.isListening) {
//           console.log("Stopping speech recognition...");
//           this.recognition.stop();
//           this.isListening = false;
//         } else {
//           console.log("Starting speech recognition...");
//           this.recognition.start();
//           this.isListening = true;
//         }
//       });
//     }
//     sendBtn?.addEventListener("click", async () => {
//       const message = userInput.value.trim();
//       if (message) {
//         userInput.value = "";
//         await this.handleSendMessage(message);
//       }
//     });

//     userInput?.addEventListener("keydown", async (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         const message = userInput.value.trim();
//         if (message) {
//           userInput.value = "";
//           await this.handleSendMessage(message);
//         }
//       }
//     });

//     fileUpload?.addEventListener("change", (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         console.log("File uploaded:", file.name);
//         this.addMessage(`Uploaded file: ${file.name}`, "user");
//       }
//     });
//     favIcons.forEach((icon) => {
//       icon.addEventListener("click", async (event) => {
//         const chatId = event.target.dataset.chatId;
//         if (chatId) {
//           console.log("Chat ID for this user message:", chatId);
//           event.target.src = "./markedPin.png"; // Change the image to indicate selection
//           await this.handleFavIconClick(chatId);
//         } else {
//           console.log("No chatId associated with this user message.");
//         }
//       });
//     });
//   }

//   async handleSendMessage(userMessage) {
//     // console.log("Sending user message:", userMessage);
//     // this.addMessage(userMessage, "user", `temp-${Date.now()}`);
//     const tempChatId = `temp-${Date.now()}`; // Temporary ID for immediate rendering
//     this.addMessage(userMessage, "user", tempChatId);

    
//     this.showTypingIndicator();
//     // const botResponse = await this.getBotResponse(userMessage);
//     const { agentReasoning, chatId } = await this.getBotResponse(userMessage);

//     this.removeTypingIndicator();
//     // Update user message with correct chatId
//     const userMessageIndex = this.chatArray.findIndex(
//       (msg) => msg.chatId === tempChatId
//     );
//     if (userMessageIndex !== -1) {
//       this.chatArray[userMessageIndex].chatId = chatId;
//     }

//     // Add bot response
//     if (agentReasoning) {
//       this.addMessage(agentReasoning, "bot", chatId);
//     }
//     // this.addMessage(botResponse, "bot");
//   }
// }
// class FileChatBotComponent extends ChatBotComponent {
//   async getBotResponse(userMessage) {
//     return await super.getBotResponse(userMessage);
//   }
// }
// customElements.define("chat-bot", ChatBotComponent);
// customElements.define("file-chat-bot", FileChatBotComponent);



//dropdown


// class DropdownComponent extends HTMLElement {
//   historySchema = "677f8ae42028154e8512622c";//677e9d662028154e8512607a
//   AgentMasterSchema = "67641332f0cb545c5134cfdf";

//   constructor() {
//     super();
//     this.agentApiUrl = `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${this.AgentMasterSchema}/instances/list?size=10000`;
//     this.sessionIdAdhocUri = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
//   }

//   connectedCallback() {
//     console.log("DropdownComponent connected.");
//     this.initialize(); // Call initialization on component connection
//   }

//   async initialize() {
//     console.log("Initializing DropdownComponent...");
//     try {
//       const agents = await this.fetchAgents();
//       console.log("Agents fetched successfully:", agents);
//       this.sendAgentsToParent(agents);
//     } catch (error) {
//       console.error("Error during initialization:", error.message);
//     }
//   }

//   async fetchAgents() {
//     console.log("Making API call to fetch agents...");
//     try {
//       const response = await this.fetchData(this.agentApiUrl);
//       if (response.status === "SUCCESS") {
//         console.log("Agent data received from API:", response.entities);
//         return response.entities.map((entity) => ({
//           id: entity.agentId,
//           name: entity.name || entity.agentId,
//         }));
//       } else {
//         console.error("API response error:", response.msg);
//         throw new Error(response.msg);
//       }
//     } catch (error) {
//       console.error("Error fetching agents:", error.message);
//       throw error;
//     }
//   }

//   async fetchSessions(agentId) {
//     console.log(`Fetching sessions for agent ID: ${agentId}`);
//     try {
//       const requestBody = {
//         type: "TIDB",
//         definition: `SELECT \`entity.sessionId\` AS sessionId, MAX(\`entity.createdAt\`) AS createdAt FROM \`t_${this.historySchema}_t\` WHERE \`entity.agentId\` = '${agentId}' GROUP BY \`entity.sessionId\` ORDER BY MAX(\`entity.createdAt\`) DESC;`,
//       };

//       const response = await this.fetchData(this.sessionIdAdhocUri, requestBody);
//       const sessions = response.model?.data.map((session) => ({
//         id: session.sessionId,
//         name: session.sessionId || "Unnamed Session",
//       }));
//       console.log(`Sessions fetched for agent ID ${agentId}:`, sessions);
//       this.sendSessionsToParent(agentId, sessions);
//     } catch (error) {
//       console.error("Error fetching sessions:", error.message);
//     }
//   }

//   async fetchData(url, body = null) {
//     console.log(`Fetching data from URL: ${url}`);
//     try {
//       const options = {
//         method: body ? "POST" : "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${this.getApiToken()}`,
//         },
//       };

//       if (body) {
//         options.body = JSON.stringify(body);
//       }

//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API call successful. Data received:", data);
//       return data;
//     } catch (error) {
//       console.error("Error during fetch:", error.message);
//       throw error;
//     }
//   }

//   sendAgentsToParent(agents) {
//     console.log("Sending agents to parent:", agents);
//     const event = new CustomEvent("agentsFetched", {
//       detail: { agents },
//       bubbles: true,
//       composed: true,
//     });
//     this.dispatchEvent(event);
//   }

//   sendSessionsToParent(agentId, sessions) {
//     console.log(`Sending sessions for agent ID ${agentId} to parent:`, sessions);
//     const event = new CustomEvent("sessionsFetched", {
//       detail: { agentId, sessions },
//       bubbles: true,
//       composed: true,
//     });
//     this.dispatchEvent(event);
//   }

//   getApiToken() {
//     return "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";
//   }
// }

// customElements.define("dropdown-component", DropdownComponent);

//  <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="Content-Security-Policy"
//     content="default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://ig.gov-cloud.ai;">
//   <title>Chatbot ai</title>
//   <link rel="stylesheet" href="./styles.css">
//   <script src="./prompt.js" defer></script>
//   <script src="./chatBot.js" defer></script>
//   <style>
//   .optioncont{
//     width: 70%;
//     background-color: #fff;
//     color: #333;
//     border: 1px solid black;
//   }

//   .dropdownselect{
//     width: 70%;
//     padding: 8px;
//     margin-bottom: 16px;
//     font-size: 16px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     background-color: #fff;
//     color: #333;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     appearance: none;
//     outline: none;
//     cursor: pointer;
//   }

//   </style>
// </head>

// <body>
//   <div class="mainContainer">
//     <div class="leftContainer">
//       <dropdown-component></dropdown-component>
//       <select id="agentDropdown" class="dropdownselect">
//         <option value="" class="optioncont">Select an Agent</option>
//       </select>
//       <div id="sessionList">

//       </div>
//     </div>
//     <div class="middleContainer">
//       <file-chat-bot></file-chat-bot>
//     </div>
//   </div>
//   <script>
//     document.addEventListener("DOMContentLoaded", () => {
//       const dropdownComponent = document.querySelector("dropdown-component");
//       const agentDropdown = document.getElementById("agentDropdown");
//       const sessionList = document.getElementById("sessionList");
//       const chatBot = document.querySelector("file-chat-bot");

//       // Variable to store the selected agent ID
//       let selectedAgentId = "";

//       // Listen for agents fetched event
//       dropdownComponent.addEventListener("agentsFetched", (event) => {
//         const { agents } = event.detail;
//         console.log("Agents received:", agents);

//         // Sort agents alphabetically by name
//         agents.sort((a, b) => a.name.localeCompare(b.name));

//         // Populate the agent dropdown
//         agentDropdown.innerHTML = `<option value="">Select an Agent</option>`;
//         agents.forEach((agent) => {
//           const option = document.createElement("option");
//           option.value = agent.id;
//           option.textContent = agent.name.length > 30 ? `${agent.name.slice(0, 30)}...` : agent.name;
//           agentDropdown.appendChild(option);
//         });
//       });

//       // Handle agent selection
//       agentDropdown.addEventListener("change", (event) => {
//         selectedAgentId = event.target.value; // Update the selected agent ID
//         console.log("Selected agent ID:", selectedAgentId);

//         sessionList.innerHTML = ""; // Clear previous session list

//         if (chatBot) {
//           chatBot.clearChatHistory(); // Clear chat history when agent changes
//         }

//         if (selectedAgentId) {
//           dropdownComponent.fetchSessions(selectedAgentId);
//         }
//       });

//       // Listen for sessions fetched event
//       dropdownComponent.addEventListener("sessionsFetched", (event) => {
//         const { agentId, sessions } = event.detail;
//         console.log(`Sessions received for agent ${agentId}:`, sessions);

//         sessionList.innerHTML = ""; // Clear previous sessions
//         if (!sessions || sessions.length === 0) {
//           const noSessionsMessage = document.createElement("div");
//           noSessionsMessage.className = "no-sessions-message";
//           noSessionsMessage.textContent = "No session IDs available.";
//           sessionList.appendChild(noSessionsMessage);
//         } else {
//           sessions.forEach((session) => {
//             const sessionDiv = document.createElement("div");
//             sessionDiv.className = "session-div";
//             sessionDiv.dataset.sessionId = session.id;
//             sessionDiv.textContent = session.name;
//             sessionList.appendChild(sessionDiv);
//           });
//         }
//       });

//       // Handle session selection
//       sessionList.addEventListener("click", (event) => {
//         const sessionDiv = event.target.closest(".session-div");
//         if (sessionDiv) {
//           const sessionId = sessionDiv.dataset.sessionId;
//           console.log("Selected Session ID:", sessionId);

//           const allSessionDivs = sessionList.querySelectorAll(".session-div");
//           allSessionDivs.forEach((div) => div.classList.remove("selected"));


//           // Add 'selected' class to the clicked session div
//           sessionDiv.classList.add("selected");

//           // Notify ChatBotComponent of selected session
//           if (chatBot && selectedAgentId) {
//             chatBot.setAgentSession(selectedAgentId, sessionId);
//           } else {
//             console.error("Agent ID is not selected or ChatBotComponent is missing.");
//           }
//         }
//       });
//     });
//   </script>

// </body>

// </html> 