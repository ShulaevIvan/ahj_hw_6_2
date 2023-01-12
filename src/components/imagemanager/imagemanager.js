export default class ImageManager {
  constructor(appTag) {
    this.appContainer = document.querySelector(appTag);
    this.imageContainer = this.appContainer.querySelector('.preview-container');
    this.fileContainer = this.appContainer.querySelector('.files-container');
    this.fileInput = this.appContainer.querySelector('.overlapped');
    this.allImages = [];
    this.fileTypes = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/svg+xml', 'image/gif'];

    this.fileInput.addEventListener('change', (e) => {
      const inputFile = this.fileInput.files && this.fileInput.files[0];
      if (!inputFile) return;
      Array.from(this.fileInput.files).forEach((file) => {
        if (this.fileTypes.includes(file.type)) {
          const imagesUrl = URL.createObjectURL(file);
          const readyImage = this.createImage(imagesUrl);
          this.imageContainer.appendChild(readyImage);
          this.fileInput.value = '';
        }
      });
    });

    this.fileContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    this.fileContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      files.forEach((file) => {
        if (this.fileTypes.includes(file.type)) {
          const imagesUrl = URL.createObjectURL(file);
          const readyImage = this.createImage(imagesUrl);
          this.imageContainer.appendChild(readyImage);
        }
      });
    }, false);
  }

  createImage(imgUrl) {
    const imgId = performance.now().toFixed();
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');
    const imgRm = document.createElement('span');
    imgDiv.setAttribute('imgId', imgId);
    img.setAttribute('src', imgUrl);
    imgDiv.classList.add('img-preview');
    imgRm.classList.add('rm-image');
    imgDiv.appendChild(img);
    imgDiv.appendChild(imgRm);

    const imgObj = {
      id: imgId,
      src: imgUrl,
      imgTag: imgDiv,
    };

    this.allImages.push(imgObj);

    const removeImage = (e) => {
      const image = e.target.parentNode;
      const imageId = image.getAttribute('imgId');
      this.allImages = this.allImages.filter((item) => item.id !== imageId);
      image.remove();
    };

    imgRm.addEventListener('click', removeImage);

    return imgDiv;
  }
}
