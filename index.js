const http = require("http");

const users = [
    { id: 1, name: "Riha" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Amit" }
];

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);

    if (req.url === "/") {
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            page: "Home page",
            version: 1,
            message: "Home Page"
        }));

    } else if (req.url === "/about") {
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            page: "About",
            version: 1,
            message: "About Page"
        }));

    } else if (req.url === "/users" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users));

    } else if (req.url.startsWith("/users/") && req.method === "GET") {

        res.setHeader("Content-Type", "application/json");

        const parts = req.url.split("/");
        const id = Number(parts[2]);

        const user = users.find(u => u.id === id);

        if (!user) {
            res.statusCode = 404;

            res.end(JSON.stringify({
                error: "User Not Found"
            }));
        } else {
            res.end(JSON.stringify(user));
        }

    } else if (req.url === "/users" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const newUser = JSON.parse(body);

            const user = {
                id: users.length + 1,
                name: newUser.name
            };

            users.push(user);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify(user));
        });

    } else if (req.url.startsWith("/users/") && req.method === "DELETE") {

        const parts = req.url.split("/");
        const id = Number(parts[2]);

        const index = users.findIndex(u => u.id === id);

        if (index === -1) {

            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify({
                error: "User Not Found"
            }));

        } else {

            users.splice(index, 1);

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify({
                message: "User deleted successfully"
            }));
        }

    } else {

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            error: "Page Not Found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});