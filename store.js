
// class DropdownComponent extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//   }

//   connectedCallback() {
//     this.render();
//     this.fetchAgentIds();
//     this.addEventListeners();
//   }

//   async fetchAgentIds() {
//     const url =
//       "https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/67641332f0cb545c5134cfdf/instances/list?size=100";
//     const token =
//       "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";

//     try {
//       console.log("Fetching agent IDs...");
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.status === "SUCCESS") {
//         const agents = data.entities.map((entity) => ({
//           id: entity.agentId,
//           name: entity.name || entity.agentId,
//         }));
//         console.log("Fetched agents:", agents);
//         this.updateDropdown(agents);
//       } else {
//         console.error("Failed to fetch agent IDs:", data.msg);
//       }
//     } catch (error) {
//       console.error("Error fetching agent IDs:", error.message);
//     }
//   }

//   updateDropdown(agents) {
//     const dropdown = this.shadowRoot.querySelector("select");
//     dropdown.innerHTML = `<option value="">Select an Agent</option>`;
//     agents.forEach((agent) => {
//       const option = document.createElement("option");
//       option.value = agent.id;
//       option.textContent = agent.name;
//       dropdown.appendChild(option);
//     });
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         select {
//           width: 100%;
//           padding: 10px !important;
//           font-size: 16px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           background-color: #f8f8f8;
//           color: #333;
//         }

//         select:focus {
//           outline: none;
//           border-color: #666;
//         }
//       </style>
//       <select>
//         <option value="">Select an Agent</option>
//       </select>
//     `;
//   }

//   addEventListeners() {
//     const dropdown = this.shadowRoot.querySelector("select");
//     dropdown.addEventListener("change", (event) => {
//       const selectedAgentId = event.target.value;
//       console.log("Selected Agent ID from dropdown:", selectedAgentId);

//       if (selectedAgentId) {
//         this.dispatchEvent(
//           new CustomEvent("agentSessionSelected", {
//             detail: { agentId: selectedAgentId },
//             bubbles: true,
//             composed: true,
//           })
//         );
//       }
//     });
//   }
// }

// customElements.define("dropdown-component", DropdownComponent);

// class DropdownComponent extends HTMLElement {
//   historySchema = "67728644af1fd173800878f3";
//   AgentMasterSchema ="67641332f0cb545c5134cfdf"

//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     this.agentApiUrl =
//       `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${this.AgentMasterSchema}/instances/list?size=1000`;
//     this.sessionIdAdhocUri =
//       "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
//   }

//   connectedCallback() {

//     this.render();
//     this.initialize();
//   }


//   async initialize() {
//     try {
//       console.log("Initializing dropdown component...");
//       const agents = await this.fetchAgentIds();
//       console.log("Fetched agents:", agents);
//       this.updateDropdown(agents, "agentDropdown");
//     } catch (error) {
//       console.error("Initialization failed:", error.message);
//     }
//     this.addEventListeners();
//   }

//   async fetchAgentIds() {
//     try {
//       console.log("Fetching agent IDs...");
//       const response = await this.fetchData(this.agentApiUrl);
//       if (response.status === "SUCCESS") {
//         console.log("Agent IDs fetched successfully.");
//         return response.entities.map((entity) => ({
//           id: entity.agentId,
//           name: entity.name || entity.agentId,
//         }));
//       } else {
//         throw new Error(`Failed to fetch agent IDs: ${response.msg}`);
//       }
//     } catch (error) {
//       console.error("Error fetching agent IDs:", error.message);
//       throw error;
//     }
//   }

//   async fetchSessionIds(agentId) {
//     try {
//       console.log("Fetching session IDs for agent:", agentId);
//       const requestBody = {
//         type: "TIDB",
//         definition: `SELECT \`entity.sessionId\` AS sessionId, MAX(\`entity.createdAt\`) AS createdAt FROM \`t_${this.historySchema}_t\` WHERE \`entity.agentId\` = '${agentId}' GROUP BY \`entity.sessionId\` ORDER BY \`entity.sessionId\`;`
//         // definition: `SELECT \`entity.sessionId\` AS sessionId, MAX(\`entity.createdAt\`) AS createdAt FROM \`t_${this.historySchema}_t\` WHERE \`entity.agentId\` = '${agentId}' GROUP BY \`entity.sessionId\` ORDER BY \`entity.sessionId\` ASC, MAX(\`entity.createdAt\`) DESC;`
//         // `SELECT \`entity.sessionId\` AS sessionId, MAX(\`entity.createdAt\`) AS createdAt FROM \`t_${this.historySchema}_t\` WHERE \`entity.agentId\` = '${agentId}' GROUP BY \`entity.sessionId\` ORDER BY MAX(\`entity.createdAt\`) DESC, \`entity.sessionId\` ASC;`
//         //  `SELECT \`entity.sessionId\` AS sessionId FROM \`t_${this.historySchema}_t\` WHERE \`entity.agentId\` = '${agentId}' GROUP BY \`entity.sessionId\` ORDER BY MAX(\`entity.createdAt\`) ASC;`,
//       };

//       const response = await this.fetchData(this.sessionIdAdhocUri, requestBody);
//       console.log("Fetched session IDs:", response.model?.data);
//       return response.model?.data.map((session) => ({
//         id: session.sessionId,
//         name: session.sessionId || "Unnamed Session",
//       }));
//     } catch (error) {
//       console.error("Error fetching session IDs:", error.message);
//       return [];
//     }
//   }

//   async fetchData(url, body = null) {
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
//       console.log("Fetched data from URL:", url, data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//       throw error;
//     }
//   }

//   getApiToken() {
//    return "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";

//   }

//   // updateDropdown(items, dropdownId) {
//   //   const dropdown = this.shadowRoot.getElementById(dropdownId);
//   //   dropdown.innerHTML = `<option value="">Select an Agent</option>`; // Clear existing options
//   //   items.forEach((item) => {
//   //     const option = document.createElement("option");
//   //     option.value = item.id;
//   //     option.textContent = item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name;
//   //     dropdown.appendChild(option);
//   //   });
//   //   console.log("Updated agent dropdown with agents:", items);
//   // }
//   updateDropdown(items, dropdownId) {
//     const dropdown = this.shadowRoot.getElementById(dropdownId);
//     dropdown.innerHTML = `<option value="">Select an Agent</option>`; // Clear existing options
  
//     // Sort items by agent name in alphabetical order
//     items.sort((a, b) => a.name.localeCompare(b.name));
  
//     items.forEach((item) => {
//       const option = document.createElement("option");
//       option.value = item.id;
//       option.textContent = item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name;
//       dropdown.appendChild(option);
//     });
//     console.log("Updated agent dropdown with agents:", items);
//   }
  
//   sendSessionsToParent(sessions) {
//     const agentDropdown = this.shadowRoot.getElementById("agentDropdown");
//     const agentId = agentDropdown.value;

//     const event = new CustomEvent("sessionsFetched", {
//       detail: { agentId, sessions },
//       bubbles: true,
//       composed: true,
//     });

//     this.dispatchEvent(event);
//   }

//   addEventListeners() {
//     const agentDropdown = this.shadowRoot.getElementById("agentDropdown");

//     agentDropdown.addEventListener("change", async (event) => {
//       const agentId = event.target.value;
//       console.log("Selected agent ID:", agentId);
//       if (agentId) {
//         const sessions = await this.fetchSessionIds(agentId);
//         this.sendSessionsToParent(sessions);
//       }
//     });
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         select {
//           width: 100%;
//           padding: 8px;
//           margin-bottom: 16px;
//           font-size: 16px;
//         }
//       </style>
//       <div>
//         <select id="agentDropdown">
//           <option value="">Select an Agent</option>
//         </select>
//       </div>
//     `;
//   }
// }

// customElements.define("dropdown-component", DropdownComponent);


// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://ig.gov-cloud.ai;">
//   <title>Chatbot</title>
//   <link rel="stylesheet" href="./styles.css">
//   <script src="./agentselction.js" defer></script>
//   <script src="./chatBot.js" defer></script>
// </head>
// <body>
//   <div class="mainContainer">
//     <div class="leftContainer">
//       <dropdown-component></dropdown-component>
//       <div id="sessionList">
//         </div>
//     </div>
//     <div class="middleContainer">
//       <file-chat-bot></file-chat-bot>
//     </div>
//   </div>
//   <script>
//     document.addEventListener("DOMContentLoaded", () => {
//       const dropdown = document.querySelector("dropdown-component");
//       const sessionList = document.getElementById("sessionList");
//       const chatBot = document.querySelector("file-chat-bot");

//       dropdown.addEventListener("sessionsFetched", (event) => {
//         const { agentId, sessions } = event.detail;
//         console.log("Received sessions for Agent:", agentId, sessions);

//         // Clear existing session list
//         sessionList.innerHTML = "";

//         if (!sessions || sessions.length === 0) {
//           // Display a "No session IDs available" message if sessions array is empty
//           const noSessionsMessage = document.createElement("div");
//           noSessionsMessage.className = "no-sessions-message";
//           noSessionsMessage.textContent = "No session IDs available.";
//           sessionList.appendChild(noSessionsMessage);
//         } else {
//           // Render session divs
//           sessions.forEach((session) => {
//             // const title =document.createElement("div");
//             // title.className = "title-div";
//             // title.textContent = "Session-IDS"
//             // title.appendChild(title)
//             const sessionDiv = document.createElement("div");
//             sessionDiv.className = "session-div";
//             sessionDiv.dataset.sessionId = session.id;
//             sessionDiv.textContent = session.name;
//             sessionList.appendChild(sessionDiv);
//           });
//         }
//       });

//       sessionList.addEventListener("click", (event) => {
//         const sessionDiv = event.target.closest(".session-div");
//         if (sessionDiv) {
//           const sessionId = sessionDiv.dataset.sessionId;
//           const agentId = dropdown.shadowRoot.getElementById("agentDropdown").value;

//           console.log("Selected Session ID:", sessionId);
//           console.log("Associated Agent ID:", agentId);

//           // Remove 'selected' class from all session divs
//           const allSessionDivs = sessionList.querySelectorAll(".session-div");
//           allSessionDivs.forEach((div) => div.classList.remove("selected"));

//           // Add 'selected' class to the clicked session div
//           sessionDiv.classList.add("selected");

//           if (chatBot) {
//             chatBot.setAgentSession(agentId, sessionId);
//           }
//         }
//       });
//     });
//   </script>
// </body>
// </html> -->
