import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { OidcProvider } from "@axa-fr/react-oidc";

const Configuration  = {
  authority: "https://pharma-release.server247.info/sso",
  client_id: "PharmaReleaseManager_App",
  redirect_uri: "http://localhost:4200/callback",
  response_type: "code",
  scope: "openid profile PharmaReleaseManager  email",
  post_logout_redirect_uri: "http://localhost:4200/login",
};


function App() {
  return (
   < OidcProvider configuration={Configuration}>
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
    </OidcProvider>
  );
}
export default App;
