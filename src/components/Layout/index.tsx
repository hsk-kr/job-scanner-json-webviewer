import Container from '@mui/material/Container';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Container sx={{ paddingTop: 8 }}>{children}</Container>;
};

export default Layout;
