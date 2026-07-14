const http = require("http");

const users = [
    { id: 1, name: "Riha" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Amit" }
];

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}

function homeRoute(res) {
    sendJson(res, 200, {
        page: "Home page",
        version: 1,
        message: "Home Page"
    });
}

function aboutRoute(res) {
    sendJson(res, 200, {
        page: "About page",
        version: 1,
        message: "About Page"
    });
}

function getUsers(res) {
    sendJson(res, 200, users);
}

function getUserId(req) {
    const parts = req.url.split("/");
    return Number(parts[2]);
}

function getUserById(req, res) {
    const id = getUserId(req);
    const user = users.find(u => u.id === id);

    if (!user) {
        sendJson(res, 404, {
            error: "User Not Found"
        });
    } else {
        sendJson(res, 200, user);
    }
}

function createUser(req, res) {
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

        sendJson(res, 201, user);
    });
}

function updateUser(req, res) {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        const id = getUserId(req);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            sendJson(res, 404, {
                error: "User Not Found"
            });
            return;
        }
        const newUser = JSON.parse(body);
        users[index].name = newUser.name;

        sendJson(res, 200, users[index]);
    });
}

function deleteUser(req, res) {
    const id = getUserId(req);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        sendJson(res, 404, {
            error: "User Not Found"
        });
        return;
    }

    users.splice(index, 1);

    sendJson(res, 200, {
        message: "User deleted successfully"
    });
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.url === "/") {
        homeRoute(res);
    }
    else if (req.url === "/about") {
        aboutRoute(res);
    }
    else if (req.url === "/users" && req.method === "GET") {
        getUsers(res);
    }
    else if (req.url.startsWith("/users/") && req.method === "GET") {
        getUserById(req, res);
    }
    else if (req.url === "/users" && req.method === "POST") {
        createUser(req, res);
    }
    else if (req.url.startsWith("/users/") && req.method === "DELETE") {
        deleteUser(req, res);
    }
    else if (req.url.startsWith("/users/") && req.method === "PUT") {
        updateUser(req, res);
    }
    else {

        sendJson(res, 404, {
            error: "Page Not Found"
        });
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});