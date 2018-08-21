(function() {
    'use strict';
    var app = {
        users: [],
        container: document.querySelector('.cards'),
        articleTemplate: document.querySelector('.user'),
      
    };


  app.displayUsers = function() {
      
        app.container.innerText = "";
        app.users.forEach(function(item) {
        
            var article = app.articleTemplate.cloneNode(true);
          
            article.querySelector('.avatar').src = item.picture.large || '';
            article.querySelector('.name').textContent = item.name.first+' '+item.name.last;
            article.querySelector('.modal-title').textContent = item.name.first+' '+item.name.last ;
            article.querySelector('.modal-phone').textContent = item.phone;
            article.querySelector('.modal-mail').textContent = item.email;
            article.querySelector('.modal-location').textContent = item.location.city;
            article.querySelector('.email').textContent = item.email;
            article.removeAttribute('hidden');
            app.container.appendChild(article);
           
        });
        document.body.classList.remove("loading");
    }

    app.loadFriends = function() {
      app.users= [];
        document.body.classList.add("loading");

          var url = 'https://randomuser.me/api?results=10';
          if(navigator.onLine){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    app.users=JSON.parse(this.response).results;
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
          }
          else{
            if ('caches' in window) {
                caches.match(url).then(function(response) {
                    if (response) {
                        response.json().then(function updateFromCache(json) {
                            app.users=json.results;
                        });
                    }
                });
            };
          }

        setTimeout(function() {
        app.displayUsers();
        },1000);
    }

    app.init = function() {
        app.loadFriends();
    }

    document.getElementById('reload-git-btn').addEventListener('click', function() {
        app.loadFriends();
    })
    // start app
    app.init();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function(registration) {
                console.log('Service Worker Registered', registration.scope);
            });
    }

})();

