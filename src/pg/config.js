let host, user, password, db;

if (process.env.PORT) {
    host = "ec2-34-197-188-147.compute-1.amazonaws.com";
    user = "slhjtpcugtideq";
    password = "852e15ada8d57ac23d3864177bc967511c0b66ededb9b94cad435244f692c0f1";
    db = "d46kskphok2ebn";
} else {
    host = "localhost",
    user = "postgres",
    password = "postgres",
    db = "renting"
}

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: password,
    DB: db,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}