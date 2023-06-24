process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");

let shirt = { name: "Polo", price: "50.00"};

beforeEach(function(){
    items.push(shirt);
});

aftereach(function(){
    items.length = 0;
});

describe("GET /items", function(){
    test("Gets a list of items", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items : [shirt]});
    });
});

describe("POST /items", function(){
    test("Creates a new item", async function(){
        const resp = await request(app)
        .post('/items')
        .send({
            name: "shoes", price: "75.00"
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: {name:"shoes", price: "75.00"}
        });
    });
});

describe("PATCH /items/:name", function(){
    test("Updates a single item", async function(){
        const resp = await request(app)
        .patch(`/items/${shirt.name}`)
        .send({
            name: "poloShirt"
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: {name: "poloShirt"}
        });
    });
    test("Responds wiw 404 if id invalid", async function(){
        const resp = await request(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function(){
    test("Deletes a single item", async function(){
        const resp = await request(app).delete(`/items/${shirt.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Deleted"});
    });
});