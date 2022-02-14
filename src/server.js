import { createServer, Response } from "miragejs";

const apiData = (path) => {
  try {
    let data = require(`./api/${path}`);
    return data;
  } catch (err) {
    return undefined;
  }
};

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    // models: {
    //   user: Model,
    // },

    // seeds(server) {
    //   const userJson = apiData("users.json");
    //   const users = Object.values(userJson);
    //   users.forEach((user) => {
    //     server.create("user", user);
    //   });
    // },

    routes() {
      this.namespace = "api";

      this.get("/:page/uiconfig", (schema, request) => {
        let page = request.params.page;
        const Uiconfig = apiData(`${page}/uiconfig.json`);
        // if (Uiconfig["Type"] === "form") {
        //   this.post(Uiconfig.submitApi, (schema, request) => {
        //     JSON.parse(request.requestBody);
        //     return new Response(200, {}, { message: "success" });
        //   });
        // }

        return Uiconfig;
      });

      this.get("/:page", (schema, request) => {
        let page = request.params.page;
        const data = apiData(`${page}.json`);
        if (data) {
          return data;
        } else {
          return new Response(400, {}, { errors: ["route does not exist"] });
        }
      });

      this.post("/*", () => {
        let random = Math.floor(Math.random() * 2);
        if(random === 1){
          return new Response(200, {}, { message: "success" });
        }
        return new Response(400, {}, { message: "failed" });
      });

      this.get("/*", () => {
        return new Response(
          400,
          { some: "header" },
          { errors: ["route does not exist"] }
        );
      });
    },
  });

  return server;
}
