// src/server.js
import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", {
        first_name: "hamed",
        last_name: "sarkh",
        full_name: "hamed sarkh",
        number: "09354983449",
      });
      server.create("user", {
        first_name: "Ali",
        last_name: "Gholi",
        full_name: "Ali Gholi",
        number: "09121112233",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/users/uiconfig", () => {
        return {
          Type: "table",
          fetchApi: "/userData",
          headers: ["first name", "last name", "full name", "phone number"],
          values: ["first_name", "last_name", "full_name", "number"],
        };
      });
      this.get("/userData", (schema) => {
        return schema.users.all();
      });

      this.get("/posts/uiconfig", () => {
        return {
          Type: "form",
          submitApi: "/post/create",
          onSuccess: "post is created successfully",
          onError: "something went wrong",
          fields: [
            {
              Type: "text",
              label: "title",
              name: "title",
            },
            {
              Type: "text",
              label: "description",
              name: "description",
            },
            {
              Type: "text",
              label: "author",
              name: "author",
            },
            {
              Type: "checkbox",
              label: "accepted",
              name: "is_accepted",
            },
          ],
        };
      });
      this.post("/post/create", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        if (!attrs.title || !attrs.description) {
          return new Response(400, {}, { message: "failed", attrs });
        }
        return new Response(200, {}, { message: "success", attrs});
      });

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
