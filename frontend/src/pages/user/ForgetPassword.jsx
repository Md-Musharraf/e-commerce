import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const forget = (data) => {
    console.log(data);
  };
  return (
    <>
      <from onSubmit={handleSubmit(forget)}>
        <input
          {...register("email")}
          type="email"
          placeholder="jhonDoe@gmail.com"
        />

        <input
        {...register("")}
          type="email"
          placeholder="jhonDoe@gmail.com"
        />
      </from>
    </>
  );
};

export default ForgetPassword;
