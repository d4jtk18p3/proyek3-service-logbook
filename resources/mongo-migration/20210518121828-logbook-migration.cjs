
module.exports = {
  async up(db, client) {
   await db.createCollection( "entris", {
      validator: { $jsonSchema: {
         bsonType: "object",
         properties: {
            tanggal: {
               bsonType: "date",
               description: "must be a date and is required"
            },
            kegiatan: {
               bsonType : "string",
               description: "must be a string and match the regular expression pattern"
            },
            hasil: {
               bsonType : "string",
               description: "can only be one of the enum values"
            },
            kesan: {
              bsonType : "string",
              description: "can only be one of the enum values"
           },
         }
      } },
      validationAction: "warn"
   })
    await db.createCollection( "logbooks", {
      validator: { $jsonSchema: {
         bsonType: "object",
         required: [ "nama", "nim", "kelas", "kuliah_proyek"],
         properties: {
            nama: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            nim: {
               bsonType : "int",
               description: "must be a number and is required"
            },
            kode_kelas: {
               bsonType : "int",
               description: "must be a number and is required"
            },
            kelas_proyek: {
               bsonType : "int",
               description: "must be a number and is required"
            },
            Entri: {
              bsonType : "array",
              description : "array of id entri"
            },
         }
      } },
      validationAction: "warn"
   } )
  },

  async down(db, client) {
    await db.collection('entris').drop();
    await db.collection('logbooks').drop();
  }
};
