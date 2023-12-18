import { Component } from 'react';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  // Відповідає за оновлення стану
  handleChange = e => {
    this.setState({ imageName: e.target.value.toLowerCase() });
  };

  // Викликається під час відправлення форми
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast('Введіть назву картинки');
      return;
    }
    this.props.onSubmit(this.state.imageName);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button className={css.SearchFormButton} type="submit">
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
