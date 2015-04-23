  $(function() {
      var backgroundColors = ['#ee9825', '#41ce4d', '#c73731', '#5e909b', '#5843c7', '#3a89b5'];

      function chooseRandomPlace() {
          $.get('/random', function(response) {
              $('#intro').text(response.intro);
              $('#venue').text(response.venue);

              $('body').css('background-color', _.sample(backgroundColors));
          });
      }

      chooseRandomPlace();

      $('#button').click(chooseRandomPlace);
  });