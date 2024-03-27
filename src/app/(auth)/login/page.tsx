"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "@mui/material/Link";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { RouterLink } from "@/../src/routes/components";
import { useRouter, useSearchParams } from "@/../src/routes/hooks";

import { useBoolean } from "@/../src/hooks/use-boolean";

import Iconify from "@/../src/components/iconify";
import FormProvider, { RHFTextField } from "@/../src/components/hook-form";
import GoogleIcon from "@/components/assets/googleIcon";
import DiscordIcon from "@/components/assets/discordIcon";
import AuthClassicLayout from "@/layouts/auth/classic";
import { signIn } from "next-auth/react";
import Home from "@/app/page";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google");
  };
  const handleDiscordSignIn = () => {
    signIn("discord");
  };

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };


  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email || undefined,
        password: data.password || undefined,
      });

      if (result) {
        if (result.error === "invalid_credentials") {
          setInvalidCredentials(true);
          setAlertSeverity("error");
          setAlertMessage("Invalid credentials. Please try again.");
        }

        if (result.ok && result.status === 200) {
          setAlertSeverity("success");
          setAlertMessage("Login successful. Redirecting...");
          window.location.href = "/";
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      reset();
      setAlertSeverity("error");
      setAlertMessage(typeof error === "string" ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Link
        component={RouterLink}
        href="/"
        variant="subtitle2"
        className="flex gap-2 items-center"
      >
        <HomeIcon size={18} />
        Home
      </Link>
      <Typography variant="h4">Sign in</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href="/register" variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <Box display="flex" gap={2} flexDirection="column">
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          size="large"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          <div className="w-7 mr-2">
            <GoogleIcon />
          </div>
          Sign in with Google{" "}
        </Button>

        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          size="large"
          disabled={isSubmitting}
          onClick={handleDiscordSignIn}
        >
          <div className="w-7 mr-2">
            <DiscordIcon />
          </div>
          Sign in with Discord{" "}
        </Button>
      </Box>
      <Box>
        <Divider sx={{ my: 3, fontSize: "14px" }}>
          or sign in with email:
        </Divider>
      </Box>
      {alertMessage && (
        <Alert
          severity={alertSeverity as AlertColor}
          onClose={() => setAlertMessage("")}
        >
          {alertMessage}
        </Alert>
      )}
      <RHFTextField
        disabled={isSubmitting}
        name="email"
        label="Email address"
      />

      <RHFTextField
        disabled={isSubmitting}
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        variant="body2"
        href="/lost-password"
        color="inherit"
        underline="always"
        sx={{ alignSelf: "flex-end" }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <AuthClassicLayout>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </AuthClassicLayout>
  );
}
