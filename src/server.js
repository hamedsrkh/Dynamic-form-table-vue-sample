// src/server.js
import { createServer, Model, Response } from "miragejs";

const apiData = (path) => {
  let data = require(`./api/${path}`);
  if (data) {
    return data;
  } else {
    return undefined;
  }
};

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      const userJson = apiData("users.json");
      const users = Object.values(userJson);
      users.forEach((user) => {
        server.create("user", user);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/:page/uiconfig", (schema, request) => {
        let page = request.params.page;
        const Uiconfig = apiData(`${page}/uiconfig.json`);
        if (Uiconfig && Uiconfig["Type"] === "table") {
          this.get(Uiconfig.fetchApi, (schema) => {
            return schema.users.all();
          });
        } else if (Uiconfig && Uiconfig["Type"] === "form") {
          this.post(Uiconfig.submitApi, (schema, request) => {
            JSON.parse(request.requestBody);
            // if (!attrs.title || !attrs.description) {
            //   return new Response(400, {}, { message: "failed" });
            // }
            return new Response(200, {}, { message: "success" });
          });
        }

        return Uiconfig;
      });

      // const postsUiconfig = apiData("posts/uiconfig.json");
      // this.get("/posts/uiconfig", () => {
      //   return postsUiconfig;
      // });
      // this.post(postsUiconfig.submitApi, (schema, request) => {
      //   let attrs = JSON.parse(request.requestBody);
      //   if (!attrs.title || !attrs.description) {
      //     return new Response(400, {}, { message: "failed", attrs });
      //   }
      //   return new Response(200, {}, { message: "success", attrs });
      // });

      this.get("/*", () => {
        return new Response(
          400,
          { some: "header" },
          { errors: ["page does not exist"] }
        );
      });
    },
  });

  return server;
}
