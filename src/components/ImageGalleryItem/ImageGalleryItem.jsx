import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, handleClickImg }) => {
  return (
    <li className={css.galleryItem}>
      <img
        onClick={handleClickImg}
        data-src={image.largeImageURL}
        className={css.imageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};
// collections: 2715;
// comments: 611;
// downloads: 784656;
// id: 736877;
// imageHeight: 1282;
// imageSize: 97150;
// imageWidth: 1920;
// largeImageURL: 'https://pixabay.com/get/g0bfc9c4e34200a2901ac61436fe95f9e0833507b18a86feb9f793c175d37f242b3f2698c0e06aa1bf4bb3c0ffeba0b85187eee4d9dcb866926571c3de31ed9f2_1280.jpg';
// likes: 3209;
// pageURL: 'https://pixabay.com/photos/tree-cat-silhouette-moon-full-moon-736877/';
// previewHeight: 100;
// previewURL: 'https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736877_150.jpg';
// previewWidth: 150;
// tags: 'tree, cat, silhouette';
// type: 'photo';
// user: 'Bessi';
// userImageURL: 'https://cdn.pixabay.com/user/2019/04/11/22-45-05-994_250x250.jpg';
// user_id: 909086;
// views: 1461402;
// webformatHeight: 427;
// webformatURL: 'https://pixabay.com/get/ga8309aef6ccdf9922d16bc72d53f501a519126318c9879bb2c434698e80cbd462eaadb016bbf761fd0ca5c97ef490b29_640.jpg';
// webformatWidth: 640;
