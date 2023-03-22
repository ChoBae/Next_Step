import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';

const cookies = new Cookies();
const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';
console.log(baseUrl);
interface FormValue {
  id: string;
  password: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const inputId = data.id;
    const inputPassword = data.password;
    const loginData = {
      id: inputId,
      password: inputPassword,
    };
    axios
      .post(`${baseUrl}/api/login`, loginData)
      .then((res) => {
        if (res.data.success) {
          const { accessToken } = res.data;
          cookies.set('accessToken', accessToken, {
            path: '/',
            secure: true,
            sameSite: 'none',
          });
          console.log('로그인 성공');
          router.replace('/');
        }
      })
      .catch((err) => {
        alert('로그인에 실패했습니다.');
      });
  };

  return (
    <div>
      <h1>Next Step</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('id', { required: true })}
          placeholder="ID"
        />
        {errors.id && <span>아이디를 입력해주세요.</span>}
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
        />
        {errors.password && <span>비밀번호를 입력해주세요.</span>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
export default Home;
