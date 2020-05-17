const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomePage = async (req, res) =>{
    // multiples consultas
    const viajes = await Viaje.findAll({ limit: 3 });
    const testimoniales = await Testimonial.findAll({ limit: 3 });

    // pasar el promise y ejecutarlo
    res.render('index', {
        clase: 'home',
        pagina: 'inicio',
        viajes,
        testimoniales
    })
}