import React, { useState } from "react";
import Image from "next/image";
import { Layout } from "@components/common";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import CheeseImg from "@public/login-cheese.png";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Typography className="text-red-600 font-medium text-sm mt-1 ml-1 -mb-2">
      {message}
    </Typography>
  );
};

export default function Login() {
  const [isRegistered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmit = () => {};

  const passwordInputProps = {
    onClick: () => setShowPassword((showPassword) => !showPassword),
    className:
      "cursor-pointer text-gray-500 absolute right-4 top-3 pt-0.5 w-5 h-5",
  };

  return (
    <Layout className="flex h-[calc(100vh-64px)] justify-center items-center">
      <form
        onSubmit={onSubmit(handleSubmit)}
        className="bg-primary-blue flex flex-col items-center gap-4 min-h-[470px] w-[310px] rounded-xl p-4 relative"
      >
        <Typography className="text-2xl mt-10 text-center text-primary-yellow mb-4 font-medium">
          {isRegistered ? "Увійти в аккаунт" : "Створення аккаунту"}
        </Typography>
        {!isRegistered && (
          <>
            <div className="relative w-full">
              <Input
                {...register("firstName", {
                  required: "Дане поле є обов'язковим",
                  maxLength: 20,
                })}
                placeholder="Ім'я"
                error={!!errors.fistName}
              />
              {errors.firstName && (
                <ErrorMessage message={errors.firstName.message as string} />
              )}
            </div>
            <div className="relative w-full">
              <Input
                {...register("lastName", {
                  required: "Дане поле є обов'язковим",
                  maxLength: 20,
                })}
                placeholder="Прізвище"
              />
              {errors.lastName && (
                <ErrorMessage message={errors.lastName.message as string} />
              )}
            </div>
          </>
        )}
        <div className="relative w-full">
          <Input
            {...register("email", {
              required: "Дане поле є обов'язковим",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Невірний електронний адрес",
              },
            })}
            type="email"
            placeholder="Електронна адреса"
          />
          {errors.email && (
            <ErrorMessage message={errors.email.message as string} />
          )}
        </div>
        <div className="relative w-full">
          <Input
            {...register("password", {
              required: "Дане поле є обов'язковим",
              minLength: {
                value: 8,
                message: "Мінімальна довжина паролю 8 символів",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message as string} />
          )}
          {showPassword ? (
            <EyeSlashIcon {...passwordInputProps} />
          ) : (
            <EyeIcon {...passwordInputProps} />
          )}
        </div>
        <div>
          <Button type="submit" className="!bg-primary-yellow !text-black">
            {isRegistered ? "Увійти" : "Зареєструватись"}
          </Button>
        </div>
        <Typography
          onClick={() => setRegistered((isRegistered) => !isRegistered)}
          className="text-white cursor-pointer uppercase text-xs font-medium z-10"
        >
          {isRegistered ? "У мене немає акаунту" : "У мене вже є акаунт"}
        </Typography>
        <div className="absolute top-1 left-2 justify-between flex w-full">
          <Image
            className="rotate-75"
            height={50}
            width={50}
            src={CheeseImg}
            alt="cheese-corner"
          />
          <Image
            className="rotate-180 mr-3"
            height={50}
            width={50}
            src={CheeseImg}
            alt="cheese-corner"
          />
        </div>
        <div className="absolute bottom-2 left-2 justify-between flex w-full">
          <Image height={50} width={50} src={CheeseImg} alt="cheese-corner" />
          <Image
            className="rotate-90 mr-3"
            height={50}
            width={50}
            src={CheeseImg}
            alt="cheese-corner"
          />
        </div>
      </form>
    </Layout>
  );
}
