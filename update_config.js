// Configuration file for chatbot comparison updates
// Data source: Google Sheets CSV

const UPDATE_CONFIG = {
  // URL to fetch updated data from Google Sheets
  dataSourceUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvMggc_JmnjwFTlG5K-6Q5Dtd9V_2Au9ScA5dSkilti8ptFGvpoiT_TbIC196juHZDR1112kZzbgwO/pub?output=csv",
  
  // Last update date from the CSV
  lastUpdateDate: "22/08/2025",
  
  // Instructions for future updates:
  // 1. Fetch data from the URL above
  // 2. Parse CSV data starting from row 3 (contains chatbot names)
  // 3. Update the capabilities object in index.html
  // 4. Update the ias array with the new chatbot order
  // 5. Update this config file with the new date
  
  notes: [
    "The CSV structure starts with chatbot names in row 3",
    "Features start from row 4 with their respective Yes/No values",
    "Minimum age is in row 19",
    "Total scores are in row 20"
  ]
};

// Export for Node.js if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UPDATE_CONFIG;
}