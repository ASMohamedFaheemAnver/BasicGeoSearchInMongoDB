const { getDB, closeDB } = require("./db");

// {
//   "name": "Kirinda Beach",
//   "location": {
//     "type": "Point",
//     "coordinates": [81.2570, 6.2155]
//   }
// }

(async () => {
  const db = await getDB("playground");
  // Search near place of  Kirinda Beach within 500m
  const places = await db
    .collection("sl-places")
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [81.257, 6.2155],
          },
          $maxDistance: 500,
        },
      },
    })
    .toArray();
  console.log(places);
  closeDB();
})();
