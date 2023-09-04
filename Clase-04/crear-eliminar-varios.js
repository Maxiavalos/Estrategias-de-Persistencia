const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
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

// Crea varios usuarios
User.bulkCreate([
  {
    firstName: 'Melissa',
    lastName: 'Moretti'
  },
  {
    firstName: 'Klein',
    lastName: 'Moretti'
  },
  {
    firstName: 'Audrey',
    lastName: 'Hall'
  }
])
  .then(() => {
    console.log('Usuarios creados exitosamente.');

    // Ahora, eliminemos los usuarios por sus IDs
    return User.destroy({
      where: {
        id: {
          [Sequelize.Op.in]: [12, 14] // IDs de los usuarios a eliminar (Cree muchos usuarios para pruebas, por lo que tienen esos ID´)
        }
      }
    });
  })
  .then(numDeleted => {
    console.log(`Eliminados ${numDeleted} usuarios.`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
