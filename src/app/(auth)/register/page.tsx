"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleIcon from "@/components/assets/googleIcon";
import DiscordIcon from "@/components/assets/discordIcon";

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
import AuthClassicLayout from "@/layouts/auth/classic";
import { signIn } from "next-auth/react";
import { HomeIcon } from "lucide-react";

// ----------------------------------------------------------------------

export default function RegisterView() {
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleGoogleSignIn = () => {
    signIn("google");
  };
  const handleDiscordSignIn = () => {
    signIn("discord");
  };

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const defaultValues = {
    firstName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setInvalidCredentials(false);
    setAlertMessage("");

    const { firstName: nickname, email, password } = data;

    try {
      const user = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          email,
          password,
        }),
      });

      const userResponse = await user.json();

      if (userResponse) {
        if (!userResponse.dataUser.success) {
          setAlertSeverity("error");
          setAlertMessage("Registration failed. Please try again.");
        } else {
          const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (signInResult?.ok) {
            setAlertSeverity("success");
            setAlertMessage("Registration successful. Redirecting...");
            router.push("/");
          } else {
            setAlertSeverity("error");
            setAlertMessage("Registration failed. Please try again.");
          }
        }
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Link
        component={RouterLink}
        href="/"
        variant="subtitle2"
        className="flex gap-2 items-center"
      >
        <HomeIcon size={18} />
        Home
      </Link>
      <Typography variant="h4">Get started!</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href="/login" component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: "center",
        typography: "caption",
        color: "text.secondary",
      }}
    >
      {"By signing up, I agree to "}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {" and "}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <Box display="flex" gap={2} flexDirection="column">
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          size="large"
          onClick={handleGoogleSignIn}
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
          or sign up with email:
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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <RHFTextField name="firstName" label="Name" disabled={isLoading} />
      </Stack>

      <RHFTextField name="email" label="Email address" disabled={isLoading} />

      <RHFTextField
        name="password"
        label="Password"
        disabled={isLoading}
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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Create account
      </LoadingButton>
    </Stack>
  );

  return (
    <AuthClassicLayout>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>

      {renderTerms}
    </AuthClassicLayout>
  );
}
