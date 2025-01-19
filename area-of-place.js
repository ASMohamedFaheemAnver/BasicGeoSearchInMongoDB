const { getDB, closeDB } = require("./db");

(async () => {
  const db = await getDB("playground");
  const area = await db
    .collection("sl-places")
    .find({
      area: {
        $geoIntersects: {
          $geometry: { type: "Point", coordinates: [81.7302, 7.2801] },
        },
      },
    })
    .toArray();
  console.log(area);
  closeDB();
})();
