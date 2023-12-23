import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  formSubmit = value => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </>
    );
  }
}
