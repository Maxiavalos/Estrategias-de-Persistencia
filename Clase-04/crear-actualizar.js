const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



class Cars extends Sequelize.Model {}
Cars.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });




// Crea el primer usuario
sequelize.sync()
  .then(() => Cars.create({
    firstName: 'Fors',
    lastName: 'Wal'
  }))
  .then(jane => {
    console.log(jane.toJSON());
    
    // Después de crear el primer usuario, crea el segundo usuario
    return Cars.create({
      firstName: 'Audrey',
      lastName: 'Hall'
    });
  })
  .then(audrey => {
    console.log(audrey.toJSON());

    // Ahora que ambos usuarios están creados, actualiza uno de ellos
    return Cars.update({ lastName: 'Walls' }, {
      where: {
        lastName: 'Wal'
      }
    });
  })
  .then(() => {
    console.log("Usuario actualizado");
  })
  .catch(error => {
    console.error("Error:", error);
  });
