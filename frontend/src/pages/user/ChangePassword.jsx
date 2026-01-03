import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const { register, handleSubmit, reset, watch } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          placeholder="Enter your previous pass"
        />
        <input
          {...register("newPassword", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          placeholder="Enter your previous pass"
        />
        <input
          {...register("confirmNewPassword", {
            required: "confirm your new password",
            minLength: {
              value: 6,
              message: "your password is not matching",
            },
          })}
          type="password"
          placeholder="Enter your previous pass"
        />
      </form>
    </>
  );
};

export default ChangePassword;
