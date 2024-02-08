function toggleImage(img, full_suffix) {

  img.className = 'preview active';

  var image_base = img.src;

  var btn_download = document.getElementById('btn_download');
  btn_download.onclick = function (e) {
    window.open(
      image_base,
      '_blank'
    );
    e.stopPropagation();
  };

  var loader = document.getElementById('loader');
  loader.style.display = 'block';

  document.body.style.overflow = 'hidden';

  var container = document.getElementById('image-container');
  container.setAttribute('class', 'active');

  var image = document.createElement('img');
  image.src = image_base;
  image.setAttribute('class', 'full');
  image.onload = function (e) {
    loader.style.display = 'none';
  };

  container.appendChild(image);

  container.onclick = function () {
    container.removeChild(image);
    container.setAttribute('class', 'inactive')
    document.body.style.overflow = 'scroll';
    img.className = 'preview';
  };
}
