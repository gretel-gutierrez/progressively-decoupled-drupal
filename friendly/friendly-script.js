console.log('user test');

(function (Drupal) {
  // If we have a nice user name, let's replace the
  // site name with a greeting.
  if (drupalSettings.friendly.name) {
    var siteName = document.getElementsByClassName('block-system-branding-block')[0];
    siteName.getElementsByTagName('a')[0].innerHTML = '<h1>Howdy, ' + drupalSettings.friendly.name + '!</h1>';
  }

  if (drupalSettings.friendly.staticLogoAsset) {
    var nd = document.getElementsByClassName('node__content')[0];
    nd.insertAdjacentHTML('beforebegin', '<img src="' + drupalSettings.friendly.staticLogoAsset + '"/>');
  }
})(Drupal);
