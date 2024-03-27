"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { useRouter } from "@/../src/routes/hooks";
import { useSearchParams } from "@/../src/routes/hooks";
import { RouterLink } from "@/../src/routes/components";
import FormProvider, { RHFTextField } from "@/../src/components/hook-form";
import AuthClassicLayout from "@/layouts/auth/classic";
import IconButton from "@mui/material/IconButton";
import Iconify from "@/../src/components/iconify";
import InputAdornment from "@mui/material/InputAdornment";
import { useBoolean } from "@/../src/hooks/use-boolean";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "@/../src/utils/axios";

export default function LostPassword() {
  const router = useRouter();
  const search = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSeverity, setResponseSeverity] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [isReady, setIsReady] = useState(false);
  const password = useBoolean();

  useEffect(() => {
    setIsReady(true);
    const user_email = search.get("user_email");
    const token = search.get("token");
    if (user_email && token) {
      console.log("search", search);
      setUserEmail(user_email);
      setToken(token);
    }
  }, [search]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    code:
      userEmail && token
        ? Yup.string().required("Code is required")
        : Yup.string(),
    new_password:
      userEmail && token
        ? Yup.string().required("New password is required")
        : Yup.string(),
    repeat_password:
      userEmail && token
        ? Yup.string()
            .oneOf([Yup.ref("new_password"), null], "Passwords must match")
            .required("Repeat password is required")
        : Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: userEmail || "",
      code: token || "",
      new_password: "",
      repeat_password: "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (userEmail && token) {
      reset({ email: userEmail, code: token });
    }
  }, [userEmail, token, reset]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post("/api/reset-password", data);
      if (response.data.dataUser.success) {
        setResponseSeverity("success");
        if (userEmail && token) {
          setResponseMessage(
            "Password reset successful. You can now login with your new password. Redirecting to login page..."
          );
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setResponseMessage(
            "An email has been sent to you with instructions on how to reset your password"
          );
        }
      } else {
        setResponseSeverity("error");
        setResponseMessage("An error occurred. Please try again later");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: "relative" }}>
      <Typography variant="h4">Reset Password</Typography>
    </Stack>
  );

  const renderForm = (
    <>
      <Typography variant="body2" mb={3}>
        {userEmail && token
          ? "Please set a new password for your account"
          : "Enter your email to reset password"}
      </Typography>
      {responseSeverity == "error" && (
        <Alert sx={{ mb: 4 }} severity={responseSeverity}>
          {responseMessage}
        </Alert>
      )}
      {responseSeverity !== "success" ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            {userEmail ? (
              <RHFTextField
                name="email"
                label="Email"
                disabled={true}
                className="!hidden"
              />
            ) : (
              <RHFTextField
                name="email"
                label="Email"
                disabled={isSubmitting}
              />
            )}
            {userEmail && token && (
              <>
                <RHFTextField name="code" label="Code"  className="!hidden" />
                <RHFTextField
                  name="new_password"
                  label="Password"
                  type={password.value ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Iconify
                            icon={
                              password.value
                                ? "solar:eye-bold"
                                : "solar:eye-closed-bold"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <RHFTextField
                  name="repeat_password"
                  label="Repeat Password"
                  type={password.value ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Iconify
                            icon={
                              password.value
                                ? "solar:eye-bold"
                                : "solar:eye-closed-bold"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            {!userEmail && !token && (
              <Link
                variant="body2"
                href="/login"
                color="inherit"
                underline="always"
                sx={{ alignSelf: "flex-end" }}
              >
                Back to login
              </Link>
            )}
            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              loading={isSubmitting}
              variant="contained"
            >
              {userEmail && token
                ? "Reset Password"
                : "Send Reset Instructions"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      ) : (
        <Alert severity={responseSeverity}>{responseMessage}</Alert>
      )}
    </>
  );

  return (
    <AuthClassicLayout>
      {renderHead}
      {isReady ? renderForm : <CircularProgress sx={{ mx: "auto" }} />}
    </AuthClassicLayout>
  );
}
