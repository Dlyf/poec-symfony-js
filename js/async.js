(function() {

  // I. Déclaration des variables globales
  var config = {
    anim: null
  };

  const divMessage  = document.getElementById('message');
  const btnStart    = document.getElementById('btnStart');
  const btnStop     = document.getElementById('btnStop');
  const imgColisee  = document.getElementById('imgColisee');
  const btnAjax     = document.getElementById('btnAjax');





  // setTimeout(function() {
  //   console.log('première instruction');
  // }, 8000)

  //II. Fonctions
  function init() {} //ou ()

  function startAnim() {
    let w = imgColisee.width;
    let left = imgColisee.style.left;
    let opa = 1;

    console.log(left);
    config.anim = setInterval(function() {
      //divMessage.innerHTML += '<p>Blabla</p>';
      w += 10;
      if (opa > 0.025) opa -= 0.025;
      imgColisee.style.left = w + 'px';
      imgColisee.style.width = w + 'px';
      imgColisee.style.opacity = opa;
    }, 100)
  }

  function stopAnim() {
    clearInterval(config.anim);
  }



  //III. Evenements
  btnStart.addEventListener('click', startAnim);
  btnStop.addEventListener('click', stopAnim);
  btnAjax.addEventListener('click', () => {
    // if (fetch) console.log('fetch dispo');
    fetch('http://localhost:5000/teams')
      .then(res => res.json())
      .then(teams => {

        // Ici, les données sont reçues et parsées en tableau JS
        // La chaine de caractères JSON correspondant à la réponse
        // du serveur a été convertie en tableau JS
        teams.forEach(team => {
          let s = '<p><img class="logo" src="'+team.logo+'" alt="">';
          s += '<span>'+team.name+'</span></p>';
          divMessage.innerHTML += s;
        })
      });
  })






})()
