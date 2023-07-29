import React, { Component } from 'react';

class LocationSearchInput extends Component {
  autocomplete: google.maps.places.Autocomplete | null = null;
  autocompleteInput!: HTMLInputElement | null;

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput as HTMLInputElement, {
      types: ['(cities)'],
    });

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete?.getPlace();
    // Extract city and state from the place object and pass them to your app
  }

  render() {
    return (
      <div>
        <input ref={input => (this.autocompleteInput = input)} placeholder="Enter your location" />
      </div>
    );
  }
}

export default LocationSearchInput;