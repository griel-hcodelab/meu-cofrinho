if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('worker.js')
    .then(function(registration){
    })
    .catch(function(error){
    });
}