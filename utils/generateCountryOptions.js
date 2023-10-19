export function generateCountryOptions(countries, value) {
    return Object.entries(countries)
      .map(
        ([countryCode, country]) =>
          `<option value="${countryCode}" ${
            countryCode === value ? "selected" : ""
          }>${country}</option>`
      )
      .join("");
  }