const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) =>{
    const testimoniales = await Testimonial.findAll({ order: [ ['id', 'DESC'] ] });

    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales 
    });
}

exports.guardarTestimonial = async (req, res) =>{
    // validar campos
    let {nombre, correo, mensaje} = req.body;
    let errores = [];

    if(!nombre){
        errores.push({'mensaje': 'Agrega tu Nombre'});
    }

    if(!correo){
        errores.push({'mensaje': 'Agrega tu Correo Electrónico'});
    }

    if(!mensaje){
        errores.push({'mensaje': 'Agrega tu Mensaje'});
    }

    if (errores.length > 0){
        // muestra vista con errores
        const testimoniales = await Testimonial.findAll({ order: [ ['id', 'DESC'] ] });

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        // registrar en BD
        const testimonial = await Testimonial.create({
            nombre, 
            correo, 
            mensaje
        });

        if (testimonial)
            res.redirect('/testimoniales');
    }
}