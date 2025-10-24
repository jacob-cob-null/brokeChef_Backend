# 🍳 BrokeChef_Backend

**License:** MIT  
**Build Status:** 🟢 Active  
**Version:** 1.0.0

The backend API for BrokeChef, a budget-friendly cooking app. This server handles recipe generation using the Spoonacular API for ingredient-based searches and AI-powered recipe creation via OpenRouter's NVIDIA Nemotron Nano 9B v2 model.

> 📝 **Note:**  
> This repository contains the **backend** code for the BrokeChef app.  
> The **frontend** is hosted in a separate repository: [BrokeChef Frontend](https://github.com/jacob-cob-null/brokeChef).

---

## 📚 Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## ✨ Features

- 🍲 **Recipe Generation via Spoonacular:** Fetch recipes based on available ingredients using the Spoonacular API.  
- 🤖 **AI-Powered Recipe Creation:** Generate custom recipes using OpenRouter's NVIDIA Nemotron Nano 9B v2:free LLM.  
- 🥒 **Ingredient-Based Queries:** Input ingredients to get tailored recipe suggestions.  
- 🔒 **API Integration:** Secure handling of external API calls with error management.  
- 📊 **Response Formatting:** Structured JSON responses for easy frontend integration.

---

## ⚙️ Installation

### **Prerequisites**
- [Node.js](https://nodejs.org/) (version 14 or higher)  
- npm or yarn  
- API keys for [Spoonacular](https://spoonacular.com/food-api) and [OpenRouter](https://openrouter.ai/)  
- Environment variables for API keys and configuration

---

### **Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/jacob-cob-null/brokeChef_Backend.git
   cd brokeChef_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**  
   Create a `.env` file with necessary configurations (e.g., SPOONACULAR_API_KEY, OPENROUTER_API_KEY).

4. **Start the server**
   ```bash
   npm start
   # or
   yarn start
   ```
   The server will run on `http://127.0.0.1:3000` (or configured port).

5. **For production builds**
   ```bash
   npm run build
   ```

---

## 🚀 Usage

- **Run the server:** Ensure API keys are set and start the application.
- **Test endpoints:** Use tools like Postman or curl to query recipes.
- **Integration:** Connect the frontend to this backend via the provided endpoints.

---

## 🧠 API Endpoints

### Recipes
- `GET /recipe?ingredients=<ingredients>` - Fetch recipes from Spoonacular based on ingredients (e.g., `http://127.0.0.1:3000/recipe?ingredients=chicken`)

### AI Generation
- `GET /generate?ingredients=<ingredients>` - Generate AI-powered recipes using OpenRouter LLM (e.g., `http://127.0.0.1:3000/generate?ingredients=chicken`)

(Responses are in JSON format. Refer to API documentation for detailed schemas.)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

Please ensure your code follows the project’s contributing guidelines and includes tests for new features where appropriate.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **Maintainer:** Jacob Silverio (jacob-cob-null)
- **GitHub:** https://github.com/jacob-cob-null/brokeChef_Backend
- **Issues:** https://github.com/jacob-cob-null/brokeChef_Backend/issues
- **Email:** silveriolance06@gmail.com (replace with actual contact)

---

Made with ❤️ for broke chefs everywhere.
