const { getDB, closeDB } = require("./db");

(async () => {
  const db = await getDB();
  const places = await db
    .collection("sl-places")
    .find({
      location: {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [
              [
                [81.2, 6.2], // Bottom-left corner
                [81.6, 6.2], // Bottom-right corner
                [81.6, 6.5], // Top-right corner
                [81.2, 6.5], // Top-left corner
                [81.2, 6.2], // Closing the polygon
              ],
            ],
          },
        },
      },
    })
    .toArray();
  console.log(places);
  closeDB();
})();
