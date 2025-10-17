# UK Legal Assistant

A modern React-based legal assistance application powered by Groq AI, designed to help users understand UK legal matters and provide guidance based on UK legislation.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Features

- **AI-Powered Legal Assistance** - Get instant legal guidance using Groq AI
- **Real-time Chat Interface** - Interactive chat experience with suggested questions
- **UK Legislation Focus** - Specialized in UK legal system and regulations
- **Modern UI/UX** - Clean, responsive design built with Tailwind CSS
- **Type Safety** - Full TypeScript support for better development experience
- **Fast Development** - Built with Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Groq AI API
- **Package Manager**: Yarn

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **Yarn** (version 1.22 or higher)

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mr-Faizan-Asim/AI-Legal-Assistant.git
cd AI-Legal-Assistant
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=UK Legal Assistant
VITE_APP_VERSION=1.0.0
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 4. Start Development Server

```bash
yarn dev
```

The application will open at `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with HMR |
| `yarn build` | Create production build |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run ESLint for code quality |
| `yarn type-check` | Run TypeScript compiler checks |

## 🏗️ Project Structure

```
Legal-Assistant/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Custom Pages
│   └── styles/        # Global styles
├── public/            # Static assets
├── index.html         # Entry HTML file
└── package.json       # Project dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Your Groq AI API key | Yes |
| `VITE_API_BASE_URL` | Backend API base URL | No |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_VERSION` | Application version | No |

### Groq API Setup

1. Sign up for a Groq account at [console.groq.com](https://console.groq.com)
2. Generate an API key from the dashboard
3. Add the API key to your `.env` file

## 🚀 Deployment

### Build for Production

```bash
yarn build
```

This creates an optimized production build in the `dist/ folder.

### Preview Production Build

```bash
yarn preview
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Keep your Groq API key secure and never expose it in client-side code
- Use environment variables for all sensitive configuration
- Consider implementing rate limiting for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application provides general legal information and should not be considered as legal advice. For specific legal matters, please consult with a qualified legal professional.

## 🆘 Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/Mr-Faizan-Asim/Legal-Assistant/issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce and expected behavior

## 📞 Contact

- **Developer**: Faizan Asim
- **GitHub**: [@Mr-Faizan-Asim](https://github.com/Mr-Faizan-Asim)

