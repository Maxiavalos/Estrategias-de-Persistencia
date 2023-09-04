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


const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});



// Inserta un nuevo usuario
User.create({
  firstName: 'Nuevo',
  lastName: 'Usuario'
})
  .then(newUser => {
    console.log('Nuevo usuario creado:', newUser.toJSON());

    // Ahora, después de crearlo, eliminemos el registro
    return User.destroy({
      where: {
        id: newUser.id // Utiliza el ID del usuario recién creado
      }
    });
  })
  .then(() => {
    console.log("Usuario eliminado");
  })
  .catch(error => {
    console.error('Error:', error);
  });



