const autocannon = require('autocannon')
const { PassThrough } = require('stream')
//PassThrough es un canal de comunicación como socket.io, que queda abierto y alguien manda info, se envia por partes dentro de ese stream, pequeño pero constante
//es la tecnología que usan las plataformas de streaming
//lo vamos a usar para cada vez que autocannon realice una prueba nos lo pueda estar enviando
function run (url) {
  const buf = []
  const outputStream = new PassThrough()

  //con esa url que le pasamos generamos una instancia de autocannon, y hacemos como que se conecten 100 usuarios a la vez, y vana  estar enviando peticiones a la url en
  //durante 20s
  //y vamos a ver cuantas peticiones se alcanzaron a enviar en eses 20s
  const inst = autocannon({
    url,
    connections: 100,
    duration: 20
  })

  //le decimos que c/vez que ésta instancia nos devuelva data, lo vamos a transmitir sobre el stream "outputStream"
  autocannon.track(inst, { outputStream })

  //es como el emit, emite el autputStream y lo resive en "data" y lo guardamos en buf (arreglo) 
  //¿Qué es un buffer? es como una seguidilla de caracteres, es la forma que viajan los datos mediante el string y luego, una vez que estan completos,
  //nosotros decodificamos ese buffer y se convierten en algun TD que ya conocemos (string, archivo, img, video ...etc)
  outputStream.on('data', data => buf.push(data)) //acá se va acumulando

  //una vez que nuestra instancia de autocannon nos dice que ya terminó, xq es orientada a eventos
  inst.on('done', () => {
    //process.stdout.write => implementación nativa del console.log
    process.stdout.write(Buffer.concat(buf))
    //enconces finalmente, convertimos el buffer a un string "Buffer.concat(buf)" y lo logueamos en la terminal con "process.stdout.write"
    //en "Buffer.concat(buf)" tenemos toda la salida de autocannon
})
}

console.log('Running all benchmarks...')

//run('http://localhost:8080/auth-bloq?username=iram&password=qwerty123') //proceso bloquenate
run('http://localhost:8080/auth-nobloq?username=iram&password=qwerty123') //proceso no bloqueante