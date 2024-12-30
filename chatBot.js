
class ChatBotComponent extends HTMLElement {
  chatArray = [];
  agentId = "";
  apiToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ`
  interactApi ="https://ig.gov-cloud.ai/mobius-gpt-service/interact";
  historySchemaId = `67728644af1fd173800878f3`

  // sessionId = "";

  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.fetchPreviousMessages();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
            <div class="chatContainer">
                <div class="chatDisplay">
                    ${this.chatArray
                      .map(
                        (msg, index) => `
                                <div class="messageCont ${
                                  msg.type === "user" ? "user-side" : "bot-side"
                                }">
                                    <div class="message ${msg.type}-message ${
                                      msg.isTyping ? "typing-indicator" : ""
                                      }" style="background-color: ${  msg.isToolUsed ? "blue" : "green" }">          
                                     <div class="${
                                          msg.type === "user"
                                            ? "userText"
                                            : "botText"
                                        }">
                                            ${
                                              msg.isTyping
                                                ? `<span class="typing">Typing
                                                        <span class="dot"></span>
                                                        <span class="dot"></span>
                                                        <span class="dot"></span>
                                                    </span>`
                                                : msg.content
                                            }
                                        </div>
                                        <div class="messageMeta">   
                                        ${msg.caller !="null" ? `<span> ${msg.nameVal} called </span>` : ""}
                                        ${msg.toolName!="Unknown" ?`<span>${msg.type==="user"? "calling":"Response from"} ${msg.toolName} </span>`:"" }   
                                        <span>${
                                          msg.createdAt
                                            ? this.formatCreatedAt(
                                                msg.createdAt.split(".")[0]
                                              )
                                            : ""
                                        }</span>
                                         
                                        </div>
                                    </div>
                                </div>
                            `
                      )
                      .join("")}
                </div>
                <div class="input-container">
                    <label for="file-upload">
                        <img src="./attach-file.png" alt="Attach File Icon" class="fileIcon" />
                    </label>
                    <input type="file" id="file-upload" />
    
                    <input type="text" id="user-input" placeholder="Type your message..." />
                    <div id="send-btn"><img src="./sendIcon.png" class="sendIcon"/></div>
                </div>
            </div>
        `;
  }

  addMessage(content, type = "user", chatId = null, createdAt,caller,nameVal,toolUse,toolName) {
    this.chatArray.push({
      content,
      type,
      chatId,
      createdAt: createdAt,
      caller,
      nameVal,
      toolUse,toolName
    });
    console.log("chatArray", JSON.stringify(this.chatArray))
    this.render();
    this.addEventListeners(); // Rebind event listeners
    this.scrollToBottom();
  }
  showTypingIndicator() {
    this.chatArray.push({ content: "Typing...", type: "bot" ,isTyping: true});
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
      const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}${ampm}`;
      return formattedTime;
    } catch (error) {
      console.error("Error formatting createdAt timestamp:", error);
      return null;
    }
  }

  removeTypingIndicator() {
    this.chatArray = this.chatArray.filter(
    //   (msg) => msg.content !== "Typing..."
    (msg) => !msg.isTyping
    );
    this.render();
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatDisplay = this.querySelector(".chatDisplay");
    chatDisplay?.scrollTo(0, chatDisplay.scrollHeight);
  }
// nameData
  async makeApiCall(caller) {
    console.log("cid:", caller);
  
    const apiEndpoint = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
    const apiToken = `Bearer ${this.apiToken}`; // Replace this with your actual token
  
    const requestBody = {
      type: "TIDB",
      definition: `SELECT \`entity.name\` FROM t_67641332f0cb545c5134cfdf_t WHERE \`entity.agentId\` = '${caller}';`
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
        console.log("nameIDB",data.model?.data[0]?.entity?.name)
        var nameVal = data.model?.data[0].entity.name;
        return nameVal
      } else {
        console.error("Failed to fetch data:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // interact apai

  async fetchPreviousMessages() {
    const apiEndpoint =
      "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";

    const requestBody = {
      type: "TIDB",
      definition: `SELECT * FROM \`t_${this.historySchemaId}_t\` WHERE \`entity.agentId\`='${this.agentId}' ORDER BY \`entity.createdAt\` ASC;`,
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

      const data = await response.json();
    //   console.log("historyData",data)

      if (data.status === "success") {
        // const items = data.model.data;
        const items = data.model.data;
        console.log("historyDataitems",items)

        for (const item of items) {
          const {
            prompt,
            response,
            createdAt,
            promptId,
            caller,
            toolUses
          } = item.entity;
  
          // Fetch the name for the caller if present
          let nameVal = "null";
          let subAgent ="null ";
          let toolUse ="null " ;
          let toolName ="Unknown";
          if (caller != nameVal) {
           nameVal = await this.makeApiCall(caller);
            console.log(`Caller: ${caller}, NameId: ${nameVal}`);
          }else{
         
          if (toolUses.toolUsed != "null ") {
            toolUse = toolUses.toolUsed;
        
            if (toolUses.toolOutput != "null ") {
                toolName = toolUses.toolOutput;
                
                const matchResult = toolName.match(/`agentName`:`([^`]+)`/);
                if (matchResult && matchResult[1]) {
                    toolName = matchResult[1];
                } else {
                    console.error("No agentName found in toolOutput.");
                    toolName = "Unknown"; // Assign a default value if not found
                }
            }
        
            console.log("toolusedview", toolUses.toolUsed, "subAgent", toolName);
        }
    }
  
          // Add messages with the resolved name
          this.addMessage(prompt, "user", promptId, createdAt, caller, nameVal,toolUse,toolName);
          this.addMessage(response, "bot", promptId, createdAt, caller, nameVal,toolUse,toolName);
        }
      
    
      } else {
        console.error("Failed to fetch data:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
// getBotData
  async getBotResponse(userMessage) {
    const apiEndpoint = this.interactApi;
    const apiToken = `${this.apiToken}`;
    
    const requestBody = {
      agentId: this.agentId,
      query: userMessage,
      // sessionId: this.sessionId,
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
      const chatId = data?.chatMessageId || null; // Safely extract chatMessageId
      console.log("agentReasoning", agentReasoning);
      return { agentReasoning, chatId };
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return {
        agentReasoning: "Error: Unable to connect to the server.",
        chatId: null,
      };
    }
  }

  async handleSendMessage(userMessage) {
    // Add user message immediately
    const tempChatId = `temp-${Date.now()}`; // Temporary ID for immediate rendering
    this.addMessage(userMessage, "user", tempChatId);

    // Show typing indicator
    this.showTypingIndicator();

    // Fetch bot response
    const { agentReasoning, chatId } = await this.getBotResponse(userMessage);

    // Remove typing indicator
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
      this.addMessage(agentReasoning, "bot", chatId );
    }
  }

  async handleFavIconClick(chatId) {
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

  // setAgentSession(agentId ) {
  //     this.agentId = agentId;
  //     // this.sessionId = sessionId;
  //     // console.log("Updated Agent ID and Session ID:", { agentId, sessionId });
  //     console.log("Updated Agent ID :", { agentId });
  //     this.fetchPreviousMessages();
  // }
  setAgentId(agentId) {
    this.agentId = agentId;
    console.log("Agent ID set to:", agentId);
    this.fetchPreviousMessages();
  }

  addEventListeners() {
    const sendBtn = this.querySelector("#send-btn");
    const userInput = this.querySelector("#user-input");
    const fileUpload = this.querySelector("#file-upload");
    const favIcons = this.querySelectorAll(".favIcon");

    const handleSend = async () => {
      const message = userInput.value.trim();
      if (message) {
        userInput.value = "";
        await this.handleSendMessage(message);
      }
    };

    sendBtn?.addEventListener("click", handleSend);

    userInput?.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        await handleSend();
      }
    });

    fileUpload?.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileName = `File uploaded: ${file.name}`;
        await this.handleSendMessage(`Uploaded file: ${file.name}`);
      }
    });

    favIcons.forEach((icon) => {
      icon.addEventListener("click", async (event) => {
        const chatId = event.target.dataset.chatId;
        if (chatId) {
          console.log("Chat ID for this user message:", chatId);
          event.target.src = "./pin.png"; // Change the image to indicate selection
          await this.handleFavIconClick(chatId);
        } else {
          console.log("No chatId associated with this user message.");
        }
      });
    });
  }
}

class FileChatBotComponent extends ChatBotComponent {
  async getBotResponse(userMessage) {
    return await super.getBotResponse(userMessage);
  }
}

customElements.define("chat-bot", ChatBotComponent);
customElements.define("file-chat-bot", FileChatBotComponent);
