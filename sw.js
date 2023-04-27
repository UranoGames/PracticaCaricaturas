const cache_estatico = 'staticV1';
const cache_dinamico = 'dinamicV1';
const cache_inmutable = 'inmutableV1';

self.addEventListener('install', e => {

    const cacheInstallEstatico = caches.open(cache_estatico).then(cache => {

        return cache.addAll([
        '/'
                   
        ]);


    })
      const cacheInstallInmutable= caches.open(cache_inmutable).then(cache=>{

       return cache.add(['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'])
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
                resolve(caches.match('Imagenes/noimage.png'));
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


