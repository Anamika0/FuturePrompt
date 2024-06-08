import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "FuturePrompt",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./assets/icons/logo.svg" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav></Nav>

            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
