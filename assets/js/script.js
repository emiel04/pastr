function listenToPaste(){
  document.addEventListener('paste', handlePaste);
  
}


function handlePaste(event) {
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;

  for (index in items) {
      var item = items[index];
      if (item.kind === 'file') {
          var blob = item.getAsFile();
          if (blob.type.indexOf('image') !== -1) {
              var reader = new FileReader();
              reader.onload = function(event) {
                  var imageData = event.target.result;
                  setImageData(imageData)
              };
              reader.readAsDataURL(blob);
          }
      }else if (item.kind === 'string'){
        item.getAsString((i) => {
          handleString(i)
        })
      }
  }
}



const getImage = function(url){
  var image = new Image();
  image.src = url;
  if (image.width == 0) {
     return null;
  } else {
     return image;
  }
}

function handleString(str) {
  if(!isValidUrl(str)) return;
  const img = getImage(str);
  if (!img) return;
  setImage(img)
}

const isValidUrl = urlString=> {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}
function setImage(image) {
  $imgContainer = document.querySelector("#img")
  $imgContainer.innerHTML = '';
  $imgContainer.insertAdjacentElement('beforeEnd', image);
}
function setImageData(imageData) {
  var imgElement = document.createElement('img');
  imgElement.src = imageData;
  $imgContainer = document.querySelector("#img")
  $imgContainer.innerHTML = '';
  $imgContainer.insertAdjacentElement('beforeEnd', imgElement);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(res => console.log("Succesfully registered serviceworker with scope", res.scope))
      .catch(err => console.log("Error registering serviceworker"));
  } else {
    console.log("Serviceworker not supported");
  }
}

function initDropzone() {
  const dropzone = new Dropzone(document.body, {
    autoProcessQueue: false,
    url: "/", // we don't need to upload files
    clickable: false
  });
  
  dropzone.on('thumbnail', function(file, dataURL) {
    setImageData(file.dataURL)
  });
}

function init() {
  registerServiceWorker();
  initDropzone();
  listenToPaste();
}
init();