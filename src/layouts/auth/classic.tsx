import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";

import { bgGradient } from "@/../src/theme/css";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const renderContent = (
    <Stack
      bgcolor={theme.palette.background.paper}
      mt={{ xs: 2, md: 8 }}
      mb={{ xs: 10, md: 8 }}
      borderRadius={2}
      boxShadow={theme.customShadows.z8}
      sx={{
        width: 1,
        mx: "auto",
        maxWidth: 480,
        px: { xs: 3, md: 6 },
        pt: { xs: 3, md: 6 },
        pb: { xs: 3, md: 6 },
      }}
    >
      {children}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      width="100%"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Stack
        flexGrow={1}
        spacing={0}
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        sx={{
          padding: "0px 15px !important",
          ...bgGradient({
            color: alpha(
              theme.palette.background.default,
              theme.palette.mode === "light" ? 0.88 : 0.94
            ),

            imgUrl: "/assets/background/overlay_2.jpg",
          }),
        }}
      >
        {renderContent}
      </Stack>
    </Stack>
  );
}
