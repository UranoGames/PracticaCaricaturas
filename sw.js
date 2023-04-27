const cache_estatico = 'staticV1';
const cache_dinamico = 'dinamicV1';
const cache_inmutable = 'inmutableV1';

self.addEventListener('install', e => {

    const cacheInstallEstatico = caches.open(cache_estatico).then(cache => {

        return cache.addAll([
            '/',
            '/index.html',
            '/personajes.html',
            '/css/style.css',
            'pages/Nosotros.html',
            'pages/Offline.html',
            '/Imagenes/noimage.png',
            '/manifest.json',
            '/js/app.js',    
            '/Imagenes/Ada1.png',
            '/Imagenes/Ada2.png',
            '/Imagenes/Ada3.png',
            '/Imagenes/Albert1.png',
            '/Imagenes/Albert2.png',
            '/Imagenes/Albert3.png',
            '/Imagenes/Chris1.png',
            '/Imagenes/Chris2.png',
            '/Imagenes/Chris3.png',
            '/Imagenes/Claire1.png',
            '/Imagenes/Claire2.png',
            '/Imagenes/Claire3.png',
            '/Imagenes/Jill1.png',
            '/Imagenes/Jill2.png',
            '/Imagenes/404.png',
            '/Imagenes/welcome.jpg',
            '/Imagenes/Jill3.png',
            '/Imagenes/LeonKennedy1.png',
            '/Imagenes/LeonKennedy2.png',
            '/Imagenes/LeonKennedy3.png',
                   
        ]);


    })
      const cacheInstallInmutable= caches.open(cache_inmutable).then(cache=>{

       return cache.add('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css')
      })
       e.waitUntil(Promise.all([cacheInstallEstatico,cacheInstallInmutable]));
    });
    // seccion de cache
    // estatico -> todos los recursos que necesita la app para funcionar
    // dinamico -> todos los recursos que borraron del estatico
    // inmutable -> no sufre cambios (todos los recursos de terceros)

    // const cache_estatico = 'staticV1';
    // const cache_dinamico = 'dinamicV1';
    // const cache_inmutable = 'inmutableV1';


    // self.addEventListener('fetch', e=>{
       
    //     const respuesta = caches.match(e.request).then(res=>{
    //         if(res ) return res;
    //         console.log("El recurso solicitado no esta en cache", e.request.url);
        
    //         return fetch(e.request).then(newResp=>{
    //             caches.open(cache_dinamico).then(cache=>{
    //                 cache.put(e.request,newResp);
    //             })
    //             //clone crea una copia de un archivo ya solicitado

    //             return newResp.clone();
    //         }).catch(err=>{
    //             if(e.request.headers.get('accept').includes('text/html')){
    //                 return caches.match('pages/Offline.html');
    //             }
    //         })
    //     })
    //     e.respondWith(respuesta);
    // })


        //estrategia 3

//Internet con respaldo en cache
//     self.addEventListener('fetch', e=>{

//         const respuesta2 = fetch (e.request).then(res=>{

//             console.log('fetch',res);
//             caches.open(cache_dinamico).then(cache=>{
//             cache.put(e.request, res);

//             })
   
//             return res.clone();
//         }).catch(err=>{
//             return  caches.match(e.request);
//         })
//         e.respondWith(respuesta2);

//         // estrategia 4
//         // cache network raice
//         // Tengamos nuestro equipo pero nuestra conexion a internet es lenta es lenta o nula
//  })


 self.addEventListener('fetch', e=>{

    const respuesta = new Promise((resolve, reject)=>{

        let rechazada = false;
        const falloUnaVez = ()=>{
         if(rechazada){ 
            if(/\.(png|jpg)$/i.test(e.request.url)){
                resolve(caches.match('img/noimage.png'));
            }
            else{
                reject('No se encontro respuesta')
            }
        }
        else{
            rechazada = true;

        }

    };
    fetch(e.request).then(res =>{
        res.ok? resolve(res): falloUnaVez();

    }).catch(falloUnaVez);

    caches.match(e.request).then(res=>{
        res? resolve(res):falloUnaVez();

        const respuesta = fetch (e.request).then(res=>{

            console.log('fetch',res);
            caches.open(cache_dinamico).then(cache=>{
            cache.put(e.request, res);

            })
            return res.clone();
        }).catch(err=>{
            if(e.request.headers.get('accept').includes('text/html')){
                return caches.match('pages/Offline.html');
            }
        })

    }).catch(falloUnaVez);
}).catch(err=>{
    if(e.request.headers.get('accept').includes('text/html')){
        return caches.match('pages/Offline.html');
    }
})
e.respondWith(respuesta);
})




// self.addEventListener('fetch', e=>{
//     // solo funcion con cache
//     // Estrategi 1 cache (solo cache)
//     // Estrategia 2 cache con un respaldo de internet
//     // Es la version mas rapida de nuestro cache

//     // DEsventajas
//     // Al borrar la la imagen no hay manera de regresar la imagen
//     // Al modidicar la aplicacion no se pueden darle actualizacaciobnes
//     const respuesta1 = caches.match(e.request).then(res=>{
//         if(res ) return res;
//         console.log("El recurso solicitado no esta en cache", e.request.url);
    
//         return fetch(e.request).then(newResp=>{
//             caches.open(cache_dinamico).then(cache=>{
//                 cache.put(e.request,newResp);
//             })
//             //clone crea una copia de un archivo ya solicitado

//             return newResp.clone();
//         }).catch(err=>{
//             if(e.request.headers.get('accept').includes('text/html')){
//                 return caches.match('pages/Offline.html');
//             }
//         })
//     })
//     e.respondWith(respuesta1);


// })


// .catch(err=>{
//     if(e.request.headers.get('accept').includes('text/html')){
//         return caches.match('pages/Offline.html');
//     }
// })


