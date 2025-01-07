
// class ChatBotComponent extends HTMLElement {
//   chatArray = [];
//   agentId = "";
//   apiToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ`
//   interactApi ="https://ig.gov-cloud.ai/mobius-gpt-service/interact";
//   historySchemaId = `67728644af1fd173800878f3`

//   // sessionId = "";

//   constructor() {
//     super();
//     this.render();
//   }

//   connectedCallback() {
//     this.fetchPreviousMessages();
//     this.addEventListeners();
//   }

//   render() {
//     this.innerHTML = `
//             <div class="chatContainer">
//                 <div class="chatDisplay">
//                     ${this.chatArray
//                       .map(
//                         (msg, index) => `
//                                 <div class="messageCont ${
//                                   msg.type === "user" ? "user-side" : "bot-side"
//                                 }">
//                                     <div class="message ${msg.type}-message ${
//                                       msg.isTyping ? "typing-indicator" : ""
//                                       }" style="background-color: ${  msg.isToolUsed ? "blue" : "green" }">          
//                                      <div class="${
//                                           msg.type === "user"
//                                             ? "userText"
//                                             : "botText"
//                                         }">
//                                             ${
//                                               msg.isTyping
//                                                 ? `<span class="typing">Typing
//                                                         <span class="dot"></span>
//                                                         <span class="dot"></span>
//                                                         <span class="dot"></span>
//                                                     </span>`
//                                                 : msg.content
//                                             }
//                                         </div>
//                                         <div class="messageMeta">   
//                                         ${msg.caller !="null" ? `<span> ${msg.nameVal} called </span>` : ""}
//                                         ${msg.toolName!="Unknown" ?`<span>${msg.type==="user"? "calling":"Response from"} ${msg.toolName} </span>`:"" }   
//                                         <span>${
//                                           msg.createdAt
//                                             ? this.formatCreatedAt(
//                                                 msg.createdAt.split(".")[0]
//                                               )
//                                             : ""
//                                         }</span>
                                         
//                                         </div>
//                                     </div>
//                                 </div>
//                             `
//                       )
//                       .join("")}
//                 </div>
//                 <div class="input-container">
//                     <label for="file-upload">
//                         <img src="./attach-file.png" alt="Attach File Icon" class="fileIcon" />
//                     </label>
//                     <input type="file" id="file-upload" />
    
//                     <input type="text" id="user-input" placeholder="Type your message..." />
//                     <div id="send-btn"><img src="./sendIcon.png" class="sendIcon"/></div>
//                 </div>
//             </div>
//         `;
//   }

//   addMessage(content, type = "user", chatId = null, createdAt,caller,nameVal,toolUse,toolName) {
//     this.chatArray.push({
//       content,
//       type,
//       chatId,
//       createdAt: createdAt,
//       caller,
//       nameVal,
//       toolUse,toolName
//     });
//     console.log("chatArray", JSON.stringify(this.chatArray))
//     this.render();
//     this.addEventListeners(); // Rebind event listeners
//     this.scrollToBottom();
//   }
//   showTypingIndicator() {
//     this.chatArray.push({ content: "Typing...", type: "bot" ,isTyping: true});
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
//       const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}${ampm}`;
//       return formattedTime;
//     } catch (error) {
//       console.error("Error formatting createdAt timestamp:", error);
//       return null;
//     }
//   }

//   removeTypingIndicator() {
//     this.chatArray = this.chatArray.filter(
//     //   (msg) => msg.content !== "Typing..."
//     (msg) => !msg.isTyping
//     );
//     this.render();
//     this.scrollToBottom();
//   }

//   scrollToBottom() {
//     const chatDisplay = this.querySelector(".chatDisplay");
//     chatDisplay?.scrollTo(0, chatDisplay.scrollHeight);
//   }
// // nameData
//   async makeApiCall(caller) {
//     console.log("cid:", caller);
  
//     const apiEndpoint = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
//     const apiToken = `Bearer ${this.apiToken}`; // Replace this with your actual token
  
//     const requestBody = {
//       type: "TIDB",
//       definition: `SELECT \`entity.name\` FROM t_67641332f0cb545c5134cfdf_t WHERE \`entity.agentId\` = '${caller}';`
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
//         console.log("nameIDB",data.model?.data[0]?.entity?.name)
//         var nameVal = data.model?.data[0].entity.name;
//         return nameVal
//       } else {
//         console.error("Failed to fetch data:", data.msg);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
  
//   // interact apai

//   async fetchPreviousMessages() {
//     const apiEndpoint =
//       "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";

//     const requestBody = {
//       type: "TIDB",
//       definition: `SELECT * FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\`='${this.agentId}' ORDER BY \`entity.createdAt\` ASC;`,
//     };

//     try {
//       const response = await fetch(apiEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${this.apiToken}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await response.json();
//     //   console.log("historyData",data)

//       if (data.status === "success") {
//         // const items = data.model.data;
//         const items = data.model.data;
//         console.log("historyDataitems",items)

//         for (const item of items) {
//           const {
//             prompt,
//             response,
//             createdAt,
//             promptId,
//             caller,
//             toolUses
//           } = item.entity;
  
//           // Fetch the name for the caller if present
//           let nameVal = "null";
//           let subAgent ="null ";
//           let toolUse ="null " ;
//           let toolName ="Unknown";
//           if (caller != nameVal) {
//            nameVal = await this.makeApiCall(caller);
//             console.log(`Caller: ${caller}, NameId: ${nameVal}`);
//           }else{
         
//           if (toolUses.toolUsed != "null ") {
//             toolUse = toolUses.toolUsed;
        
//             if (toolUses.toolOutput != "null ") {
//                 toolName = toolUses.toolOutput;
                
//                 const matchResult = toolName.match(/`agentName`:`([^`]+)`/);
//                 if (matchResult && matchResult[1]) {
//                     toolName = matchResult[1];
//                 } else {
//                     console.error("No agentName found in toolOutput.");
//                     toolName = "Unknown"; // Assign a default value if not found
//                 }
//             }
        
//             console.log("toolusedview", toolUses.toolUsed, "subAgent", toolName);
//         }
//     }
  
//           // Add messages with the resolved name
//           this.addMessage(prompt, "user", promptId, createdAt, caller, nameVal,toolUse,toolName);
//           this.addMessage(response, "bot", promptId, createdAt, caller, nameVal,toolUse,toolName);
//         }
      
    
//       } else {
//         console.error("Failed to fetch data:", data.msg);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// // getBotData
//   async getBotResponse(userMessage) {
//     const apiEndpoint = this.interactApi;
//     const apiToken = `${this.apiToken}`;
    
//     const requestBody = {
//       agentId: this.agentId,
//       query: userMessage,
//       // sessionId: this.sessionId,
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
//       const chatId = data?.chatMessageId || null; // Safely extract chatMessageId
//       console.log("agentReasoning", agentReasoning);
//       return { agentReasoning, chatId };
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       return {
//         agentReasoning: "Error: Unable to connect to the server.",
//         chatId: null,
//       };
//     }
//   }

//   async handleSendMessage(userMessage) {
//     // Add user message immediately
//     const tempChatId = `temp-${Date.now()}`; // Temporary ID for immediate rendering
//     this.addMessage(userMessage, "user", tempChatId);

//     // Show typing indicator
//     this.showTypingIndicator();

//     // Fetch bot response
//     const { agentReasoning, chatId } = await this.getBotResponse(userMessage);

//     // Remove typing indicator
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
//       this.addMessage(agentReasoning, "bot", chatId );
//     }
//   }

//   async handleFavIconClick(chatId) {
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

//   // setAgentSession(agentId ) {
//   //     this.agentId = agentId;
//   //     // this.sessionId = sessionId;
//   //     // console.log("Updated Agent ID and Session ID:", { agentId, sessionId });
//   //     console.log("Updated Agent ID :", { agentId });
//   //     this.fetchPreviousMessages();
//   // }
//   setAgentId(agentId) {
//     this.agentId = agentId;
//     console.log("Agent ID set to:", agentId);
//     this.fetchPreviousMessages();
//   }

//   addEventListeners() {
//     const sendBtn = this.querySelector("#send-btn");
//     const userInput = this.querySelector("#user-input");
//     const fileUpload = this.querySelector("#file-upload");
//     const favIcons = this.querySelectorAll(".favIcon");

//     const handleSend = async () => {
//       const message = userInput.value.trim();
//       if (message) {
//         userInput.value = "";
//         await this.handleSendMessage(message);
//       }
//     };

//     sendBtn?.addEventListener("click", handleSend);

//     userInput?.addEventListener("keydown", async (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         await handleSend();
//       }
//     });

//     fileUpload?.addEventListener("change", async (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const fileName = `File uploaded: ${file.name}`;
//         await this.handleSendMessage(`Uploaded file: ${file.name}`);
//       }
//     });

//     favIcons.forEach((icon) => {
//       icon.addEventListener("click", async (event) => {
//         const chatId = event.target.dataset.chatId;
//         if (chatId) {
//           console.log("Chat ID for this user message:", chatId);
//           event.target.src = "./pin.png"; // Change the image to indicate selection
//           await this.handleFavIconClick(chatId);
//         } else {
//           console.log("No chatId associated with this user message.");
//         }
//       });
//     });
//   }
// }

// class FileChatBotComponent extends ChatBotComponent {
//   async getBotResponse(userMessage) {
//     return await super.getBotResponse(userMessage);
//   }
// }

// customElements.define("chat-bot", ChatBotComponent);
// customElements.define("file-chat-bot", FileChatBotComponent);


class ChatBotComponent extends HTMLElement {
  chatArray = [];
  agentId = "";
  sessionId = "";
  apiToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ`;
  interactApi = "https://ig.gov-cloud.ai/mobius-gpt-service/interact";
  historySchemaId = `67728644af1fd173800878f3`;
  pollingInterval = 10000; // For managing polling

  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    console.log("ChatBotComponent connected.");
    this.fetchPreviousMessages();
    this.startPolling();
    this.addEventListeners();
  }

  disconnectedCallback() {
    console.log("ChatBotComponent disconnected. Stopping polling.");
    this.stopPolling();
  }

  startPolling() {
    if (this.pollingInterval) {
      console.log("Polling is already active.");
      return;
    }
    console.log("Starting polling.");
    this.pollingInterval = setInterval(() => {
      console.log("Polling for updates...");
      this.fetchPreviousMessages();
    }, 20000); // Poll every 20 seconds
  }

  stopPolling() {
    if (this.pollingInterval) {
      console.log("Stopping polling.");
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

 
  startPolling() {
    this.pollingInterval = setInterval(
      () => (this.fetchPreviousMessages(), this.addEventListeners()),
      20000
    ); // Poll every 5 seconds
  }

  render() {
    this.innerHTML = `
    <div class="chatContainer">
  <div class="chatDisplay">
    ${this.chatArray
      .map(
        (msg,index) => `
        <div class="messageCont ${
          msg.type === "user" ? "user-side" : "bot-side"}">
          <div class="message ${msg.type}-message ${
          msg.isTyping ? "typing-indicator" : ""}">
            <div class="${msg.type === "user" ? "userText" : "botText"}">
              ${
                msg.isTyping
                  ? `<span class="typing">Typing<span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`
                  : msg.content
              }
            </div>
            <div class="messageMeta"
            ${
              msg.createdAt
                ? `  <span>${
                    msg.createdAt
                      ? this.formatCreatedAt(msg.createdAt.split(".")[0])
                      : ""
                  }</span>`
                : ""
            }
            ${
                msg.type === "user"
                              ? `<img src="./pinUnmarked.png" alt="User Avatar" class="favIcon" data-index="${index}" data-chat-id="${msg.chatId || ""}" />`
                              : ""
                          }
             ${msg.caller?` <img src="${
                msg.caller !== "null" ? "./robot.png" : "./humanIcon.svg"
              }" alt="Icon" />`:""}
            </div>
          </div>
          ${
            msg.agentData != "null"
              ? `<div class="${
                  msg.type === "user" ? "userArtifact" : "botArtifact"
                }">
            ${
              msg.sourceAgent
                ? `<section class="${
                    msg.type === "user" ? "userArtifactCont" : "botArtifactCont"
                  }">
              ${
                msg.artifactObj.status
                  ? `<div class="innerDataCont" >${
                      msg.artifactObj.status != "null"
                        ? `<p class="keyName">Artifact Status:</p> <p class="valueName">${msg.artifactObj.status}<p>`
                        : ""
                    }</div>`
                  : ""
              } 
              ${
                msg.artifactObj.msg
                  ? `<div class="innerDataCont" >${
                      msg.artifactObj.msg != "null"
                        ? `<p class="keyName">Artifact msg:</p> <p class="valueName">${msg.artifactObj.msg}<p>`
                        : ""
                    }</div>`
                  : `<div class="noartifactData"></div>`
              } 
              ${
                msg.artifactObj.schemaId
                  ? `<div class="innerDataCont" >${
                      msg.artifactObj.schemaId != "null"
                        ? `<p class="keyName">Artifact :</p> <p class="valueName">${msg.artifactObj.schemaId}<p>`
                        : ""
                    }</div>`
                  : ""
              } 
              ${
                msg.artifactObj.entitySchemaName
                  ? `<div class="innerDataCont" >${
                      msg.artifactObj.entitySchemaName != "null"
                        ? `<p class="keyName">Artifact name:</p> <p class="valueName">${msg.artifactObj.entitySchemaName}<p>`
                        : ""
                    }</div>`
                  : ""
              } 

              ${
                msg.toolUse !== "null"
                  ? `<div class="innerDataCont"> <p class="keyName">${
                      msg.type === "user" ? "Tool" : "Tool"
                    }</p> <p class="valueName">${msg.toolUse}</p> </div>`
                  : ""
              }
              ${
                msg.artifactObj.agentName !== "null"
                  ? `<div class="innerDataCont"> <p class="keyName">${
                      msg.type === "user" ? "Calling" : "Response from"
                    }</p> <p class="valueName">${
                      msg.artifactObj.agentName
                    }</p> </div>`
                  : ""
              }
              ${
                msg.artifactObj.error
                  ? `<div class="innerDataCont" >${
                      msg.artifactObj.error != "null"
                        ? `<p class="keyName"> Error:</p> <p class="valueName">${msg.artifactObj.error}<p>`
                        : ""
                    }</div>`
                  : ""
              } 
                            ${
                              msg.nameVal
                                ? `<div class="innerDataCont" >${
                                    msg.nameVal != "null"
                                      ? `<p class="keyName">${
                                          msg.type === "user"
                                            ? "call from"
                                            : "response to"
                                        } </p> <p class="valueName">${
                                          msg.nameVal
                                        }<p>`
                                      : ""
                                  }</div>`
                                : ""
                            } 
             </section>`
                : ""
            }
       </div>
       `
              : `<div class="noartifactData"></div>`
          }
        </div>
      `
      )
      .join("")}
  </div>
  <div class="input-container">
    <label for="file-upload"><img src="./attach-file.png" alt="Attach File Icon" class="fileIcon" /></label>
    <input type="file" id="file-upload" />
    <input type="text" id="user-input" placeholder="Type your message..." />
    <div id="send-btn"><img src="./sendIcon.png" class="sendIcon" /></div>
  </div>
</div>

    `;
  }

  addMessage(
    content,
    type = "user",
    chatId = null,
    createdAt,
    caller,
    nameVal,
    toolUse,
    toolName,
    sessionId,
    // parentAgent,
    // status,
    // msg,
    entityName,
    // subAgent,
    agentData,
    sourceAgent,
    artifactObj,
    resAgent
  ) {
    this.chatArray.push({
      content,
      type,
      chatId,
      createdAt: createdAt,
      caller,
      nameVal,
      toolUse,
      toolName,
      sessionId,
      // parentAgent,
      // status,
      // msg,
      entityName,
      // subAgent,
      agentData,
      sourceAgent,
      artifactObj,
      resAgent,
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

  async extractToolData(data) {
    const result = {
      toolUsed: data.toolUsed || "null",
      status: "null",
      msg: "null",
      schemaId: "null",
      entitySchemaName: "null",
      primaryKey: [],
      attributes: [],
      toolInput: data.toolInput || "null",
      error: null, // Capture error details if parsing fails
      agentName: "null",
    };

    // Handle toolOutput if available
    if (data.toolOutput && data.toolOutput !== "null") {
      try {
        const output = data.toolOutput;

        // If toolOutput contains an error message
        if (output.startsWith("error")) {
          result.error = output;
        } else {
          // Extract `status`
          const statusMatch = output.match(/`status`:\s*`([^`]+)`/);
          result.status = statusMatch?.[1] || "null";

          // Extract `msg`
          const msgMatch = output.match(/`msg`:\s*`([^`]+)`/);
          result.msg = msgMatch?.[1] || "null";

          //  extract agentName
          const agentName = output.match(/`agentName`:`([^`]+)`/);
          result.agentName = agentName?.[1] || "null";

          // Extract `schemaId`
          const schemaIdMatch = output.match(/`schemaId`:\s*`([^`]+)`/);
          result.schemaId = schemaIdMatch?.[1] || "null";

          // Extract `entitySchema` name
          const entitySchemaNameMatch = output.match(
            /`entitySchema`:\{\s*`name`:\s*`([^`]+)`/
          );
          result.entitySchemaName = entitySchemaNameMatch?.[1] || "null";

          // Extract `primaryKey`
          const primaryKeyMatch = output.match(/`primaryKey`:\[([^\]]+)\]/);
          result.primaryKey =
            primaryKeyMatch?.[1]?.replace(/`/g, "").split(",") || [];

          // Extract `attributes`
          const attributesMatch = output.match(/`attributes`:\[([^\]]+)\]/);
          if (attributesMatch) {
            const attributesString = attributesMatch[1];
            const attributes = [];
            const attributeRegex = /`name`:\s*`([^`]+)`/g;
            let attributeMatch;
            while (
              (attributeMatch = attributeRegex.exec(attributesString)) !== null
            ) {
              attributes.push(attributeMatch[1]);
            }
            result.attributes = attributes;
          }
        }
      } catch (error) {
        result.error = `Error processing toolOutput: ${error.message}`;
      }
    }

    // Handle toolInput
    if (data.toolInput && data.toolInput !== "null") {
      try {
        const input = data.toolInput;

        // Extract schema name
        const schemaNameMatch = input.match(/`schemaName`:\s*`([^`]+)`/);
        result.schemaName = schemaNameMatch?.[1] || "null";

        // Extract description
        const descriptionMatch = input.match(/`description`:\s*`([^`]+)`/);
        result.description = descriptionMatch?.[1] || "null";

        // Extract universes
        const universesMatch = input.match(/`universes`:\s*`([^`]+)`/);
        result.universes = universesMatch?.[1]?.split(",") || [];

        // Extract attributes
        const attributesMatch = input.match(/`attributes`:\s*`([^`]+)`/);
        if (attributesMatch) {
          result.attributesDescription = attributesMatch[1];
        }

        // Extract primary keys
        const primaryKeyMatch = input.match(/`primaryKey`:\s*`([^`]+)`/);
        result.primaryKeyDescription = primaryKeyMatch?.[1];
      } catch (error) {
        result.error = `Error processing toolInput: ${error.message}`;
      }
    }

    return result;
  }

  async fetchPreviousMessages() {
    const apiEndpoint =
      "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";

    const requestBody = {
      type: "TIDB",
      definition: `SELECT *, (SELECT COUNT(*) FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\` = '${this.agentId}' AND \`entity.sessionId\` = '${this.sessionId}') AS instanceCount FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\` = '${this.agentId}' AND \`entity.sessionId\` = '${this.sessionId}' ORDER BY \`entity.createdAt\` ASC;`,
      // `SELECT * FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\`='${this.agentId}' AND \`entity.sessionId\`='${this.sessionId}' ORDER BY \`entity.createdAt\` ASC;`,
      // `SELECT COUNT(*) AS instanceCount, * FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\` = '${this.agentId}' AND \`entity.sessionId\` = '${this.sessionId}' ORDER BY \`entity.createdAt\` ASC;`
    };

    try {
      // Clear the chat array before fetching new data
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
      console.log("dataHistory", data);

      if (data.status === "success" && data.model?.data?.length > 0) {
        const items = data.model.data;
        console.log("items", items);
        let instanceCount = 0;
        instanceCount = items[0]?.instanceCount;
        console.log("instanceCount", instanceCount);
        for (const item of items) {
          const {
            prompt,
            response,
            createdAt,
            promptId,
            caller,
            toolUses = {},
            sessionId,
          } = item.entity;

          const toolUsed = toolUses?.toolUsed || "null";
          let toolName = "null";
          // let parentAgent = false;
          // let subAgent = false;
          let entityName = "null";
          let status = "null";
          let msg = "null";

          // if (toolUsed !== "null") {
          //   parentAgent = true;
          // } else {
          //   subAgent = true;
          // }
          const toolObjectView = toolUses;
          console.log("toolUses", JSON.stringify(toolUses));

          if (toolUses?.toolOutput && toolUses.toolOutput !== "null") {
            try {
              const matchResult = toolUses.toolOutput.match(
                /`agentName`:`([^`]+)`/
              );
              if (matchResult && matchResult[1]) {
                toolName = matchResult[1];
              }
              const statusMatch = toolUses.toolOutput.match(
                /`status`:\s*`([^`]+)`/
              );
              const msgMatch = toolUses.toolOutput.match(/`msg`:\s*`([^`]+)`/);
              const entitySchemaMatch = toolUses.toolOutput.match(
                /`entitySchema`:\{\s*`name`:\s*`([^`]+)`/
              );

              status = statusMatch?.[1] || "null";
              msg = msgMatch?.[1] || "null";
              entityName = entitySchemaMatch?.[1] || "null";
            } catch (error) {
              console.error("Error parsing toolOutput:", error);
            }
          }
          // console.log("toolName"-toolName, "parentAgent"- ,"subAgent"-subAgent)
          const artifactObj = await this.extractToolData(toolObjectView);
          let agentData = artifactObj.toolUsed;
          let sourceAgent = false;
          let resAgent = false;

          //  let
          if (agentData != "null") {
            sourceAgent = true;
            if (caller != "null") {
              resAgent = true;
            }
          }
          console.log("agentDataaa", agentData);

          console.log("extractedData", artifactObj);
          const nameVal =
            caller !== "null" ? await this.makeApiCall(caller) : "null";

          // Add user and bot messages to the chat array
          this.addMessage(
            prompt,
            "user",
            promptId,
            createdAt,
            caller,
            nameVal,
            toolUsed,
            toolName,
            sessionId,
            entityName,
            agentData,
            sourceAgent,
            artifactObj,
            resAgent
          );
          this.addMessage(
            response,
            "bot",
            promptId,
            createdAt,
            caller,
            nameVal,
            toolUsed,
            toolName,
            sessionId,
            entityName,
            agentData,
            sourceAgent,
            artifactObj,
            resAgent
          );
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
    this.stopPolling(); // Stop polling before switching session
    this.fetchPreviousMessages();
    this.startPolling(); // Restart polling for the new session
    // this.fetchPreviousMessages();
  }

  addEventListeners() {
    const sendBtn = this.querySelector("#send-btn");
    const userInput = this.querySelector("#user-input");
    const fileUpload = this.querySelector("#file-upload");
    const favIcons = this.querySelectorAll(".favIcon");

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
//           toolUses = {},
//           sessionId,
//         } = item.entity;

//         const toolUsed = toolUses?.toolUsed || "null";
//         let toolName = "null";
//         let parentAgent = false;
//         let subAgent = false;
//         let entityName = "null";
//         let status = "null";
//         let msg = "null";

//         if (toolUsed !== "null") {
//           parentAgent = true;
//         } else {
//           subAgent = true;
//         }

//         // const toolObjectView = JSON.stringify(toolUses);
//         const toolObjectView = toolUses;

//         console.log("toolUses", toolObjectView);

//         if (toolUses?.toolOutput && toolUses.toolOutput !== "null") {
//           try {
//             const matchResult = toolUses.toolOutput.match(/`agentName`:`([^`]+)`/);
//             if (matchResult && matchResult[1]) {
//               toolName = matchResult[1];
//             }
//             const statusMatch = toolUses.toolOutput.match(/`status`:\s*`([^`]+)`/);
//             const msgMatch = toolUses.toolOutput.match(/`msg`:\s*`([^`]+)`/);
//             const entitySchemaMatch = toolUses.toolOutput.match(/`entitySchema`:\{\s*`name`:\s*`([^`]+)`/);

//             status = statusMatch?.[1] || "null";
//             msg = msgMatch?.[1] || "null";
//             entityName = entitySchemaMatch?.[1] || "null";
//           } catch (error) {
//             console.error("Error parsing toolOutput:", error);
//           }
//         }

//         console.log("toolName", toolName, "parentAgent", parentAgent, "subAgent", subAgent);

//         // Correct async call to extractToolData
//         const toolObj = await this.extractToolData(toolObjectView); // Use await here
//         console.log("extractedData", toolObj);

//         const nameVal = caller !== "null" ? await this.makeApiCall(caller) : "null";

//         this.addMessage(prompt, "user", promptId, createdAt, caller, nameVal, toolUsed, toolName, sessionId, parentAgent, status, msg, entityName, subAgent);
//         this.addMessage(botResponse, "bot", promptId, createdAt, caller, nameVal, toolUsed, toolName, sessionId, parentAgent, status, msg, entityName, subAgent);
//       }
//     } else {
//       console.log("No previous history available for this session ID.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

//   this.innerHTML = `
//   <div class="chatContainer">
//   <div class="chatDisplay">
//     ${this.chatArray
//       .map(
//         (msg) => `
//         <div class="messageCont ${msg.type === "user" ? "user-side" : "bot-side"}">
//           <div class="message ${msg.type}-message ${msg.isTyping ? "typing-indicator" : ""}">
//             <div class="${msg.type === "user" ? "userText" : "botText"}">
//               ${
//                 msg.isTyping
//                   ? `<span class="typing">Typing<span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`
//                   : msg.content
//               }
//             </div>
//             <div class="messageMeta">
//               <span>${msg.sessionId === "undefined" ? "" : msg.sessionId}</span>
//               <span>${msg.createdAt ? this.formatCreatedAt(msg.createdAt.split(".")[0]) : ""}</span>
//               <img src="${msg.caller !== "null" ? "./robot.png" : "./humanIcon.svg"}" alt="Icon" />
//             </div>
//           </div>
//           ${msg.agentData ?
//           `${
//             msg.parentAgent
//               ? `<div class="${msg.type === "user" ? "userAgentData" : "botAgentData"}">
//                    <span>${msg.status != "null" ? `Artifact Status: ${msg.status}` : ""}</span>
//                    <span>${msg.msg != "null" ? `Response: ${msg.msg}` : ""}</span>
//                    <span>${msg.entityName != "null" ? `Artifact Name: ${msg.entityName}` : ""}</span>
//                  </div>`
//               : ""
//           }
//           ${
//             msg.subAgent
//               ? `<div class="${msg.type === "user" ? "userAgentData" : "botAgentData"}">
//                    <span>${msg.status != "null" ? `Artifact Status: ${msg.status}` : ""}</span>
//                    <span>${msg.msg != "null" ? `Response: ${msg.msg}` : ""}</span>
//                    <span>${
//                      msg.type === "user"
//                        ? msg.nameVal != "null"
//                          ? `called ${msg.nameVal}`
//                          : ""
//                        : msg.nameVal !== "null"
//                        ? `Response for ${msg.nameVal}`
//                        : ""
//                    }</span>
//                  </div>`
//               : ""
//           }`:""}
//         </div>
//       `
//       )
//       .join("")}
//   </div>
//   <div class="input-container">
//     <label for="file-upload"><img src="./attach-file.png" alt="Attach File Icon" class="fileIcon" /></label>
//     <input type="file" id="file-upload" />
//     <input type="text" id="user-input" placeholder="Type your message..." />
//     <div id="send-btn"><img src="./sendIcon.png" class="sendIcon" /></div>
//   </div>
// </div>

//     `;
