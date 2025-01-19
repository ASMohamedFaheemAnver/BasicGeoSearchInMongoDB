const fs = require("fs");
const { getDB, closeDB } = require("./db");

(async () => {
  const initialSLPlaces = JSON.parse(
    fs.readFileSync("sl-places.json", "utf-8")
  );
  const initialSLAreas = JSON.parse(fs.readFileSync("sl-areas.json", "utf-8"));
  const db = await getDB();
  await db.collection("sl-places").deleteMany();
  await db
    .collection("sl-places")
    .insertMany([...initialSLPlaces, ...initialSLAreas]);
  await db.collection("sl-places").createIndex({ location: "2dsphere" });
  closeDB();
})();
