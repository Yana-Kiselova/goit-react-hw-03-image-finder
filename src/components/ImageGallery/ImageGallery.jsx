import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { toast } from 'react-toastify';
export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    modal: false,
    modalImg: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState(() => ({
        status: 'pending',
        page: 1,
        images: [],
      }));

      setTimeout(() => {
        this.fetchImage();
      });
    }
  }

  fetchImage() {
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=38060547-c8a3d7858038d11f3ac520262&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(
            `За таким запитом нічого не знайдено ${this.props.searchQuery}`
          )
        );
      })
      .then(images => {
        if (images.hits.length === 0) {
          this.setState({
            error: {
              message: `За таким запитом нічого не знайдено ${this.props.searchQuery}`,
            },
            status: 'rejected',
          });
          toast(`За таким запитом нічого не знайдено `);
          return;
        }
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          };
        });
      })
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        })
      );
  }

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, status: 'pending' };
    });

    setTimeout(() => {
      this.fetchImage();
    });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      modalImg: imgForModal,
      modalAlt: altForModal,
      modal: true,
    });
  };

  render() {
    const { images, error, status, modalImg, modalAlt, modal } = this.state;

    if (status === 'pending') {
      return (
        <div className={css.container}>
          {images.length >= 1 && (
            <ul className={css.gallery}>
              {images.map(image => {
                return (
                  <ImageGalleryItem
                    handleClickImg={this.openModal}
                    key={image.id}
                    image={image}
                  />
                );
              })}
            </ul>
          )}
          <Loader />;
        </div>
      );
    }

    if (status === 'rejected') {
      console.log(error.message);
      return (
        <div className={css.container}>
          <p>{error.message}</p>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <div className={css.container}>
            <ul className={css.gallery}>
              {images.map(image => {
                return (
                  <ImageGalleryItem
                    handleClickImg={this.openModal}
                    key={image.id}
                    image={image}
                  />
                );
              })}
            </ul>

            {images?.length >= 1 && (
              <Button onclick={this.loadMore}>Load More</Button>
            )}
          </div>

          {modal && (
            <Modal src={modalImg} alt={modalAlt} closeModal={this.closeModal} />
          )}
        </>
      );
    }
  }
}
