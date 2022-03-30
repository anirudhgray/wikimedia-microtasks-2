$( ".form" ).on( "submit", function( event ) {
  event.preventDefault()
  fetch("https://wikimedia-url-validation.herokuapp.com/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({url: $("#inputurl").val()})
  })
  .then(res => {
    if(!res.ok) {
      return res.json().then(err => { 
        $( ".result" ).html( `<div class="error-div">
        <p>Sorry :( &nbsp;${err.detail}</p>
      </div>` );
        throw new Error(err) })
     }
    else {
     return res.json().then(data => {
      $( ".result" ).html( `<div class="success-div">
        <p>Yay :) &nbsp;This source is valid.</p>
      </div>` );
     })
   }    
  })
  .catch(err => {
     console.log(err);
  });
});