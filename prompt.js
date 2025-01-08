
class DropdownComponent extends HTMLElement {
  historySchema = "67728644af1fd173800878f3";
  AgentMasterSchema = "67641332f0cb545c5134cfdf";

  constructor() {
    super();
    this.agentApiUrl = `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${this.AgentMasterSchema}/instances/list?size=10000`;
    this.sessionIdAdhocUri = "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
  }

  connectedCallback() {
    console.log("DropdownComponent connected.");
    this.initialize(); // Call initialization on component connection
  }

  async initialize() {
    console.log("Initializing DropdownComponent...");
    try {
      const agents = await this.fetchAgents();
      console.log("Agents fetched successfully:", agents);
      this.sendAgentsToParent(agents);
    } catch (error) {
      console.error("Error during initialization:", error.message);
    }
  }

  async fetchAgents() {
    console.log("Making API call to fetch agents...");
    try {
      const response = await this.fetchData(this.agentApiUrl);
      if (response.status === "SUCCESS") {
        console.log("Agent data received from API:", response.entities);
        return response.entities.map((entity) => ({
          id: entity.agentId,
          name: entity.name || entity.agentId,
        }));
      } else {
        console.error("API response error:", response.msg);
        throw new Error(response.msg);
      }
    } catch (error) {
      console.error("Error fetching agents:", error.message);
      throw error;
    }
  }

  async fetchSessions(agentId) {
    console.log(`Fetching sessions for agent ID: ${agentId}`);
    try {
      const requestBody = {
        type: "TIDB",
        definition: `SELECT \`entity.sessionId\` AS sessionId, MAX(\`entity.createdAt\`) AS createdAt FROM \`t_${this.historySchema}_t\` WHERE \`entity.agentId\` = '${agentId}' GROUP BY \`entity.sessionId\` ORDER BY MAX(\`entity.createdAt\`) DESC;`,
      };

      const response = await this.fetchData(this.sessionIdAdhocUri, requestBody);
      const sessions = response.model?.data.map((session) => ({
        id: session.sessionId,
        name: session.sessionId || "Unnamed Session",
      }));
      console.log(`Sessions fetched for agent ID ${agentId}:`, sessions);
      this.sendSessionsToParent(agentId, sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error.message);
    }
  }

  async fetchData(url, body = null) {
    console.log(`Fetching data from URL: ${url}`);
    try {
      const options = {
        method: body ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getApiToken()}`,
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API call successful. Data received:", data);
      return data;
    } catch (error) {
      console.error("Error during fetch:", error.message);
      throw error;
    }
  }

  sendAgentsToParent(agents) {
    console.log("Sending agents to parent:", agents);
    const event = new CustomEvent("agentsFetched", {
      detail: { agents },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  sendSessionsToParent(agentId, sessions) {
    console.log(`Sending sessions for agent ID ${agentId} to parent:`, sessions);
    const event = new CustomEvent("sessionsFetched", {
      detail: { agentId, sessions },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  getApiToken() {
    return "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";
  }
}

customElements.define("dropdown-component", DropdownComponent);
