console.log('hola mundo')

async function verPeliculas() {

    try {
        const response = await fetch('https://swapi.dev/api/films/')

        if (!response.ok) {
            throw new console.error('error');
        }

        const data = await response.json();
        const resultado = data.results;
        const arr_titulos = resultado.map(titulo => titulo.title);
        const arr_dates = resultado.map(fecha => fecha.release_date.slice(0,4))

        return [arr_titulos, arr_dates];

    } catch {

        console.log('error')
    }
}

verPeliculas().then(titulos => {
    console.log(titulos)

    var options = {
        low: 1977,
        showArea: true,
        width: '90%',
        high: 2010,
        axisX: {
            title: 'Películas',
            fullWidth : true,
            labelInterpolationFnc: function(value) {
                return value.split(' ').slice(0, 2).join(' '); // Reduce el nombre si es muy largo
            }
        },
        axisY: {
            title: 'Año',
            scaleMinSpace: 20,
            onlyInteger: true,


        }
    }
    new Chartist.Line('#ct-chart', {
        labels: titulos[0],
        series: [
            titulos[1]
        ],       
    },options)
})

    


async function verPersonajes() {

    try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
            throw new console.error('error');
        }
        const data = await response.json();
        const resultado = data.results;
        const nombres = resultado.map(nombre => nombre.name);
        const peliculas = resultado.map(peli => peli.films)
        const numPelis = peliculas.map(num => num.length)
        return [nombres, numPelis];

    } catch {
        console.log('error')
    }
    
}

verPersonajes().then(personaje => {
    console.log(personaje)

    var options = {
        low: 1977,
        showArea: true,
        width: '90%',
        high: 8,
        axisX: {
            title: 'Películas',
            labelInterpolationFnc: function(value) {
                return value.split(' ').slice(0, 2).join(' '); // Reduce el nombre si es muy largo
            }

        },
        axisY: {
            title: 'Año',
            scaleMinSpace: 20,
            onlyInteger: true,


        }
    }
    new Chartist.Line('#ct-chart2', {
        labels: personaje[0],
        series: [
            personaje[1],
        ]
    }, options 
    )
});

