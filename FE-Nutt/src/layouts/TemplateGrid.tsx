import { Container, Grid, GridItem } from "@chakra-ui/react";
import { FC } from "react";

type TemplateGridProps = {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
  isWelcome?: boolean;
};

const TemplateGrid: FC<TemplateGridProps> = ({
  header,
  main,
  footer,
  isWelcome,
}) => {
  return (
    <Container
      height="full"
      backgroundImage={
        isWelcome
          ? "url('https://images.unsplash.com/photo-1515332362415-ee763c974cce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')"
          : undefined
      }
      backgroundBlendMode={isWelcome ? "darken" : undefined}
      backgroundColor={isWelcome ? "#0009" : undefined}
      backgroundSize={isWelcome ? "cover" : undefined}
    >
      <Grid height="full" templateRows="1fr 9.6fr 1.4fr">
        {/* Header */}
        <GridItem height="full">{header}</GridItem>
        {/* Main */}
        <GridItem
          height="full"
          paddingTop={4}
          paddingBottom={4}
          paddingLeft={1}
          paddingRight={1}
          overflowY="auto"
        >
          {main}
        </GridItem>
        {/* Footer */}
        <GridItem height="full">{footer}</GridItem>
      </Grid>
    </Container>
  );
};

export default TemplateGrid;
