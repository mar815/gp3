import React, { Component } from 'react';
import axios from 'axios';

interface State {
  locations: any[];
  input: string;
}

class LocationSearchInput extends Component<{}, State> {
  state: State = {
    locations: [],
    input: ''
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  }

  handleSearch = async () => {
    const { input } = this.state;
    if (!input) return; // Exit if input is empty

    try {
      const response = await axios.get('/api/locationSearch', {
        params: {
          input: input
        }
      });

      const locations = response.data.results; // Assuming server responds with a 'results' array
      this.setState({ locations });

    } catch (error) {
      console.error("Error fetching locations:", error);
      // Additional error handling can be added here
    }
  }

  render() {
    const { input } = this.state;

    return (
      <div>
        <input
          value={input}
          onChange={this.handleInputChange}
          placeholder="Enter your location"
        />
        <button onClick={this.handleSearch}>Search</button>
        {/* You can also display the 'locations' in a list or other format here */}
      </div>
    );
  }
}

export default LocationSearchInput;
