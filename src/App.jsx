import Timeline from "./components/Timeline";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        Timeline post
      </Typography>
      <Timeline />
    </Container>
  );
}

export default App;
