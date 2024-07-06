document.addEventListener('paste', function(event) {
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;

  for (index in items) {
      var item = items[index];
      if (item.kind === 'file') {
          var blob = item.getAsFile();
          if (blob.type.indexOf('image') !== -1) {
              var reader = new FileReader();
              reader.onload = function(event) {
                  var imageData = event.target.result;
                  setImage(imageData)
              };
              reader.readAsDataURL(blob);
          }
      }
  }
});


function setImage(imageData) {
  var imgElement = document.createElement('img');
  imgElement.src = imageData;
  $imgContainer = document.querySelector("#img")
  $imgContainer.innerHTML = '';
  $imgContainer.insertAdjacentElement('beforeEnd', imgElement);
}

const dropzone = new Dropzone(document.body, {
  autoProcessQueue: false,
  url: "/",
  clickable: false
});


dropzone.on('thumbnail', function(file, dataURL) {
  setImage(file.dataURL)
});